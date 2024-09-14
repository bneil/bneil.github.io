---
title: merge-threeway
description: "Quick reference for hooking up merge"
date: 2024-08-26T18:32:32.778Z
preview: ""
draft: false
tags: ["notes", "merge"]
categories: ["coding"]
---

# Description


enable this:
```
git config --global merge.conflictstyle diff3
```

git config output:
```
[diff]
    tool = meld
[difftool]
    prompt = false
[difftool "meld"]
    trustExitCode = true
    cmd = open -W -a Meld --args \"$LOCAL\" \"$PWD/$REMOTE\"
[merge]
    tool = meld
        conflictstyle = diff3
[mergetool]
    prompt = false
[mergetool "meld"]
    trustExitCode = true
    cmd = open -W -a Meld --args --auto-merge "$PWD/$LOCAL" "$PWD/$BASE" "$PWD/$REMOTE" --output "$PWD/$MERGED"
```