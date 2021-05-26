---
title: "Audit Dynamodb"
date: 2021-05-26T11:13:53-06:00
Tags: ["notes", "aws"]
Categories: ["notes"]
DisableFront: false
draft: false
---

# Audit Service

## Description

Decided that I wanted an audit db and service to help keep track of user behaviors.
Since I already have some in Redis, and some in Postgres I thought this might be a useful exercise.
The main thing id like to accomplish with this code is going to be a way to track events and break
them down by week/month/year per user and per company. 

Im having some self debate about creating tables for the tallies or if I should just be creating
them on the fly using a query. I like the idea of the tally because it would be a place to easily
look that information up. Although if some error occurs it could possibly be inaccurate.

### Schema

Deciding on a good schema, im thinking something like

*audit table*
* userId
* companyName (i dislike using company id because then you have to look it up)
* timestamp
* event

*user tally table*
* userId
* companyName
* Timespan - YYmmdd
* event
* count

  
*company tally table*
* companyName
* Timespan - YYmm
* event
* count

## Working with timestamps

After creating the 'audit' table, either in terraform, cli or web console.

WIP