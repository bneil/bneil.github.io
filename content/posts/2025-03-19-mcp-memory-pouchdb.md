---
title: "upgrading-mcp-server-to-pouchdb"
description: "A technical journey modernizing an MCP Protocol memory server with PouchDB"
date: 2025-03-20T03:19:58.947Z
preview: ""
draft: false
tags: ["development", "ai", "mcp server", "claude"]
categories: ["Coding", "Project Management", "Infra"]
---

<p style="padding:10px; text-align:center">
  <img class="thumbnail" src="/images/fox-and-crow-768.jpg" />
</p>

### From Flat File to PouchDB: A Little Database Upgrade 

Since the [MCP Protocol](https://modelcontextprotocol.io/introduction) has been getting alot of traction online recently. I thought id take a stab at making my own mcp server. Given that one of the first things I ran into was context/memory between chat sessions with claude desktop (the mcp client im currently trying out) this article is about my adventures improving mcp memory.

So if your not familiar with the mcp memory server, you start a claude project, toss in the [prompt](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) near the bottom, that sets up AI to call the mcp memory tool to see if the existing chat session was mentioned in the chat previously. Or add possibly relevant information to the chat.

So, beyond the initial move, there's been another interesting development! I was looking at how the "mcp server" interacts with data, and I found an interesting discussion on GitHub: [https://github.com/modelcontextprotocol/servers/issues/220](https://github.com/modelcontextprotocol/servers/issues/220). This issue highlighted some shortcomings of the existing mcp-memory when not supplying a json memory file. 

Inspired by this and realizing that the initial flat file approach (and even just using simple JSON files) could quickly become unwieldy, especially with the potential for more complex data structures (I really don't know what the AI is going to start making without me giving examples) and concurrent access, I decided to take a slightly different path.

### Forking and Embracing PouchDB

Instead of just directly implementing CouchDB from scratch, I decided to build upon an existing effort. I forked the repository `https://github.com/BRO3886/mcp-memory-custom/`. This project was already exploring ways to manage data within the context of the MCP, and it seemed like a great starting point.

The original approach in the forked repository was still leaning towards in-memory storage or potentially simpler file-based JSON. However, I quickly realized that for a more scalable and robust solution, especially given the potential for multi-read scenarios from the "mcp server," a more robust database was needed. Honestly thought about KeyDB and a few other ideas. I really wanted to find a sqlite but for redis, ie a lightning fast embedded db like good ol rocksdb, but its been so long since working with leveldb. But I digress.

That's where **PouchDB** came in. PouchDB is a JavaScript library that brings the power of CouchDB to the browser and Node.js. Importantly, it's designed to sync seamlessly with CouchDB. This made it a perfect fit for my needs, allowing me to leverage the familiar CouchDB document model and its benefits while potentially having the flexibility to run it in different environments if needed.

### Why PouchDB Over Pure JSON or Flat Files?

When I was just loading up some d&d characters I noticed that the knowledge graph in json was growing fairly large. Since this memory.json file is getting read in at every chat request, figured it was going to get large fast. soooo the limitations of simple JSON files or even a more basic in-memory storage /become clear:

* **Scalability:** Managing a large amount of data in flat JSON files can become slow and inefficient.
* **Concurrency:** Handling multiple read/write operations on simple files without proper locking mechanisms can lead to data corruption or inconsistencies.
* **Structure:** While JSON is structured, managing complex relationships and querying data efficiently in a flat file structure can be challenging.

PouchDB, being a CouchDB-compatible database, offers some pretty great advantages:

* **Document-Oriented:** Data is stored as JSON documents, which is a natural fit for many types of data.
* **Synchronization:** PouchDB can easily sync with a CouchDB server, providing a robust backend for more persistent storage and easier sharing.
* **Indexing and Querying:** While not as feature-rich as a full-fledged CouchDB server in all aspects, PouchDB provides basic indexing and querying capabilities that are far superior to manually parsing JSON files.
* **Conflict Resolution:** CouchDB and PouchDB have built-in mechanisms for handling conflicts during concurrent updates, ensuring data integrity.

### Integrating PouchDB

The first step in our upgrade journey was to make some key changes to our codebase to use PouchDB instead of flat files:

```typescript
import PouchDB from 'pouchdb';
import PouchDBMemory from 'pouchdb-adapter-memory';
import { z } from "zod";

// Register memory adapter
PouchDB.plugin(PouchDBMemory);
```

For our use case, I chose the memory adapter for PouchDB. This provides an in-memory database with all the benefits of PouchDB's API without the I/O overhead of disk operations. While this means the database won't persist across server restarts, it's perfect for our needs since we're already maintaining a backup to disk.

The configuration was updated to use this adapter:

```typescript
// Initialize PouchDB with configuration from environment variables
const pouchDbPath = process.env.POUCHDB_PATH || 'memory_db';
const pouchDbOptions = {
  adapter: 'memory',
  auto_compaction: true,
  revs_limit: 10,
  ...(process.env.POUCHDB_OPTIONS ? JSON.parse(process.env.POUCHDB_OPTIONS) : {})
};

// added the below because i really needed to see this in the Claude log files
console.error("Attempting to make a pouchDB instance with path", pouchDbPath, "and options", pouchDbOptions);
const db = new PouchDB(pouchDbPath, pouchDbOptions);
```

One important aspect when working with any database is proper resource cleanup. Close them resources folks.

```typescript
// Setup cleanup on process exit
async function cleanup() {
  try {
    console.error("Cleaning up PouchDB...");
    await db.close();
    console.error("PouchDB cleanup complete");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

process.on('exit', () => {
  cleanup().catch(console.error);
});

process.on('SIGINT', () => {
  cleanup().then(() => process.exit(0)).catch(() => process.exit(1));
});

process.on('SIGTERM', () => {
  cleanup().then(() => process.exit(0)).catch(() => process.exit(1));
});
```

### Leveraging the Adapter for Multi-Reads 

One of the challenges with database operations is handling concurrent requests and potential failures. PouchDB operations can occasionally fail with "Resource temporarily unavailable" errors, especially under heavy load. I ran into this fairly quickly on using mcp-memory. Im not sure how many instances of memory are started for claude desktop - but I feel like its at least two. Will need to do more research/coding on that.

To address this, I implemented a retry mechanism with exponential backoff:

```typescript
// Add retry utility
private async wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async retryOperation<T>(operation: () => Promise<T>, maxRetries = 5, initialDelay = 1000): Promise<T> {
  let lastError;
  let delay = initialDelay;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      if (error.message?.includes('Resource temporarily unavailable')) {
        console.error(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await this.wait(delay);
        // Exponential backoff with jitter (caffinated)
        delay = Math.min(delay * 2, 10000) * (0.75 + Math.random() * 0.5);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}
```

This utility function wraps database operations and automatically retries them if they fail due to resource unavailability. The exponential backoff with jitter is a well-established pattern for handling retries without creating thundering herd problems.

I then updated the database operations to use this retry mechanism:

```typescript
private async loadGraph(): Promise<KnowledgeGraph> {
  try {
    const result = await this.retryOperation(() => db.allDocs({ include_docs: true }));
    const graph: KnowledgeGraph = { entities: [], relations: [] };
    
    result.rows.forEach(row => {
      const doc = row.doc as unknown as Entity | Relation;
      if (doc && doc.type === 'entity') {
        graph.entities.push(doc as Entity);
      } else if (doc && doc.type === 'relation') {
        graph.relations.push(doc as Relation);
      }
    });
    
    return graph;
  } catch (error) {
    console.error('Error loading graph:', error);
    return { entities: [], relations: [] };
  }
}

private async saveGraph(graph: KnowledgeGraph): Promise<void> {
  try {
    // Save to PouchDB with retry
    const docs = [
      ...graph.entities,
      ...graph.relations
    ];
    await this.retryOperation(() => db.bulkDocs(docs));
    
    // Backup to file
    const lines = [
      ...graph.entities.map((e) => JSON.stringify({ ...e })),
      ...graph.relations.map((r) => JSON.stringify({ ...r })),
    ];
    await fs.writeFile(this.memoryFilePath, lines.join("\n"));
  } catch (error) {
    console.error('Error saving graph:', error);
    throw error;
  }
}
```

With these changes, the MCP memory server can now handle multiple concurrent read requests without issues. The memory adapter provides fast access while the retry mechanism ensures resilience against transient failures.

Another benefit of using PouchDB is built-in document versioning through its revision system. This helps maintain data integrity and provides a foundation for potential future features like undo/redo or version history exploration.

The beauty of PouchDB is that it gives us the option to sync with a remote CouchDB instance in the future if we need more persistence or want to share the knowledge graph across different services. Since we're using the standard PouchDB API, this migration path is kept open without any code changes required in our core logic.

### Enhancing MCP Protocol Capabilities with Resources and Prompts

An important part of the upgrade was implementing the MCP Protocol's resources and prompts API endpoints. These handlers provide important metadata about the memory server's capabilities, making it more discoverable and self-documenting for MCP clients:

```typescript
// Add resources/list and prompts/list handlers
const resources = [
  {
    name: "memory",
    description: "A knowledge graph memory store for maintaining context about entities and their relationships",
    type: "memory",
    capabilities: {
      create: true,
      read: true,
      update: true,
      delete: true,
      search: true
    }
  }
];

const prompts = [
  {
    name: "default",
    description: "Default prompt for interacting with the memory store",
    text: `
    Follow these steps for each interaction:
    1. The memoryFilePath for this project is /path/to/memory/project_name.json...
    // Prompt content here
    `
  }
];

const ListResourcesRequestSchema = z.object({
  method: z.literal("resources/list"),
});

const ListPromptsRequestSchema = z.object({
  method: z.literal("prompts/list"),
});

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return { resources };
});

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return { prompts };
});
```

With these handlers in place, MCP clients can discover the server's capabilities and even get suggested prompts for interaction. This is particularly useful for new users who might not be familiar with how to structure their interactions with the memory system. Also it has the added benefit of me not seeing logs of meaningless errors in the Claude logs. Thanks to the everything mcp server which had some examples for me to follow because prompts/resources def don't feel as emulated as the tools do.

The resources list indicates that our memory system supports full CRUD operations plus search functionality, while the prompts list provides a default template that can guide AI models in effectively using the memory system. This approach makes our memory server more self-documenting and easier to integrate with various MCP clients.

### The Journey Continues

By forking the `mcp-memory-custom` repository and integrating PouchDB, I'm aiming for a more robust and scalable solution for managing the data related to my project (having more contextual conversations around op d&d characters for baulders gate). So this move addresses the limitations of simple file-based storage and leverages the strengths of a document database, especially in the context of potential concurrent access as highlighted in the MCP server issue above.

I'm still in the process of fully integrating and testing this new approach, but I'm optimistic that this will provide a much better foundation for managing my data going forward. And more importantly it seems to be working...

Still want to move some of the functionality out of the prompt itself and into the mcp server, but I can go into that on another day. Oh, and if you want to follow along check out: [mcp-memory-pouchdb](https://github.com/bneil/mcp-memory-pouchdb)