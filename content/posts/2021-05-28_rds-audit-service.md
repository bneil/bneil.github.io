---
title: "Audit Service - RDS"
date: 2021-05-28T11:39:43-06:00
Description: "Part two in creating an audit service"
Tags: ["rds", "aws", "golang"]
Categories: ["coding"]
DisableComments: false
---

# Audit Service or Round 2 Fight

## Description

When I started to think more critically about how interactions would work inside
dynamodb for auditing I quickly learned about pain. Lots and lots of pain. Including
the fact id probably end up having to use dynamodb streams and couple that with elasticsearch.
So im not going to even entertain that idea and am going down the ol trusty sql route.

# Creating the database

Im still on an older version of terraform, so public shamming for being on 0.12.6.

## IaaC section

```shell
tfenv install 0.12.6
tfenv use 0.12.6
```

I had already done an `tf import` from a previous db table, so I just copied and pasted then
modified the database values. Note the xxxx's below are redacted text so change that if you
are copy and pasting.

```hacl
resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "_%@"
}

resource "aws_db_instance" "aduit_db" {
    allocated_storage                     = 20
    auto_minor_version_upgrade            = true
    availability_zone                     = "xxxxx"
    backup_retention_period               = 7
    backup_window                         = "09:12-09:42"
    copy_tags_to_snapshot                 = true
    db_subnet_group_name                  = "default-vpc-d7c845b3"
    deletion_protection                   = true
    enabled_cloudwatch_logs_exports       = []
    engine                                = "postgres"
    engine_version                        = "12.5"
    iam_database_authentication_enabled   = false
    identifier                            = "audit"
    instance_class                        = "db.t3.micro"
    max_allocated_storage                 = 1000
    monitoring_interval                   = 60
    multi_az                              = false
    option_group_name                     = "default:postgres-12"
    parameter_group_name                  = "default.postgres12"
    performance_insights_enabled          = true
    performance_insights_retention_period = 7
    port                                  = 5432
    publicly_accessible                   = true
    security_group_names                  = []
    skip_final_snapshot                   = true
    storage_encrypted                     = true
    storage_type                          = "gp2"
    tags                                  = {}
    username                              = "postgres"
    password                              = random_password.password.result
    vpc_security_group_ids                = [
        "sg-0267a264",
    ]

    timeouts {}
}

output "password" {
  description = "The password is:"
  value = random_password.password.*.result
}
```
## Goose time / Local Dev

Inside the project, im creating a table's folder then setting up [goose](https://github.com/pressly/goose).
its as easy as running `go get -u github.com/pressly/goose/cmd/goose`.  Also, I needed to set up a testing
postgres instance.

### Quick Docker Setup
localdb.compose.yaml
```yaml
version: '3.5'

volumes:
  pgdata: {}

services:
  db:
    image: postgres
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=shhh
      - POSTGRES_DB=audit_dev
    volumes:
      - pgdata:/var/lib/postgresql/data

  adminer:
    image: adminer
    ports:
      - 8000:8080
```

then run `docker-compose -f localdb.compose.yaml up` and you should have a local copy of postgres running

### Back to goose

Please note I cheated and created the database manually, I just don't like accidentally dropping the entire db if
it can be helped. Otherwise... a quick mkdir for 'tables' and then added

001_create_events_table.sql
```shell
-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE events (
    id            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id       UUID NOT NULL,
    company_name  VARCHAR(255) NOT NULL,
    event         TEXT NOT NULL,
    created_on    TIMESTAMP NOT NULL,
    updated_on    TIMESTAMP NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
DROP TABLE events;
-- +goose StatementEnd
```

_The extension is for using UUID_

So now that the database can be mucked with it was easy enough to run
`goose postgres "user=postgres password=${TEMP_PGPASS} dbname=audit_dev sslmode=disable" up`
I played around with that for a bit just because migration tooling is neat.

## The end?

Now I just need to write the code for the migration of older audit records. So if any neat code comes up, I'll write it
on here.
