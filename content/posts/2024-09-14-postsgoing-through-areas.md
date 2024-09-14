---
title: obsidian-quick-trick
description: "how to make a quick lookup for this month"
date: 2024-09-14T20:05:34.184Z
preview: ""
draft: false
tags: ["notes", "obsidian"]
categories: ["productivity", "notes"]
---

## Creating a quick lookup of this months articles

One thing I like to have in my workbench is a nice list of articles ive been updating I do that via this script in dataview:

```
LIST
WHERE file.day >= date(2024-09-01) and file.day < date(2024-09-30)
AND length(file.name) > 10
SORT date asc
```

Still looking if this is a thing I can make dynamic. But for now, that works