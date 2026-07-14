---
title: A small static site
date: 2026-07-13
description: Notes on keeping a personal site simple, legible, and easy to maintain.
---

The best portfolio is one I can understand six months later. For this version, that means a small set of HTML pages, one stylesheet, and Markdown for longer writing.

## What belongs here

My research interests sit at the intersection of chain-of-thought reasoning, AI evaluation and benchmarking, and model optimization for computational efficiency. A blog gives me room to write down experiments and reading notes without turning the home page into a résumé.

| Part | Format | Reason |
| --- | --- | --- |
| Home page | HTML | Direct and fast |
| Visual style | CSS | One shared source of truth |
| Posts | Markdown | Comfortable to write and review |

Markdown can hold ordinary prose, [links](https://github.com/asasamori), images, GIFs, tables, and fenced code blocks:

```python
def evaluate(model, examples):
    return sum(model(x) == y for x, y in examples) / len(examples)
```

![A digital garden illustration](/images/garden.webp)

> The goal is not to remove personality. It is to make the writing and work easier to find.

Future posts can be added as individual `.md` files in `content/blogs/`. The title, date, and description at the top become the post metadata; everything below becomes the article.
