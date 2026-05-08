---
title: dataview-connection-panel
description: "[NOTE] obsidian dataview connection panel"
date: 2026-04-28T09:32:05-06:00
preview: ""
draft: false
tags: ["notes", "obsidian", "dataview"]
categories: ["notes"]
---

TL;DR: A pinned sidebar panel that shows a date-sorted table of all notes linking to currently viewing.

Usually in obsidian I have a graph view of open but ive found this to be better in understanding connections, 
since i can view the created and modified dates. Just make sure you have dataview installed and then make sure to drag this into the panel area of you choice.


Note the markdown needs to have 'dataviewjs' after the three backwhacks

also sorry if you aren't in dark mode, i need to fix the coloring for light mode.... sorry

```dataviewjs
async function render() {
    dv.container.empty();

    const btn = dv.container.createEl("button", { text: "Refresh" });
    btn.style.marginBottom = "12px";
    btn.onclick = () => render();

    const selfPath = dv.current().file.path;
    let target = null;
    let bestTime = 0;

    app.workspace.iterateAllLeaves(leaf => {
        if (leaf.view.getViewType() !== "markdown") return;
        const file = leaf.view.file;
        if (!file || file.path === selfPath) return;
        if (leaf.activeTime > bestTime) {
            bestTime = leaf.activeTime;
            target = file;
        }
    });

    if (!target) {
        dv.paragraph("_Open a note in another pane to see its connections._");
        return;
    }

    const page = dv.page(target.path);
    const inlinks  = (page.file.inlinks?.values  ?? []);
    const outlinks = (page.file.outlinks?.values ?? []);

    const merged = new Map();
    for (const l of inlinks)  merged.set(l.path, { link: l, dir: "← in" });
    for (const l of outlinks) {
        if (merged.has(l.path)) merged.get(l.path).dir = "↔ both";
        else merged.set(l.path, { link: l, dir: "→ out" });
    }

    const rows = [];
    for (const { link, dir } of merged.values()) {
        const p = dv.page(link.path);
        if (!p) continue;
        rows.push([p.file.link, dir, p.file.ctime, p.file.mtime]);
    }

    rows.sort((a, b) => b[2] - a[2]);

    dv.header(3, `Connections: ${target.basename}`);
    dv.table(["Note", "Direction", "Created", "Modified"], rows);
}

render();
```

edit:
I reworked this a few more times over the past week, here is the latest

```dataviewjs
async function render() {
    dv.container.empty();

    // Refresh button
    const btn = dv.container.createEl("button", { text: "🔄 Refresh" });
    btn.style.marginBottom = "12px";
    btn.onclick = () => render();

    // Find the most recently active markdown file that isn't this panel
    const selfPath = dv.current().file.path;
    let target = null;
    let bestTime = 0;

    app.workspace.iterateAllLeaves(leaf => {
        if (leaf.view.getViewType() !== "markdown") return;
        const file = leaf.view.file;
        if (!file || file.path === selfPath) return;
        if (leaf.activeTime > bestTime) {
            bestTime = leaf.activeTime;
            target = file;
        }
    });

    if (!target) {
        dv.paragraph("_Open a note in another pane to see its connections._");
        return;
    }

    const page = dv.page(target.path);
    const inlinks  = (page.file.inlinks?.values  ?? []);
    const outlinks = (page.file.outlinks?.values ?? []);

    const dirEmoji = { in: "←", out: "→", both: "↔" };

    const merged = new Map();
    for (const l of inlinks)  merged.set(l.path, { link: l, dir: "in" });
    for (const l of outlinks) {
        if (merged.has(l.path)) merged.get(l.path).dir = "both";
        else merged.set(l.path, { link: l, dir: "out" });
    }

    const items = [];
    for (const { link, dir } of merged.values()) {
        const p = dv.page(link.path);
        if (!p) continue;
        items.push({ page: p, dir });
    }

    // Newest first by creation date — swap ctime → mtime to sort by modified instead
    items.sort((a, b) => b.page.file.ctime - a.page.file.ctime);

    dv.header(3, `Connections: ${target.basename}`);

    if (items.length === 0) {
        dv.paragraph("_No connections._");
        return;
    }

    const rows = [];
    for (const { page: p, dir } of items) {
        const cell = document.createElement("div");

        // Title line: clickable internal link + direction emoji
        const titleLine = cell.createEl("div");
        const a = titleLine.createEl("a", {
            cls: "internal-link",
            text: p.file.name,
            attr: {
                href: p.file.path,
                "data-href": p.file.path,
                target: "_blank",
                rel: "noopener"
            }
        });
        titleLine.appendText(` ${dirEmoji[dir]}`);

        // Date line: small, dimmed creation date
        const dateLine = cell.createEl("div");
        dateLine.style.fontSize = "0.8em";
        dateLine.style.opacity = "0.65";
        dateLine.textContent = p.file.ctime.toFormat("yyyy-MM-dd");

        rows.push([cell]);
    }

    dv.table(["Note"], rows);
}

render();
```
