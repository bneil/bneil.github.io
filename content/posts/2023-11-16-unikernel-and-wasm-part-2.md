---
title: unikernel-and-wasm-part-2
description: "In which I continue attempting to talk about unikernels, wasm and docker"
date: 2023-11-16T18:15:09.090Z
preview: ""
draft: false
tags: ["NaBloPoMo2023"]
categories: ["challenge"]
---

In yesterdays post I laid out some of my experiences with unikernels and touched a little little bit on wasm technology. While also throwing some docker into the mix as well, because why not. Im trying to reflect on basically ten years of technologies in those spaces between 2010 and 2020. Then trying laying out what my perceptions of that technology was from a person that truly wants to have optimal efficiency and security taken into account for their underlying application run time environments. So really this is a continuation of just that, where do we run an application and how is it better than another platform.

So lets just start there, where can you run unikernels in production:

Public Cloud Providers like GCP or AWS, using something like [Unik](https://github.com/solo-io/unik) or using nanovms via [ops.city](https://nanovms.com/dev/tutorials/deploying-nanos-node-js-unikernels-to-aws). 

then for wasm, you can run those in production

Using WASI, you can launch wasm server side tech on lambda, but so far its been lack luster since its tied directly to node.js rather then having its own dedicated runtime. Other implementations I looked at were [wasmCloud](https://wasmcloud.com/) and seeing if that could be used in aws. This was a mixed bag since in 2022 the runtime for lambda was set to read only. In anycase, I haven't had a chance to launch a k8s cluster with wasmCloud, but hopefully ill get some credits to try that later this year.

wasmtime / wasmer also look like ways to run this stuff on gcp/aws. Again, haven't had a chance yet, but really looking into these as way to run wasm a an api/server kinda setup.
Also haven't tried out wasmer edge, which ive been really wanting to as well, since it looks like a fast way to get up and running to do this. 

alright, well, its like the quote says, if you can do something in under two minutes just do it!

```
λ wasmer self-update
Fetching latest installer
Welcome to the Wasmer bash installer!
downloading: wasmer-darwin-amd64
Latest release: v4.2.3
Wasmer already installed in /Users/bneil/.wasmer with version: 0.16.2
Downloading archive from https://github.com/wasmerio/wasmer/releases/download/v4.2.3/wasmer-darwin-amd64.tar.gz
```

I was a little behind on the times. alright, following along [here](https://wasmer.io/products/edge) 

```
~/src/personal via 🐍 v3.11.6 via 💎 v3.1.3
λ wasmer app create wasmer/hello
error: Unable to find "app" in the registry
```

so looks like the product page may be a little out of date? well maybe not

```
❯ wasmer app create
App type: HTTP server
Who should own this package?: bneil
No package found or specified.
Enter the name of an existing package:
Package: testing
invalid package name: could not parse webc package specifier 'testing': package namespace is required
Package: bneil.testing
invalid package name: could not parse webc package specifier 'bneil.testing': package namespace is required
Package: app
invalid package name: could not parse webc package specifier 'app': package namespace is required
Package: bneil/testing
Package 'bneil/testing' does not exist
Package: wasmer/hello
What should be the name of the app? <NAME>.wasmer.app: testing
Would you like to publish the app now? yes
Creating the app...
Deploying app wasmer/testing...

error: could not create app in the backend
│   1: could not publish app
╰─▶ 2: GraphQL API failure: You need to verify your email before you can perform this action.
       Go to https://wasmer.io/settings/profile to verify your email.
```

So had a little back and forth on understand that a forward slash would be required and need to check my email. Le sigh, after trying

```
❯ cat app.yaml
---
kind: wasmer.io/App.v0
name: bneil-hello-world
package: wasmer/hello

λ wasmer app deploy
error: Unable to find "app" in the registry
╰─▶ 1: Not found
src/personal/temp via 💎 v3.1.3 on ☁️ 
```

So im guessing something is up with the 'kind' in that statement. Anyhoot, little bit of a rabbit hole.

I'll keep trying and report back if I can deploy something on wasmer edge, because it would be very neat and I have a few projects over at vercel that would be great to move onto a wasm platform. 

## In conclusion
I think I could do a better job at explaining the reasoning behind why you would want to actually use this technology as well as examples of how to deploy these technologies. So I may just start doing that in upcoming blogs since I feel that the number of topics is a bit to nuanced. 

So, at a high level, unikernels are great and wasm is great and both kinda give similar benefits. While, I still think these are worth while techologies, at least for me, im still learning how to make the best use of these pieces of tech and need to carve out more time to write these things up. 

So I will work towards writing more of that in this blog going forward.