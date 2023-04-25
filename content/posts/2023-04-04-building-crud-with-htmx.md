---
title: Building CRUD with htmx
description: "Taking htmx for a test drive"
date: 2023-04-05T04:23:57.026Z
draft: false
tags: ["htmx","golang", "seedling"]
categories: ["coding"]
---

# The Stack (original)
Going to use the following

frontend:
1. htmx

backend:
1. golang / fiber for the language and server
1. fig for configuration
1. clover for the database

# The Repo

Going to have a publicly hosted repo over at [github](https://github.com/bneil/optimal).

# Description of the project

The project is just going to be a little pet project that I can experiment with. 
For fun and for this blog ill breakdown each of the development steps as I run into them.

# The origin

Started out by looking at a few articles and even seeing what chatGPT would say in terms
of what the file structure should look like. Much like salt, ive been blown away with the variety
of approaches for golang file hierarchy. 

- [Classic Implementation - PetStore](https://github.com/kevinhohl/petstore)
- [todo with htmx spike](https://github.com/quii/todo)
  - thanks [random reddit thread](https://old.reddit.com/r/golang/comments/10z4z3j/go_time_266_is_htmx_the_way_to_go/)

I left the chatGPT resource out of it because it kinda failed hilariously which may have just been the issue
of the LLM model ending in 2021. Who knows, but deep inside I my breathing relax. For much like death, AI isn't taking
my job today.

I really liked the quii todo css style and the static file layout. Felt like MVC was making a come back, but I wasn't
as big of a fan towards moving everything into a domain directory so I kinda went and reworked the ideas from petstore
app. 

## Side note

Im also not super sure that Clover is going to be the end all goal. I started fiber with the prefork option to true which
meant that SO_REUSEPORT was enabled. Which is amazing, if you want to know more I think [Fenny](https://github.com/Fenny) said
it best [here](https://github.com/gofiber/fiber/issues/180#issuecomment-590013111), but that has some straight issues with
the way im working with clover as a data source. So I may need to see what client pooling is available for a critical section
that is basically a singleton. 

So one alternative I thought about was using the Solid Protocol. This would allow me to save off the rss feeds and basically
get some free storage. It's mostly just a thought at this point but could be fruitful in the future.

# Second Day

Going to start building the actual pulling and parsing multiple rss feeds. So look forward to more soon.