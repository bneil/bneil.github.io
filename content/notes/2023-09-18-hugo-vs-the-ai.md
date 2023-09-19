---
title: "Hugo vs The AI"
date: 2023-09-19T18:27:57-06:00
Description: "What to do and where to place to block some AI on your personal site"
Tags: ["notes"]
Categories: ["notes"]
DisableFront: true
DisableComments: true
---

## Hugo and AI

Should be pretty easy, just toss a `robots.txt` into your static folder and toss the following into it

```
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /
```
