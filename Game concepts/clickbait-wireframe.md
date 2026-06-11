# ClickBait — Cyber Maze · Wireframe

**Wireframe · Educational Cyber-Safety Game**

Players log in, answer cyber-safety questions to unlock maze doors, collect Cyber Coins, dodge a pursuing angler fish, and escape through a final door sealed by a strong password. Single-page web build (Canvas + modal overlays).

### Key parameters

| Setting | Value |
|---|---|
| Stage | 1160×680 |
| Maze | 29×17 |
| Health | 20 |
| Doors | 16 |
| Timer | 18s |
| Revive | 3 coins |
| Storage | localStorage |

---

## 00 · Persistent Frame

*Always visible around the game box — topbar + 9-cell HUD + canvas.*

**Page Shell** (Frame)

- **Topbar:** "ClickBait" + tagline — *Login, learn cyber safety, unlock doors, and escape the angler fish.*
- **HUD · 9-column status bar:**

| User | Score | Best | Health | Coins | Doors | Time | Best Time | Fish |
|---|---|---|---|---|---|---|---|---|
| Guest | 0 | 0 | 20/20 | 0 | 0/16 | 00:00 | --:-- | Buff 0 |

- **Game box · canvas 1160×680:** maze + sprites render here · all modals overlay this region.

> Footer line: "Move: WASD / Arrow Keys | Pause: ESC". A toast bar above it shows hints & status.

---

## 01 · Start / Auth Modal

*Entry gate — login or register, read the three rule tabs, accept all, then start.*

### Welcome to ClickBait (Initial)

**Auth box · Login**
- Username
- Password ••••••
- **[Login]**
- ‹ Create new account ›
- *[ auth message ]*

**Intro tabs:** How to Play · Parental · Terms

> • Move with WASD / Arrows • Pause with ESC
> • Correct answers unlock doors + give coins
> • Hints cost 1 coin • 3 coins revive you

**Acceptance — all required**
- [ ] I have read How to Play.
- [ ] I have read Parental Controls.
- [ ] I agree to the Terms and Conditions.

**[Start Game]**

### Register panel (Toggle)

**Auth box · Register**
- Choose username
- Choose password
- **[Register]**
- ‹ Back to login ›

### Logged-in state (Toggle)

- Logged in as **username** **[Logout]**

> Login / Register / Logged-in are mutually exclusive panels in the same auth box.

---

## 02 · Gameplay Canvas

*Main play loop — only the next door is drawn so the maze stays readable.*

**Maze · 29 × 17 grid** (Canvas)

On-canvas elements: player (WASD), coins, next door, angler fish, exit.

**Legend**
- **Player** — cell-to-cell, wall & locked-door blocked
- **Angler fish** — A* chase, speeds up when buffed
- **Cyber Coin** — hint = 1, revive = 3
- **Next door only** — only the upcoming door is drawn
- **Exit**

> A red damage-flash vignette pulses on the canvas edges when the player is caught or collides (−2 health).

---

## 03 · Door Challenge, Learning & Pause

*Reaching a door opens a timed question; the answer always routes through a learning point.*

### Question Modal (On door)

**Cyber Door Challenge** — Time: 18s

A cyber-safety scenario question with multiple-choice answers…

- **[Use Hint]** (−1 coin)
- *[ hint text appears here ]*
- **[Answer A]**
- **[Answer B]**
- **[Answer C]**
- **[Answer D]**
- *[ feedback ]*

> Correct → door unlocks, +score & +coins. Wrong / timeout → fish gets buffed. Either way → Learning modal, then resume.

### Learning Modal (After answer)

**Learning Point:** Short plain-language explanation of the correct cyber-safety concept for that question.

### Pause Modal (ESC)

**Paused** — Press ESC or Resume to continue.
- **[Resume]**
- **[Restart]**

---

## 04 · Final Door, Revive & Result

*End-game states — seal the exit, decide whether to spend coins, then see the result.*

### Password Modal (Final door)

**Final Door — Create a Strong Password**

Lock the final door behind you. If the password is strong, the fish can't follow.

- Create a strong password
- ✓ at least N characters
- ✓ upper + lower case
- ✗ contains a number
- ✗ contains a symbol
- *[ feedback ]*
- **[Lock Final Door]**

> Checks turn green live as typed; the door only locks (→ win) once the password is strong.

### Revive Modal (Health = 0)

**Revive Available** — You have enough Cyber Coins to revive with full health.
- **[Use 3 Cyber Coins]**
- **[Give Up]**

> Only shown if ≥3 coins. Use → full health, resume. Give Up / <3 coins → End.

### End / Result Modal (Win / Lose)

**Final Result**

| Field | Value |
|---|---|
| Score | value |
| Best Score | value |
| Time | value |
| Best Time | value |
| Doors | x/16 |
| Coins | value |

**[Restart]**

---

## 05 · State Flow

How the player moves between screens.

```
                    ┌──────────────┐
                    │  Start / Auth │
                    └──────┬───────┘
                           │ Start Game
                           ▼
            ESC     ┌──────────────┐     reach door
   ┌────────────────│   Gameplay   │──────────────┐
   ▼      Resume    └──────┬───────┘              ▼
┌───────┐ ──────────►      │                ┌──────────┐  answer  ┌──────────┐
│ Pause │                  │                │ Question │─────────►│ Learning │
└───────┘                  │                └──────────┘◄─resume──┘
                           │
        final door ────────┼──────── health 0
              ▼            │             ▼
   ┌────────────────┐      │       ┌──────────┐
   │ Password(final)│      │       │  Revive  │
   └───────┬────────┘      │       └────┬─────┘
           │ win           │  use coins │  give up
           ▼               │◄───────────┘     │
                    ┌──────────────┐◄─────────┘
                    │ End / Result │
                    └──────┬───────┘
                           │ Restart
                           └──────► (back to Start / Auth)
```

**Transitions**
- Start / Auth → Gameplay: *Start Game*
- Gameplay ↔ Pause: *ESC* / *Resume*
- Gameplay → Question: *reach door*
- Question → Learning: *answer*; Learning → Gameplay: *resume*
- Gameplay → Password (final): *final door*; Password → End: *win*
- Gameplay → Revive: *health 0*; Revive → Gameplay: *use coins*; Revive → End: *give up*
- End / Result → Start / Auth: *Restart*

---

## Palette & style tokens

*(lifted from the build)*

| Color | Role |
|---|---|
| `#020617` | bg |
| `#0f172a` | card |
| `#67e8f9` | cyan |
| `#fef3c7` | amber |
| `#2563eb` | primary |
| `#7c3aed` | hint |
| `#86efac` | ok |
| `#fca5a5` | warn |

Wireframe derived from `index.html`, `style.css` and `script.js` of the ClickBait-Game build. Dashed boxes = wireframe placeholders, not final art.
