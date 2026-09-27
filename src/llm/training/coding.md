# Coding Workflow

1. Read the owning implementation and one nearby test or call site.
2. State a specific hypothesis about the behavior before editing.
3. Make the smallest change that addresses the controlling code path.
4. Run the narrowest check that could disprove the hypothesis.
5. Review the diff for unrelated changes and preserve existing user work.
6. Report what passed and what remains unverified.

Avoid broad refactors when a focused behavioral fix is sufficient.
