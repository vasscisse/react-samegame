# Improvement Tickets

## Ticket 1: Replace timer singleton with React-idiomatic hook

**Priority:** High

**Description:**
The `timerCountDown` IIFE in `src/components/timer.jsx` (lines 10–80) is a module-level singleton with mutable state that lives outside React's lifecycle. It uses `setInterval`, closures, and a hand-rolled observer pattern to communicate back to the component. Additionally, the `Timer` component dispatches actions and starts the timer during the render phase (lines 102–111), which is a side effect in the render phase — a React anti-pattern that causes bugs with React strict mode and concurrent features.

**What to do:**
- Remove the `timerCountDown` IIFE singleton entirely.
- Replace it with a `useEffect` + `useRef` approach, or a custom `useTimer` hook.
- Move all side effects (starting the timer, dispatching actions) into `useEffect` so they run after render, not during.
- Ensure the interval is properly cleaned up on unmount via the `useEffect` cleanup function.

**Affected files:**
- `src/components/timer.jsx`

---

## Ticket 2: Fix Redux state mutation in game utilities

**Priority:** High

**Description:**
The `updateBoard` function in `src/utils/index.js` (lines 163–188) passes the `bubbles` array from Redux state into `_deleteBubbleRecursively` and `_moveBubblesDown`, both of which mutate the array in place. This is a direct mutation of Redux state, violating Redux's immutability principle and causing potential bugs such as missed re-renders.

**What to do:**
- At the start of `updateBoard`, deep-clone the `bubbles` array before passing it to any mutating function (e.g., `const bubbles = gamePayload.game.bubbles.map(b => ({ ...b }));`).
- Alternatively, rewrite `_deleteBubbleRecursively` and `_moveBubblesDown` to produce new arrays immutably instead of mutating in place.

**Affected files:**
- `src/utils/index.js` (functions: `updateBoard`, `_deleteBubbleRecursively`, `_moveBubblesDown`, `_moveOneBubbleDown`)

---

## Ticket 3: Stop passing entire Redux state through action payloads

**Priority:** High

**Description:**
In `src/components/board.jsx` (lines 31–33), the `onDelete` handler dispatches the entire `game` state object as the action payload: `dispatch(actionUpdateBoard({ bubble: bubble, game: game }))`. The reducer already receives `state` as its first argument, so passing the full state via the action is redundant, breaks Redux conventions, and makes data flow confusing.

**What to do:**
- Change the `onDelete` dispatch to only pass the bubble identifier (e.g., `dispatch(actionUpdateBoard({ bubble }))`).
- Update the `actionUpdateBoard` action creator in `src/reducers/game.js` accordingly.
- Update the game reducer to use its own `state` parameter to access the current game data, rather than reading it from `action.payload.game`.
- Update `updateBoard` in `src/utils/index.js` to accept the game state and bubble as separate arguments if needed.

**Affected files:**
- `src/components/board.jsx`
- `src/reducers/game.js`
- `src/utils/index.js`

---

## Ticket 4: Optimize bubble lookups with a 2D data structure

**Priority:** Medium

**Description:**
`_getBubbleAt` in `src/utils/index.js` (lines 33–38) does a `.filter()` over the entire flat array to find a bubble by coordinates. This is called recursively in `_deleteBubbleRecursively` and in nested loops in `_moveBubblesDown`, resulting in high overall complexity (potentially O(n²) or worse per move).

**What to do:**
- Replace the flat `bubbles` array with a 2D array indexed by `[x][y]`, or use a `Map` keyed by `"x,y"` strings for O(1) coordinate lookups.
- Update `_getBubbleAt`, `_deleteBubbleRecursively`, `_moveBubblesDown`, `_isOver`, `startNewGame`, and `updateBoard` to work with the new data structure.
- Ensure the Board component and any other consumers are updated to handle the new structure.

**Affected files:**
- `src/utils/index.js`
- `src/components/board.jsx` (if it iterates over bubbles)
- `src/reducers/game.js` (if it accesses bubbles directly)

---

## Ticket 5: Add meaningful test coverage

**Priority:** Medium

**Description:**
The only test is the CRA boilerplate smoke test in `src/App.test.js` (lines 5–9), and it would actually fail because `<App>` requires a Redux `<Provider>` wrapper that the test doesn't supply.

**What to do:**
- Fix the existing smoke test by wrapping `<App>` in a Redux `<Provider>` with a mock store.
- Add unit tests for the pure game logic in `src/utils/index.js`: test `startNewGame`, `updateBoard`, `_deleteBubbleRecursively` (via `updateBoard`), `_moveBubblesDown` (via `updateBoard`), `_incrementScoreAndBonus`, `_hasWon`, `_isOver`, and `isNotDeletedColor`.
- Add unit tests for the reducers in `src/reducers/game.js`, `src/reducers/login.js`, and `src/reducers/timer.js`.
- Consider adding integration tests for key user flows (login, clicking a bubble, game over).

**Affected files:**
- `src/App.test.js`
- New test files (e.g., `src/utils/index.test.js`, `src/reducers/game.test.js`, etc.)

---

## Ticket 6: Upgrade outdated dependencies

**Priority:** Medium

**Description:**
`package.json` pins very old versions: React 16.8.6, Redux 4.0.1, Bootstrap 4.1.1, react-scripts 3.0.1. Modern equivalents (React 18, Redux Toolkit, Bootstrap 5) offer significant improvements in API ergonomics, performance, bundle size, and security patches.

**What to do:**
- Upgrade React and React DOM to React 18. Update `src/index.js` to use `createRoot` instead of `ReactDOM.render`.
- Replace Redux + react-redux with Redux Toolkit (`@reduxjs/toolkit`). Rewrite reducers as slices using `createSlice`, which also handles immutability via Immer.
- Upgrade Bootstrap to v5 and update any v4-specific class names or markup.
- Upgrade react-scripts to the latest version (or migrate to Vite).
- Run the app and tests after each upgrade to catch breakages.

**Affected files:**
- `package.json`
- `src/index.js`
- `src/reducers/` (all reducer files)
- `src/components/` (any Bootstrap-specific markup)

---

## Ticket 7: Convert Login from class component to functional component

**Priority:** Low

**Description:**
`src/components/login.jsx` (lines 3–11) is the only class component in the codebase. Every other component uses functional components with hooks. `Login` only uses local state, which `useState` handles fine.

**What to do:**
- Rewrite `Login` as a functional component using `useState` for `username` and `errorMsg`.
- Move the `regEx` to a module-level constant (it doesn't need to be an instance property).
- Keep the same props interface (`launchGame` callback).

**Affected files:**
- `src/components/login.jsx`

---

## Ticket 8: Replace deprecated `<font>` tags and fix inline styles

**Priority:** Low

**Description:**
The `<font>` HTML tag (deprecated since HTML 4.01) is used in two places:
- `src/components/login.jsx` line 53: `<font color="red">{this.state.errorMsg}</font>`
- `src/components/timer.jsx` line 119: `<font color="red">{count}</font>`

Additionally, inline style objects are recreated on every render in `Board` (`boardStyle`, lines 12–19) and `Bubble` (`bubbleStyle`, lines 11–19), causing unnecessary object allocations.

**What to do:**
- Replace `<font color="red">` with `<span className="text-danger">` (Bootstrap class) or a custom CSS class.
- Move `boardStyle` and `bubbleStyle` to CSS classes, or memoize them with `useMemo` (for `bubbleStyle`, which depends on `props.bubble.color`, use `useMemo` with the color as a dependency).

**Affected files:**
- `src/components/login.jsx`
- `src/components/timer.jsx`
- `src/components/board.jsx`
- `src/components/bubble.jsx`
- `src/App.css` (or a new CSS file for the new classes)

---

## Ticket 9: Fix typos and naming issues

**Priority:** Low

**Description:**
Several typos and misleading names exist in the codebase:
1. `"you are a looser"` in `src/components/rightbar.jsx` line 46 — should be `"loser"`.
2. `_winingScore` in `src/utils/index.js` line 14 — should be `_winningScore`.
3. `_isNotNull` in `src/utils/index.js` lines 29–31 — the name suggests a null check, but it actually checks for `undefined` and all falsy values. It also uses `!=` instead of `!==`.

**What to do:**
- Fix `"looser"` → `"loser"` in `rightbar.jsx`.
- Rename `_winingScore` → `_winningScore` in `utils/index.js` and update all references.
- Rename `_isNotNull` to something more accurate (e.g., `_isDefined` or `_isTruthy`), use `!==` instead of `!=`, and review all call sites to ensure the broader falsy check is actually intended.

**Affected files:**
- `src/components/rightbar.jsx`
- `src/utils/index.js`

---

## Ticket 10: Remove unused CSS and simplify utility module pattern

**Priority:** Low

**Description:**
Two minor cleanup items:
1. `src/App.css` contains CRA boilerplate styles (`App-logo`, `App-header`, `App-link`, `App-logo-spin`) that are never used anywhere in the app.
2. The `utils` module in `src/utils/index.js` uses the revealing module pattern (IIFE) to encapsulate private functions. This is unnecessary in an ES module system — ES modules already provide encapsulation via non-exported symbols.

**What to do:**
- Remove all unused CSS rules from `src/App.css`.
- Refactor `src/utils/index.js`: remove the IIFE wrapper, make private functions regular (non-exported) module-level functions, and use named exports for the public API (`startNewGame`, `gameHasStarted`, `updateBoard`, `isNotDeletedColor`, `emptyGameData`).
- Simplify `_hasWon` to `return score >= _winningScore;` and `isNotDeletedColor` to `return color !== _deletedColor;`.

**Affected files:**
- `src/App.css`
- `src/utils/index.js`
