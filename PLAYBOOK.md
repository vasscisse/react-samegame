# Playbook

This document defines the workflow and execution plan for the improvement tickets listed in [TICKETS.md](./TICKETS.md).

## Ground Rules

| Rule | Detail |
|---|---|
| **One ticket, one PR** | Each ticket gets its own feature branch and PR. No bundling. |
| **Sequential execution** | Work on one ticket at a time. The next ticket starts only after the current PR is merged by the repo owner. |
| **Approach first, code second** | Before any implementation, a detailed implementation plan is presented for review. Work begins only after explicit approval. |
| **Best practices** | Clean commits, meaningful commit messages, proper test coverage, no lint warnings, no regressions. |
| **PR ownership** | PRs are raised but never merged by the implementer. Only the repo owner merges. |

## Ticket Execution Order

Tickets are reordered by priority and dependency rather than ticket number:

| Order | Ticket | Title | Priority | Rationale |
|---|---|---|---|---|
| 1 | #9 | Fix typos and naming issues | Low | Zero-risk, no behavioral change. Good warm-up and establishes the PR workflow. |
| 2 | #7 | Convert Login to functional component | Low | Isolated to one file, no cross-cutting concerns. |
| 3 | #8 | Replace `<font>` tags and fix inline styles | Low | Small scope, touches a few components. |
| 4 | #10 | Remove unused CSS and simplify utility module pattern | Low | Cleanup that simplifies `utils/index.js` before heavier refactors touch it. |
| 5 | #4 | Fix Redux state mutation in game utilities | High | Fixes a correctness bug. Should land before new tests are written so tests validate correct behavior. |
| 6 | #5 | Stop passing entire Redux state through action payloads | High | Fixes a design flaw in the data flow. Cleaner state access before further refactors. |
| 7 | #3 | Replace timer singleton with React-idiomatic hook | High | Removes a major anti-pattern. Depends on cleaner Redux patterns from #4/#5. |
| 8 | #1 | Add meaningful test coverage | Medium | Now that bugs are fixed and patterns are clean, tests lock in correct behavior. |
| 9 | #6 | Optimize bubble lookups with 2D data structure | Medium | Structural refactor of the data model — safer to do after test coverage exists from #1. |
| 10 | #2 | Upgrade outdated dependencies | Medium | Most invasive change. Having tests (#1) and clean code (#3–#10) makes this much safer. Done last. |

## Workflow Per Ticket

1. Present the implementation approach (files affected, changes, risks).
2. Repo owner reviews and approves (or requests adjustments).
3. Implement on a feature branch and raise a PR.
4. Repo owner reviews the PR.
5. Repo owner merges when satisfied.
6. Move to the next ticket.

## Branch Naming Convention

```
ticket-{number}/{short-description}
```

Examples:
- `ticket-9/fix-typos`
- `ticket-7/login-functional-component`
- `ticket-8/replace-font-tags`
- `ticket-10/cleanup-css-and-utils`
- `ticket-4/fix-state-mutation`
- `ticket-5/fix-action-payloads`
- `ticket-3/timer-hook`
- `ticket-1/add-test-coverage`
- `ticket-6/optimize-bubble-lookups`
- `ticket-2/upgrade-dependencies`

## Progress Tracker

| Order | Ticket | Status |
|---|---|---|
| 1 | #9 | ⬜ Not started |
| 2 | #7 | ⬜ Not started |
| 3 | #8 | ⬜ Not started |
| 4 | #10 | ⬜ Not started |
| 5 | #4 | ⬜ Not started |
| 6 | #5 | ⬜ Not started |
| 7 | #3 | ⬜ Not started |
| 8 | #1 | ⬜ Not started |
| 9 | #6 | ⬜ Not started |
| 10 | #2 | ⬜ Not started |
