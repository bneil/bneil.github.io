---
title: cloudflare-whiteboard
description: "Wanting to create a websocket whiteboard using cloudflare web workers"
date: 2024-06-14T18:32:32.778Z
preview: ""
draft: false
tags: ["notes", "rust", "wasm"]
categories: ["coding"]
---

I'm feeling stressed, so I thought building a little toy project might make me feel better

# Setup

Go ahead and install rust, via [rustup](https://www.rust-lang.org/tools/install). Then grab [cargo-generate](https://github.com/cargo-generate/cargo-generate). Once those are installed you can run the skeleton
setup by using `$ cargo generate cloudflare/workers-rs`. I chose the axum skeleton, just because the routing is a little more structured than
the raw http examples.

Verify the setup by using `npx wrangler build` or install via `npm install wrangler@latest`

You should be able to hit 'b' to open in browser

# Starting

So let's dig into the lib.rs folder, start by adding a pattern for handling multiple routes.

```rust
use axum::{routing::get, Router, response::IntoResponse};
use tower_service::Service;
use worker::*;


pub async fn root() -> &'static str {
    "Hello Axum!"
}

async fn health() -> impl IntoResponse {
    r#"{"Ok"}"#
}

pub fn app_router() -> Router {
    Router::new()
        .route("/", get(root))
}

fn health_router() -> Router {
    Router::new() 
        .route("/health", get(health))
}


fn router() -> Router {
    let routes =
        Router::new()
            .merge(app_router())
            .merge(health_router());
    return routes
}

#[event(fetch)]
async fn fetch(
    req: HttpRequest,
    _env: Env,
    _ctx: Context,
) -> Result<axum::http::Response<axum::body::Body>> {
    console_error_panic_hook::set_once();
    Ok(router().call(req).await?)
}

```

Obviously its just a start. Going to revisit later

# Sources
https://spacedimp.com/blog/using-rust-axum-postgresql-and-tokio-to-build-a-blog/
https://docs.rs/tower-serve-static/latest/tower_serve_static/index.html <- no go using wasm
https://github.com/cloudflare/workers-rs?tab=readme-ov-file
