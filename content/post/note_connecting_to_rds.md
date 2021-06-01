---
title: "Connecting/Migrations in RDS"
date: 2021-06-01T17:03:50-06:00
draft: true
Tags: ["notes", "aws", "goose", "docker"]
Categories: ["notes", "coding"]
---

## Goose

Since goose uses pq under the hood, to hit remote urls

```go
goose postgres "user=postgres password=${PROD_PGPASS} dbname=test sslmode=disable host=database.rds.amazonaws.com" status
```

## PSQL / RDS

I didnt have a default database created, so I needed to psql into it - summoning psql via docker container

```shell
docker run -it --rm jbergknoff/postgresql-client postgresql://postgres:${PROD_PGPASS}@database.rds.amazonaws.com:5432
```
