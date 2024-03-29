---
title: To Fix or .. to wait
description: "A fun exercise to determine when you should push a fix"
date: 2023-10-03T04:04:42.977Z
preview: ""
draft: false
tags: ["planning", "humor"]
categories: ["coding"]
---

Another day and another bug. It goes with the territory, and it can drive you up a wall. I know personally from having to watch production channels in slack slowly fill with issues that it can become a scheduling issue. When do we fix the issue? Whos impacted and why can't we just spend one sprint without having to do a hotfix. So without further ado, ill unveil to you all the way I personally score issues that come flooding in.

It's about following A.W.S.H.I.T, get those calculators ready

### A. impAct

How many people is this bug/issue going to impact. Which is usually the quick gut check of the blast radius. For example, a login issue, where no one can enter the app, yeah, it has to be fixed. It needs to be fixed yesterday but now works. Add +/++/+++ depending on how many folks this is going to upend if things don't get fixed

### W. wizardry

What is the lift in terms of magic scripting that its going to take to fix the issue (or at least duct tape it). If the amount of the incantations are too much then it might need to wait. Add a '+' for a simple incantation, '++' for complex.

### S. stability

Is this issue the only issue? Or has this issue caused instability in the rest of the application. If the cure is worse than the disease it might as well wait until a better fix comes in. Otherwise add another '+' to the score

### H. hosed

This is costing you not only customer experience, this is costing you money. Its like that scene from the 'princess bride', where you are watching the years coming off your Westly. Its not looking good. If your actively losing money AND customer buy-in add another '+'.

### I. insanity

Your devs have been working really hard on these new features and then this bug happened. It was the best of times and then it was these times, these really awful times where flow becomes sludge. Welp, welcome to the insanity of releasing things out into the wild without perfect conditions. It happens. However, now you get to add a '+' if you know this is going to set back the schedule by having a dedicated resource lose out on future development for sanity now.

### T. testing

Hey, works on my machine. IF the bug is critical and the fix needs thorough testing - add another '+' since you just took a poor QA resource and now are having them work to ensure that the update won't cause a cascade of more work.

### scoring

- 0 - 4: Just toss it into the next sprint, its bad, but it could be worse
- 5 - 7: Again, not worth the distraction, next sprint
- 8 - 10: Now. Unfortunatly now is a good time to fix this

The decision to fix or wait on fixing a production issues should be weighed against a lot of factors. The above acronym aside, it's still important to discuss the issue in full in a slack/matrix/irc thread. To document it through a five whys exercise or do any other due dilligence that makes sense. 