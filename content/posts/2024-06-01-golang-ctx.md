---
title: golang-ctx
description: "Was adding some in memory stores and wanted to do a quick write up about context in golang"
date: 2024-06-01T19:23:59.846Z
preview: "Its all about the context"
draft: false
tags: ["notes", "golang"]
categories: ["coding"]
---

<p style="text-align:center">
  <img class="thumbnail" src="/images/each-finger-pointed.jpg" width="520" />
</p>

I've used the context package alot with basically little thought, so I figured it would be helpful to have a few notes on the use and reason behind it for later reference. So hopefully this can help future devs and myself later on if I forget.

The way I remember context, is that its a wrapper around information you want to pass all around your program. You have special switches to kill the context and forget it ever existed. But really its a way to keep 'context' of an action or series of actions. 

Think of it like a journal. You can write to it and reference it throughout its lifecycle. Wherever and whenever you need.

So for the easy example

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
  ctx := context.Background()
  ctx = context.WithValue(ctx, string("example"), "testing")

  testStr, ok := ctx.Value(string("example")).(string)
  if !ok {
    panic("no ticket..")
    return
  }

  fmt.Println(testStr)
 }
```

So nothing very exciting, however you can see that you can set a value to context and refer to it later. Again, any variable would work with the above example. Its when you start mixing in go routines that it begins to make more sense

> oh small note, context.Background(), like what is that?!? Background is reference to 'root', but just think of it like a blank context object 

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"
)

func main() {
	ctx := context.Background()
	ctx = context.WithValue(ctx, string("counter"), 0)

	for i := 0; i < 10; i++ {
		go simpleCount(ctx, i)
	}

	time.Sleep(10 * time.Second)

	testCtr, ok := ctx.Value(string("counter")).(int)
	if !ok {
		log.Println("didnt find counter in map")
	}

	log.Println("what is counter from root?", testCtr)
}

func simpleCount(ctx context.Context, i int) {
	uniqKey := fmt.Sprintf("counter-%d", i)
	ctr, ok := ctx.Value(string("counter")).(int)
	if !ok {
		log.Println("didnt find counter in map")
	}

	ctx = context.WithValue(ctx, string("counter"), ctr+1)
	ctx = context.WithValue(ctx, string(uniqKey), ctr+1)

	uniqCtr, ok := ctx.Value(string(uniqKey)).(int)
	if !ok {
		log.Println("didnt find counter in map")
	}

	again, ok := ctx.Value(string("counter")).(int)
	if !ok {
		log.Println("didnt find counter in map")
	}

	log.Println("hi! im runner:", i, "and the counter was", ctr, "and now is", ctr+1, "with uniq being", uniqCtr, "again?", again)
	return
}
```

So the reason I made this convaluated sample is to explain two constraints around setting the context namely
1. Context isn't a pointer, so adding to the value isnt going to be referenced elsewhere
1. Order is random, and context isn't going to solve that

However you can rewrite the above

```go
package main

import (
	"context"
	"fmt"
)

func slapIt(ctx context.Context, i int) error {
	counter := ctx.Value("counter-shop").(int)
	nextValue := counter + 1
	newCtx := context.WithValue(ctx, "counter-shop", nextValue)

	fmt.Println(i, ") had", counter, "which is now", nextValue, "in the counter shop")

	if i >= 2 {
		return nil
	}

	return slapIt(newCtx, i+1)
}

func main() {
	ctx := context.WithValue(context.Background(), "counter-shop", 0)

	if err := slapIt(ctx, 0); err != nil {
		fmt.Println("Error:", err)
		return
	}
}
```

resulting in

```
0 ) had 0 which is now 1 in the counter shop
1 ) had 1 which is now 2 in the counter shop
2 ) had 2 which is now 3 in the counter shop
```

So now we have order and we are setting things and passing the context around. But not using goroutines. So since we are using go routines and also don't want to use timeouts, lets use a wait group. Which I realize is mean to toss out there, but think of a wait group like a fancy paints timeout, just more professional. 

It works like a jukebox, where wg.Add to adds a new song and once your your songs over you say wg.Done (usually done in a defer). To play another song you do the same thing. 
Once all songs are done, the code beneath wg.Wait, will be run. Usually, this is done at the end of program unless your creating some interesting state machine. But lets look at the example

```go
package main

import (
	"context"
	"fmt"
	"sync"
)

func slapIt(ctx context.Context, wg *sync.WaitGroup, i int) {
	defer wg.Done()

	counter := ctx.Value("counter-shop").(int)
	nextValue := counter + 1
	newCtx := context.WithValue(ctx, "counter-shop", nextValue)

	fmt.Println(i, ") had", counter, "which is now", nextValue, "in the counter shop")

	if i < 2 { //slightly different here, we keep going until 2
		wg.Add(1)
		go slapIt(newCtx, wg, i+1)
	}
}

func main() {
	ctx := context.WithValue(context.Background(), "counter-shop", 0)
	var wg sync.WaitGroup
	wg.Add(1) // first song in the mix

	go slapIt(ctx, &wg, 0)

	wg.Wait()
}
```

which results in

```
0 ) had 0 which is now 1 in the counter shop
1 ) had 1 which is now 2 in the counter shop
2 ) had 2 which is now 3 in the counter shop
```

So while this post mainly focused on the withValue use case, which honestly should be used sparingly, but which is neat. I do want to try and explain the other methods from the documentation and give a small example for each

- Use `context.WithCancel` when you need to manually cancel an operation from another part of your program.

This took me awhile to grasp, so the easiest example I could think of is just launching an isolated go routine and showing how to kill it manually. Think of like timeboxing an activity, you want to make sure that the go routine will run forever so your
setting some safeguards.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func longRunner(ctx context.Context) error {
	for { // for loop that doesnt end my friend
		select {
		case <-ctx.Done(): // cleanup here
			fmt.Println("RIP")
			return ctx.Err()
		default: // do all your work here
			fmt.Println("weee") 
			time.Sleep(1 * time.Second)
		}
	}
}

func reaper(c context.CancelFunc) {
		time.Sleep(5 * time.Second)
		c() // Cancel the context after 5 seconds

}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	go reaper(cancel)

	longRunner(ctx)
}
```

should result in

```
weee
weee
weee
weee
weee
weee
RIP
```

- Use context.WithDeadline or context.WithTimeout when you have a specific time limit for an operation to complete

This works just like WithCancel, but rather then making your own reaper, the reaper is built-in!

> oh one more note, you may see context.TODO rather than context.Background in your adventures. Don't Panic.
> Its 'basically' the same thing as background except its meant to be temporary. Where background is there for the long haul, todo, is more placeholder in nature
> So it can be indicitive of a test or just a placeholder.

Anyhow, hope these examples help you and I know ill reference them for myself later. So for now, thanks for reading. 


### Sources
1. [golang docs](https://pkg.go.dev/context)
1. [educative](https://www.educative.io/blog/understanding-contexts-in-go)