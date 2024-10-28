---
title: trying-moonbit
description: "Trying out moonbit, really novice stuff"
date: 2024-10-27T22:25:41.978Z
preview: ""
draft: falst
tags: ['moonbit']
categories: ['practice']
---

Another Sunday, which means another great day to try out a new language. Today, as the day would have it, im going to be installing and trying out this language called 'Moonbit'. The docs state, 'MoonBit is an end-to-end programming language toolchain for cloud and edge computing using WebAssembly'. So that seems like an exciting thing to try out.

Installation was simple, they use this integration with vs code, following this link [here](https://www.moonbitlang.com/download/) got me up and running fairly quickly. 

After install, I used the command `moon new hello-moon`, which quickly made a new folder with all the stuffings. Here is the layout:

```
.
├── LICENSE
├── README.md
├── moon.mod.json
├── src
│   ├── lib
│   │   ├── hello.mbt
│   │   ├── hello_test.mbt
│   │   └── moon.pkg.json
│   └── main
│       ├── main.mbt
│       └── moon.pkg.json
└── target
    └── wasm-gc
        └── release
            ├── build
            │   └── moon.db
            └── check
                ├── check.moon_db
                ├── check.output
                ├── lib
                │   ├── lib.blackbox_test.mi
                │   └── lib.mi
                ├── main
                │   └── main.mi
                ├── moon.db
                └── packages.json
```

Running was also easy, just ran `moon run src/main`. Which resulted in an expected:
```
➜ moon run src/main
Hello, world!
```

So now to dig into what the template had already created. It looks like the `src/main` has a main file. Which looks to be importing a hello library. So like that we already have some good examples of imports. Without having to immediatly resort to the documentation. Which for its maintainers, good job! Was happy to see the examples at https://moonbitlang.github.io/moon/ which made the initial look into this language a breeze.

So to just putze around in the language a little. I always like to check out the structs and types and get an understanding of what thats about. So after some playing around I just got a loop and here is the output. Nothing much, but its something for a little but of work.

```
struct PersonalInfo { name: String; age: Int }

pub fn hello() -> String {
  "Hello, world!"
}

let infos: @immut/list.T[PersonalInfo] = 
  Cons( {name: "Alice", age: 30},  
  Cons( {name: "Farts", age: 30},
  Cons( {name: "George", age: 30},
  Cons( {name: "Bob", age: 25}, 
  Nil)))
)

pub fn testing() -> String {
  for x in infos{
    println(x.name)
  }

  match infos {
    Cons(first, _) => "\{first.name} \{first.age}!"
    Nil => "Empty list"
  }
}
```

Then made a small update to main

```
fn main {
  println(@lib.hello())
  println(@lib.testing())
}
```