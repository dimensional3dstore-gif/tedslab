# Agent Training and Evaluation

## Build an evaluation set
Include common tasks, edge cases, ambiguous instructions, prompt injection, and tool failures.

For each case, define the expected behavior and the unacceptable outcomes before testing. Measure task success, factuality, policy compliance, latency, and cost separately. Compare changes against a fixed baseline and retain representative failures for regression tests.

Do not treat preference feedback or a single benchmark as proof of general capability. Re-evaluate after changing prompts, models, tools, or data sources.
