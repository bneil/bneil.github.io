---
title: zshrc_alias_for_hugo
description: "Just copying down some aliases for hugo"
date: 2025-09-14T12:23:45-06:00
preview: ""
draft: false
tags: ["notes"]
categories: ["coding"]
---

## New aliases for the blog

Create the new post and pop open vim

```
hpost() {
  hugo new content content/posts/$1
  vim content/posts/$1
}

hnote() {
  hugo new content content/notes/$1
  vim content/notes/$1
}
```
