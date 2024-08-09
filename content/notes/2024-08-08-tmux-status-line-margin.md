---
title: cloudflare-whiteboard
description: "A quick note for how to have a margin above the status line in tmux"
date: 2024-08-08T18:32:32.778Z
preview: ""
draft: false
tags: ["notes", "tmux"]
categories: ["coding"]
---

# Description

Was using tmux dracula, and really wanted a little margin between the bottom of the prompt and where the tmux status line was. Found a few pages and put this together

_.tmux.conf_
```
if -F '#{!=:#{status},2}' {
  set -Fg 'status-format[1]' '#{status-format[0]}'
  set -g 'status-format[0]' ''
  set -g status-format[0] '#[fill=black]'
  set -g status 2
}
```
