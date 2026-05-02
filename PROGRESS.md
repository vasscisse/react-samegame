# Tickets Progress

Tracks the implementation status of each ticket in [`TICKETS.md`](./TICKETS.md). Tickets are processed sequentially per the `!implement_ticket` playbook (low-priority cleanup first, then high-priority correctness, then medium-priority improvements).

## Status legend
- [x] **Done** — implemented, PR merged into `master`.
- [~] **In progress** — branch open or PR raised, awaiting review/merge.
- [ ] **Pending** — not yet started.

## Completed

| # | Ticket | Priority | PR |
|---|---|---|---|
| 9  | Fix typos and naming issues                          | Low  | [#3](https://github.com/vasscisse/react-samegame/pull/3) |
| 7  | Convert Login from class to functional component     | Low  | [#4](https://github.com/vasscisse/react-samegame/pull/4) |
| 8  | Replace deprecated `<font>` tags and fix inline styles | Low | [#5](https://github.com/vasscisse/react-samegame/pull/5) |
| 10 | Remove unused CSS and simplify utility module pattern | Low  | [#6](https://github.com/vasscisse/react-samegame/pull/6) |
| 4  | Fix Redux state mutation in game utilities           | High | [#7](https://github.com/vasscisse/react-samegame/pull/7) |

## In progress

_None._

## Pending

| # | Ticket | Priority |
|---|---|---|
| 5 | Stop passing entire Redux state through action payloads | High   |
| 3 | Replace timer singleton with React-idiomatic hook       | High   |
| 6 | Optimize bubble lookups with a 2D data structure        | Medium |
| 1 | Add meaningful test coverage                            | Medium |
| 2 | Upgrade outdated dependencies                           | Medium |

## Notes

- One ticket = one branch = one PR (`ticket-{N}/{short-description}`).
- Plans are approved before implementation (per the playbook's "approach first, code second" rule).
- The implementer never merges — the repo owner does.
