---
title: on-slow-coding
description: "Pseudocoding/journaling is a passion"
date: 2023-11-09T17:37:16.274Z
preview: ""
draft: false
tags: ["NaBloPoMo2023"]
categories: ["challenge"]
---

When I say Psudocoding, what I mean, is a process of writing comments in place of an actual program to inform what the application/feature will be before the actual code is written. This can include a process of journaling and mock code in comments, writing in a notebook designs and consideration and even writing documentation for the feature or application..

This way of pseudocoing is one of my favorite activities when doing new feature development or when dickering around with new ideas. The reason being, is it lets me sit with the idea like a designer. To really think about the inputs and outputs and generally understand the problem set before blindly tackling the issue. 

Earlier in my career, the idea of TDD development came into popular practice and I remember just thinking. "This is like pseudocoding but with more steps", because while I was building out tests, I wasn't actually thinking about what the structure of the solution was going to be. I wasn't thinking about interfaces. I was blindly guessing at what inputs id want and what outputs id need. But, I can feel some confusion in those statements. As to why it would be all that different and ill explain.

The difference lies in the execution. So here is a quick example of some off topic coding I was doing earlier this week

```

# I want to create a circuit breaker system for failover
### check out libraries that may have this already! (chore)
## first i need to understand what the breaker activities are defined
-- to many signups
-- to many requests
-- is this throttling?
## middleware considerations
global activities w/ breakers
func (x) -> allow / deny activity

```

So those first comments are the building blocks of what will eventually be a feature. While, it doesn't look like much, those comments will remain in my code until I have a moment to revise and push up the code into the remote repository.

Again, this all comes down to personal style, but I wanted to share a little of how I write code prior to cleaning things up. Since honestly, I love writing and this journaling helps me understand before I write any code. So maybe if you are like me and prefer writing things down before methods are written, doing something similar can help. 
