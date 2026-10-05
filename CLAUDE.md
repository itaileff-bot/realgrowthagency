# realgrowthagency

## Compound Engineering workflow

Plugin: `compound-engineering@compound-engineering-plugin` (EveryInc). Use this cycle for every change in this repo, bug or feature:

1. `/ce-explain` to read the live code, routes, env var names and deployment config before changing anything.
2. `/ce-brainstorm <feature or bug>` to record desired behaviour, constraints, acceptance criteria and what must stay unchanged. Use `/ce-debug` first for bugs.
3. `/ce-plan` to find affected components, security risks, dependencies, tests, migrations and rollback steps. Review the plan before edits.
4. `/ce-work` to implement in small reviewable steps. Preserve existing routes, layout and design. Never expose secrets.
5. `/ce-simplify-code` then `/ce-code-review` to catch regressions, unnecessary complexity, missing checks, permissions and error handling.
6. Test the real app: lint, TypeScript, build, unit and integration tests, browser flows (`/ce-test-browser`), sign-in, registration, password reset, role isolation, forms, API failure paths, mobile layout at 375px.
7. Confirm the exact commit's Vercel deployment is READY (green) before starting the next change. Push to main only after review and checks pass.
8. `/ce-compound` to record root cause, verified fix, tests and reusable decisions under `docs/solutions/`.

Do not run `/lfg` hands-off in this repo; each change needs a human-reviewable step and a Vercel check.

Acceptance checklist before calling any change done: pages and navigation; buttons and forms; auth (sign-in, registration, password reset, role isolation); Firestore rules and audit logging; API validation, rate limits and safe error responses; email delivery; external API failure paths; secrets and env var validation; imports, TypeScript and build; mobile layout; browser end-to-end journeys; exact-commit Vercel status. Report what was tested, what failed and what could not be checked.

`docs/solutions/`  # documented solutions to past problems (bugs, best practices, workflow patterns), organized by category with YAML frontmatter (module, tags, problem_type)

After a solved, verified problem, automatically invoke the `ce-compound` skill with `mode:non-interactive` at the completion checkpoint only when the work produced durable project reasoning that is not readily recoverable from the final code, tests, types, comments, or existing documentation, and losing it would plausibly cause recurrence, material risk, or substantial rediscovery. Apply this counterfactual: if the learning document disappeared, would a future engineer reading the final implementation still be likely to repeat the mistake or redo substantial investigation? If not, do not invoke it. Completion, effort, and diff size alone are not enough. Capture at the checkpoint so a qualifying learning can ship in the PR that produced it, and only where the repository treats captured learnings as tracked, committed knowledge.

Write every report, summary, or handoff to the user through the `ce-noslop` skill. This applies when you are the top-level agent writing to the user, not when you are a subagent reporting to its caller. Do not apply it to code, config, verbatim quotes, or text the user asked to post as written.
