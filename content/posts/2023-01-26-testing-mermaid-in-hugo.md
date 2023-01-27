---
title: Testing Mermaid in Hugo
description: "Just checking out what can be done with mermaid"
date: 2023-01-27T05:37:13.041Z
preview: ""
draft: false
tags: "test"
categories: "diagrams"
---

This is a test of me adding mermaid.js to this blog

{{< mermaid >}}
flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2
{{< /mermaid >}}