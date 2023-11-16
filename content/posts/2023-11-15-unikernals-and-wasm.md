---
title: unikernals-and-wasm
description: "Quick post on why I keep coming back to these subjects"
date: 2023-11-15T17:04:04.016Z
preview: ""
draft: false
tags: ["NaBloPoMo2023"]
categories: ["challenge"]
---

Much like many of us who got swept away from the fantastic world of docker, I have been interested in technology that built upon solaris zones or BSD jails for a long long time. Even when VM's (virtual machines) became popular, its always been a fascinating way to carve out a box and serve applications securely. To that end, unikernel technology has been around for a long time, I believe around that 2k date. Its something that I have picked up and put down but thought id speak a little of it here

For me the first time i was introduced to unikernels was this website promoting LING (unfortunately they are no longer around), which was an implementation using erlang to create a unikernel that was set as an on demand instance of a website. So basically, you load a website, the website creates an instance of a unikernel serves a page and then that unikernel destroys itself. 

![LING](/images/erlang-on-zen.png 'Snapshot when LING was around')

I quickly went down the route of getting this kind of setup going, because the idea of a stateless website seemed really secure and possibly cost efficient. Think of on demand instances rather then long running VM's. Not running a server until the moment a request comes in is magic.

But to take a step back, when looking at unikernels I was trying to find a way satisfy resource efficiency. I'm cheap. I like running my applications on only the most necessary components to run an application. That along with security, I love the minimal attack surface that unikenerals provide. 

Kinda funny, at one time this website was running on a unikernel, based off the work at [OpsCity](https://ops.city/). At the time this blog was on Vultr, but I actually found my own requirement for this blog was underselling the overengineering I was doing to deploy things. Good on the folks at ops city, they were super helpful in me setting those things up a few years back.

As ive moved on, well not really, I've been following the conversation around wasm which seems to share alot of the same goals as using unikernels, namely, resource optimzation and security via sandbox. Even docker to some extent. As unikernels achieve this on a OS level, wasm achieves this through different means, as a straight binary executable that you can serve via a server like nginx or invoked via node, apache, etc. Again, kinda similar to Docker except that its not run through a hypervisor.

Think I may have bit off more than I can chew on this topic, so I might just use the next blog entry to keep distilling my thoughts. Till Next time


