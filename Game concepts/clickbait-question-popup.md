# ClickBait — Door Question Popup · Build & Integration Guide

A reusable, self-contained popup for the cyber-safety door challenges. It keeps
your existing question data shape and game rules (18-second timer, 1-coin hints,
fish-buff on a wrong/timed-out answer) and adds a polished interface: a circular
countdown ring, A/B/C/D answer chips, inline correct/wrong reveal, a hint panel,
keyboard play, and a learning-point step before resuming.

- **Demo file:** `clickbait-question-popup.html` — open it and click through.
- **Drop-in API:** one object, `QPopup`, you call from your existing `openQuestion`.

---

## 1. What changed vs. the current version

| Area | Before | Now |
|------|--------|-----|
| Timer | Plain number in a pill | Circular ring that drains, turns amber at ≤8s, red + pulses at ≤4s |
| Answers | Bare buttons | A/B/C/D badge chips; on answer the correct one goes green, a wrong pick goes red |
| Hint | Text appears | Dedicated panel, button disables after use, coin cost shown |
| Feedback | One line | Inline line **plus** a learning-point card that slides in |
| Input | Mouse only | Keyboard: `A`–`D` / `1`–`4` answer, `H` hint, `Enter` continue |
| Resume | Auto after a timeout | Player taps **Continue** (or `Enter`) — they read the lesson at their pace |
| Structure | Logic mixed into `script.js` | Self-contained `QPopup` module with a small callback contract |

The grading, scoring, fish-buff and coin rules are unchanged — those stay in
*your* callbacks, so the popup never owns game state.

---

## 2. The data contract (unchanged)

Each question is the exact object your game already uses:

```js
{
  title:   "Door 1: School Account Warning",   // header line
  text:    "Your school account will be ...",  // the scenario
  answers: ["...", "...", "...", "..."],        // 2–4 options
  correct: 2,                                    // index into answers[]
  hint:    "Look at the sender ...",            // shown when a hint is bought
  lesson:  "Urgent account deletion ..."        // the learning point
}
```

No migration needed — point the popup at your existing `questions` array.

---

## 3. The API

One call opens the popup. You pass the question and a set of callbacks; the
popup handles timing, hint spending, answer reveal and the learning step, then
hands control back to you.

```js
QPopup.show(question, {
  getCoins:   ()        => cyberCoins,          // popup asks before allowing a hint
  spendCoins: (n)       => { cyberCoins -= n; updateHud(); },
  onCorrect:  (q)       => { /* award score/coin, unlock door */ },
  onWrong:    (q, timedOut) => { /* buff fish, respawn player */ },
  onContinue: ()        => { resumeGame(false); } // player tapped Continue
});
```

**Callback reference**

| Callback | When it fires | What you do |
|----------|---------------|-------------|
| `getCoins()` | Player taps Use Hint | Return current coin count (number) |
| `spendCoins(n)` | Hint approved | Deduct `n` coins, refresh HUD |
| `onCorrect(q)` | Right answer | `+20` score, `+1` coin, `door.unlocked = true`, redraw |
| `onWrong(q, timedOut)` | Wrong **or** timeout | `buffFish()`, respawn player, set door cooldown |
| `onContinue()` | Continue / `Enter` | Close out and `resumeGame(false)` |

The popup decides *correct vs. wrong* (index === `q.correct`, or timeout) and
shows the visuals; your callbacks decide *what it means for the game*.

---

## 4. Wiring it into your game

### a) Markup
Replace your current `#questionModal` block in `index.html` with the popup’s
markup (the `.q-overlay` element from the demo). Keep it inside `#gameBox` so it
overlays the canvas like your other modals.

### b) Styles
Copy the `/* QUESTION POPUP */` CSS block into `style.css`. It reuses your
palette variables — cyan `#67e8f9`, amber `#fef3c7`, blue `#2563eb`, purple
`#7c3aed` — so it matches the rest of the game.

### c) Script
Paste the `QPopup` module into `script.js`. Then your existing `openQuestion`
shrinks to a single call:

```js
function openQuestion(d) {
  clearKeys();
  currentDoor = d;
  questionOpen = true;
  running = false;
  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  const q = questions[d.id - 1];
  toast.textContent = `Door ${d.id} question opened.`;
  playSound("click");

  QPopup.show(q, {
    getCoins:   () => cyberCoins,
    spendCoins: (n) => { cyberCoins -= n; hintsUsed++; updateHud(); playSound("hint"); },

    onCorrect: (q) => {
      correctAnswers++; questionsAnswered++;
      score += 20; cyberCoins++;
      d.unlocked = true;
      playSound("correct"); playSound("unlock");
      updateHud(); draw();
    },

    onWrong: (q, timedOut) => {
      wrongAnswers++; questionsAnswered++;
      score = Math.max(0, score - 10);
      buffFish();
      setToCell(player, d.spawn, player.size);
      doorCooldownUntil = Date.now() + 1400;
      playSound("wrong");
      updateHud(); draw();
    },

    onContinue: () => {
      questionOpen = false;
      currentDoor = null;
      clearKeys();
      resumeGame(false);
    }
  });
}
```

You can now delete the old `startQuestionTimer`, `useHint`, `answerQuestion`,
`showLearning`, and `closeQuestionAndResume` functions — the popup covers all of
them. (Keep `buffFish`; it’s called from `onWrong`.)

### d) Pause safety
Because the popup runs its own timer, make sure `pauseGame()` can’t fire while
it’s open. You already gate movement on `questionOpen`; also early-return from
`pauseGame()` when `questionOpen` is true so `ESC` doesn’t stack a pause modal
on top of the question.

---

## 5. Behaviour spec

- **Timer:** starts at `QUESTION_TIME` (18s). Ring drains smoothly; at `0` it
  auto-submits as a timeout (treated as wrong).
- **Hint:** costs `HINT_COST` (1 coin). Disabled after one use or if the player
  can’t afford it (shows “Not enough Cyber Coins”). Never charges twice.
- **Answering:** locks all options, reveals the correct answer (green ✓) and,
  on a wrong pick, marks that choice red ✗.
- **Learning point:** the `lesson` text shows in a card after every answer;
  the player taps **Continue** to resume — nothing auto-dismisses, so they
  control the pace (better for the 11–16 learning goal).
- **Keyboard:** `A`–`D` or `1`–`4` to answer, `H` for hint, `Enter` to continue.
- **Accessibility:** dialog role + `aria-modal`, visible focus, and all motion
  is disabled under `prefers-reduced-motion`.

---

## 6. Config knobs

At the top of the module:

```js
const QUESTION_TIME = 18;  // seconds on the clock
const HINT_COST     = 1;   // coins per hint
```

Change these in one place and the ring, the hint button label, and the spend
logic all follow.

---

## 7. Tuning ideas (optional)

- **Harder doors:** lower `QUESTION_TIME` as `d.id` rises for escalating pressure.
- **Streak bonus:** track consecutive correct answers in `onCorrect` and award a
  bonus coin every 3 — reinforces learning without microtransactions.
- **Shuffle answers:** randomise `q.answers` order at `show()` time (remap
  `correct`) so memorising positions doesn’t help on replay.
- **Per-question hint cost:** pass a cost into `show()` if some doors should
  charge more for a hint.

---

*Interface and guide built against the existing `questions` data shape and the
`openQuestion` / `answerQuestion` flow in the ClickBait-Game build. Demo lives in
`clickbait-question-popup.html`.*
