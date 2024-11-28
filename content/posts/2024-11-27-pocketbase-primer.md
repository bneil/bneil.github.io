---
title: pocketbase-primer
description: "Pocketbase is a great little library"
date: 2024-11-27T23:47:22.469Z
preview: ""
draft: false
tags: ['golang']
categories: ['practice','coding']
---

### On firebase, pocket base, etc
To answer the age-old question: why would someone use a backend-as-a-service like PocketBase, Firebase or Supabase? Well, that was one of the questions I thought of when working at my last consulting gig. It turns out, it was nice to have all the toys in one box. It felt simple. Typically, I'm used to building lots of functions to start building out functionality or quilting together a bunch of services in AWS/GCP to get things done. (Well firebase is GCP exclusive, but you get it) You see, building a backend from scratch can be a daunting task, especially for solo developers or small teams.

So when building a new application, you don't want to spend time setting up a backend infrastructure. You want to get running quickly, test your ideas, and iterate on your product. Since your product is what matters at the end of the day. To that end, that's where a Pocketbase comes in - it gives you a pre-built backend that you can use as a foundation for your application. 

Now.... the bells and whistles. I think it depends on the app you are building. For example, recently, I was building this silly game called [emojihunter](https://emojihunt.fly.dev/). I just needed to have some basic oauth options and I wanted to try out [pocketbase](https://pocketbase.io/). So for me big win was oauth, but Pocketbase does have some other fun wins. IE file storage, password reset emails, etc. If you do need an example of my auth lib I was creating, check out the note, [Pocketbase Auth Client]({{< ref "2024-11-27-pocketbase-client-golang.md" >}} "About Us")

But again, it depends on what you're building. The last gig I was doing, Firebase had a ton of features. Authentication (which you couldn't update the onboarding emails), storage via Firebase Storage, a database with Firebase Collections (which was one I was very excited to try out since it's known as a real time powerhouse), and on and on. 

SO really working with Firebase made me want to do more with BaaS in general. Oh...

And then there's the issue of scalability. If your app takes off, you don't want to be stuck with a backend that can't handle the traffic. With a BaaS, you can scale your backend to meet the demands of your growing user base, without having to lift a finger. Well, a little bit, mostly it would involve adding more money to the wallet and constantly measuring where in the application you could make improvements. For me, I usually try to add basic heuristics throughout the application to help figure those things out. But specifically with Firebase, I was shocked at how many options they had for looking through spend. Oh, and GCP functions were amazing with the app. Getting freebies from just hooking an (HTTP Callable function)[https://firebase.google.com/docs/functions/callable?gen=1st]. If the person isn't authenticated they don't get access. Alright, back on course

One of the biggest advantages of using a BaaS is the real-time data syncing capabilities. Imagine being able to update your app in real time (like mentioned in Firebase collections), without having to worry about data consistency or latency. And with PocketBase, you even get offline support, which can be a win. Although I admit I haven't done much with that yet.

The only offering I have only tried a little less is Supabase, which I think, makes its main claim postgres vs Firebase collection which is noSQL and has a realllllly rough querying experince. Really need to build out some more things there, but figured id use the name to garner people into reading this article. So it must have worked. Cheers!

jk jk, honestly been fun trying out Pocketbase and enjoyed the Firebase experience. Even though, people have told me that the hockey stick with pricing for Firebase can get out of hand. I never experienced it. So I would recommend it if I was making something small in the future. Or just using pocketbase for something smaller.