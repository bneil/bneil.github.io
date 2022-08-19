---
title: "Webmentions are fun"
date: 2022-07-29T11:39:43-06:00
Description: "On implementing a webhook for adding new content to webmentions"
Tags: ["vercel", "serverless", "golang"]
Categories: ["coding"]
DisableComments: false
---

# On Implementing webmentions

When going through the process of implementing [webmentions](https://indieweb.org/Webmention)
I found the process to be a little challenging. However, I would imagine most of my issues
were due to having a static site. Lucking, I found some really excellent examples of people
who had set things up and also used hugo!

So for those looking to for some help, I found [kaushalmodi](https://gitlab.com/kaushalmodi/hugo-theme-refined/-/tree/master)
and also [integrating-webmentions-into-hugo](https://www.jayeless.net/2021/02/integrating-webmentions-into-hugo.html)
to have an excellent partial to follow. Mostly using the getJson function from hugo. The only
real gotcha was remembering to use `hugo serve --ignoreCache`. 

So as for receiving webmentions, all done and complete. However, the real fun was just starting.
When looking into how to actually send webmentions, it looks like I get to do some coding. My
approach is to use vercel as a lambda to activate a scan of my rss feed whenever I publish a specific
kind of taxonmy in hugo.

So I started with these steps

1. Add custom rss field for if im mentioning anothers site, like a comment. I did this through creating an index.rss.html in layouts/_default
2. Create a new github project, I used this [template](https://github.com/riccardogiorato/template-go-vercel) as an example for how to setup the vercel project
3. I signed up with [upstash](https://upstash.com/), so i could have a little cloud db. Since its only for saving webmentions it should be low maintenance
4. Started to psuedo code up the implementation


