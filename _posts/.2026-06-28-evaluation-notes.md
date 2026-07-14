---
layout: post
title: Evaluation notes from a small experiment
date: 2026-06-28
description: A sample research log showing lists, tables, quotations, and code.
---

This is a sample research log for demonstrating how a technical post might look. The experiment asks whether a small change to an evaluation prompt produces more consistent answers.

## Setup

The initial checklist was deliberately short:

1. Hold the examples constant.
2. Run each prompt three times.
3. Record accuracy and disagreement.
4. Read the failures instead of relying only on the aggregate score.

| Prompt | Accuracy | Disagreement |
| --- | ---: | ---: |
| Baseline | 0.71 | 0.18 |
| Revised | 0.76 | 0.09 |

The table is illustrative rather than a real result.

```python
def agreement(samples):
    most_common = max(set(samples), key=samples.count)
    return samples.count(most_common) / len(samples)
```

> A benchmark is most useful when its failures remain easy to inspect.

The next pass would separate formatting failures from reasoning failures and include a short qualitative note beside every example.
