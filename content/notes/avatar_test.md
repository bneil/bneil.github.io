---
title: avatar_test
description: "Testing out an avatar"
date: 2025-09-14T13:04:49-06:00
preview: ""
draft: false
tags: ["notes"]
categories: ["coding"]
---

## Testing out an avatar from a gist

Wild! Found this code snippet [here](https://gist.github.com/win3zz/e2e8f9d43035d8378e35065ec4c5dd97)<br/>
How neat. Giant [Umaru](https://himoutoumaru-chan.fandom.com/wiki/Umaru_Doma) for me thanks to live2d


<script src="https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js"></script>

<script>
L2Dwidget.init({
  "model": {
    //"jsonPath": "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/koharu/model.json"
    "jsonPath": "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/umaru/model.json"
  },
  "display": {
    "position": "right",
    "width": 400,
    "height": 750,
    "hOffset": 60
  },
  "mobile": {
    "show": true,
    "scale": 0.3,
    "motion": true
  }
});
</script>
