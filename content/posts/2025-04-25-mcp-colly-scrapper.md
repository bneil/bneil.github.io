---
title: mcp-colly-scrapper
description: "Doing web scrapping for cheap"
date: 2025-04-25T04:05:14.548Z
preview: ""
draft: false
tags: ["development", "ai", "mcp server", "claude"]
categories: ["Coding", "Project Management", "Infra"]
---
# Building a web scrapper...

You know what's fascinating about building a web scraping solution? It's not just about extracting data - its about abusing local resources on your laptop to crawl information and make you mcp client of choice do your bidding. 

When I first started this project, I wanted to find something that would be like firecrawl but wouldn't cost me any money. So I chose to, lol, go with Go along with the Colly framework for my scraping needs - and that decision has paid off in spades. Colly gave me the perfect balance of power and simplicity, allowing me to focus on what really mattered: getting the data.

So without further ado, lets go look over at github.com/bneil/mcp-go-colly

# Peeking Under the Hood: How My Go Web Crawler Works

So this project is fairly simple. We've got three main pieces of code here: `main.go`, `mcp_integration.go`, and `crawler.go`. 

 `main.go` is well the main loop of our app. It’s where everything kicks off. The first thing we are doing is integrate an MCP server. This server is what allows other systems or users to actually *use* my crawler tool. 

```go
// Create MCP server
s := server.NewMCPServer(
    "WebCrawlerServer",
    "1.0.0",
) //
```

It also creates the actual `crawlerTool` using code defined elsewhere, it tells the server *how* to handle requests coming into that tool. This involves a handler function that takes an incoming MCP request, figures out what URLs to crawl and how deep to go, calls our crawler logic, and then packages the results back up in the MCP format. Kinda like a receptionist taking a call, getting the details, passing the job to the right department, and then relaying the answer back.

Now, how does our code actually *talk* with MCP? `mcp_integration.go`, is the file about defining the language and structure needed to integrate with the MCP framework. It defines what a "tool" looks like in this world, including its name, description, and parameters.

```go
// NewCrawlerTool creates a tool for web crawling...
func NewCrawlerTool() mcp.Tool {
	return mcp.NewTool("web_crawler",
		mcp.WithDescription("Crawl and extract information from websites"),
		mcp.WithString("urls", mcp.Required(), mcp.Description("List of URLs to crawl")),
		mcp.WithNumber("max_depth", mcp.Description("Maximum crawl depth")),
	) //
}
```

 This file essentially provides the blueprint for how the outside world interacts with our crawler via MCP. It also includes helper functions, like one to extract domain names from URLs, which is handy.

The `crawler.go` defines the `MCPCrawler` itself. It leverages a library called `colly` to do the heavy lifting of fetching and parsing web pages.

```go
// MCPCrawler manages web crawling with MCP integration
type MCPCrawler struct {
	collector *colly.Collector //
	config    *CrawlerConfig   //
	results   []CrawlResult    //
	mutex     sync.Mutex       //
}
```

When you create a new crawler using `NewMCPCrawler`, you can pass in options like the maximum crawl depth (`MaxDepth`) and which domains it's allowed to visit (`AllowedDomains`). This keeps your crawler from wandering off into the entire internet..

```go
// Handle successful page visits
mc.collector.OnHTML("html", func(e *colly.HTMLElement) {
    result := CrawlResult{
        URL:     e.Request.URL.String(),
        Title:   e.DOM.Find("title").Text(),
        Content: e.Text,
    }
    // ... save result ...
}) //
```

This also handles crawling multiple URLs concurrently using goroutines and a `sync.WaitGroup` to manage them. Pretty solid for speeding things up!

### Conclusion

1.  `main.go` sets up the server and handles incoming requests.
2.  It uses definitions from `mcp_integration.go` to understand the request and structure the response according to MCP rules.
3.  It calls the actual crawling logic defined in `crawler.go`, passing the URLs and depth.
4.  `crawler.go` uses `colly` to fetch the data, handling configuration, success cases, and errors.
5.  The results flow back up, get formatted, and sent out by the server.

Hope you enjoy the crawling! Also been listening to Dungeon Crawler Carl.. So idk, this seemed like a fun project.