# Creating Agents

## Design checklist
- Give the agent one bounded role and a clear completion condition.
- Separate trusted instructions from user data and retrieved content.
- Grant the minimum tools and permissions needed for the task.
- Require confirmation for irreversible or externally visible actions.
- Set time, token, and retry limits; handle tool failures explicitly.
- Log decisions without storing secrets or unnecessary personal data.

Evaluate normal, ambiguous, adversarial, and failure cases before deployment.
