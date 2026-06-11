# Maze Structure Library — ClickBait

Reusable, theme-agnostic maze layouts for the ClickBait escape game. Each maze defines only navigation — pair any maze with any cybersecurity theme. Every gate is a validated, in-order chokepoint, so no door can be skipped.

**Grid:** 29 × 17 tiles · **Doors per maze:** 16 (15 quiz + 1 final) · **Mazes:** 5

## How reuse works

A maze stores geometry (walls, start, exit, 16 doors, coins) and **no questions**. A theme stores 15 questions and **no geometry**. Door slot *i* always shows *questions[i]*, so swapping the theme changes what every gate asks while the navigation stays identical. Mix and match: 5 mazes × N themes = 5·N distinct runs.

## Legend

| Symbol | Meaning |
|---|---|
| `#` | Wall |
| `.` | Path |
| `S` | Start |
| `E` | Exit |
| `1`–`15` | Quiz door |
| `F` | Final door (password) |
| • | Coin |

## Overlay themes

- Phishing & Online Safety (built-in)
- Passwords & Account Security

## Door → Theme Slot Map

What each gate teaches, theme-neutral. The tier escalates from intro to expert.

| Door | Tier | What this gate teaches |
|---|---|---|
| 1 | intro | Suspicious message |
| 2 | intro | Unexpected download |
| 3 | intro | Public/shared setting |
| 4 | easy | Fake page/profile |
| 5 | easy | Unknown links |
| 6 | easy | Strength judgement |
| 7 | medium | Secret codes |
| 8 | medium | Untrusted login |
| 9 | medium | After a mistake |
| 10 | medium | Shared computer |
| 11 | hard | Institution impostor |
| 12 | hard | Delivery/payment lure |
| 13 | hard | Physical tech risk |
| 14 | hard | Urgency pressure |
| 15 | expert | Over-trusting a filter |
| F | final | Create a strong password — final escape gate (no quiz) |

---

## Maze layouts

### 1. ★ Classic Reactor

*The original hand-built layout — open rooms and many short loops.*

- **Seed:** —
- **Start:** (c1, r15) → **Exit:** (c27, r1)
- **Quiz doors:** 15 · **Final door:** 1 · **Coins:** 26
- **Critical path:** — cells
- ✓ solvable · ✓ in-order gates

```
#############################
#.#...........#.......#.....#
#.#.#####.###.###.###.#####.#
#.#.....#.#.#.....#...#.....#
#.##..###.#.#######.###.###.#
#.#...#...#.......#.#...#.#.#
#.#.###.###.###.###.###...#.#
#.#...#.#.....#.#...#...#...#
#.###.#.#####.#.#.###.###.###
#...#.#.....#.#.#.#...#...#.#
#.#.#.#####.###.#.#.###.###.#
#.....#...#.#...#.#.#...#...#
#.###.#.###.#.###.#.###.#.#.#
#.......#...#...#.#.......#.#
#########.###.#.#.###.#####.#
#.........#...#.......#.....#
#############################
```

<details><summary>Doors (in order)</summary>

| # | Type | Door (c, r) | Spawn (c, r) |
|---|---|---|---|
| 1 | quiz 1 | (7, 15) | (5, 15) |
| 2 | quiz 2 | (10, 13) | (9, 14) |
| 3 | quiz 3 | (11, 9) | (11, 11) |
| 4 | quiz 4 | (7, 7) | (7, 9) |
| 5 | quiz 5 | (9, 3) | (9, 5) |
| 6 | quiz 6 | (12, 1) | (10, 1) |
| 7 | quiz 7 | (15, 3) | (13, 3) |
| 8 | quiz 8 | (19, 1) | (17, 1) |
| 9 | quiz 9 | (19, 3) | (21, 3) |
| 10 | quiz 10 | (18, 7) | (19, 6) |
| 11 | quiz 11 | (17, 11) | (17, 9) |
| 12 | quiz 12 | (19, 15) | (17, 15) |
| 13 | quiz 13 | (23, 13) | (21, 13) |
| 14 | quiz 14 | (24, 9) | (23, 10) |
| 15 | quiz 15 | (27, 7) | (25, 7) |
| F | final | (27, 2) | (27, 4) |

</details>

<details><summary>Coins (26)</summary>

(4,11), (17,8), (15,1), (8,9), (25,13), (1,5), (17,9), (2,13), (1,6), (15,13), (16,3), (27,11), (8,15), (4,4), (13,14), (13,11), (5,10), (24,15), (26,15), (15,10), (1,1), (13,12), (17,13), (11,12), (15,3), (21,5)

</details>

### 2. Recursive Backtracker

*Long, winding river-like corridors with deep dead-ends.*

- **Seed:** 1000
- **Start:** (c1, r15) → **Exit:** (c27, r1)
- **Quiz doors:** 15 · **Final door:** 1 · **Coins:** 24
- **Critical path:** 137 cells
- ✓ solvable · ✓ in-order gates

```
#############################
#.....#...........#...#.....#
#.###.###.#######.#.#.#.#####
#...#...#.......#...#.#.....#
#.#.###.#.#####.#####.#####.#
#.#.#.#.#.#...#...#.........#
###.#.#.#.#.#.###.#########.#
#...#.#.#.#.#...#.....#.....#
#.###.#.###.###.#####.#.#####
#.#.........#.#.....#.#.#...#
#.###########.#####.#.#.#.#.#
#.........#.......#...#.#.#.#
#####.###.#.#.###.#####.#.###
#...#.#...#.#...#...#...#...#
#.#.###.###.###.#####.#####.#
#.#.....#.....#.............#
#############################
```

<details><summary>Doors (in order)</summary>

| # | Type | Door (c, r) | Spawn (c, r) |
|---|---|---|---|
| 1 | quiz 1 | (7, 15) | (6, 15) |
| 2 | quiz 2 | (7, 11) | (8, 11) |
| 3 | quiz 3 | (1, 10) | (1, 11) |
| 4 | quiz 4 | (3, 4) | (3, 5) |
| 5 | quiz 5 | (4, 1) | (3, 1) |
| 6 | quiz 6 | (7, 6) | (7, 5) |
| 7 | quiz 7 | (11, 8) | (11, 9) |
| 8 | quiz 8 | (14, 7) | (13, 7) |
| 9 | quiz 9 | (19, 9) | (18, 9) |
| 10 | quiz 10 | (21, 7) | (21, 8) |
| 11 | quiz 11 | (15, 5) | (16, 5) |
| 12 | quiz 12 | (9, 3) | (10, 3) |
| 13 | quiz 13 | (15, 1) | (14, 1) |
| 14 | quiz 14 | (19, 1) | (19, 2) |
| 15 | quiz 15 | (22, 5) | (21, 5) |
| F | final | (26, 3) | (27, 3) |

</details>

<details><summary>Coins (24)</summary>

(18,13), (15,11), (12,11), (5,12), (23,10), (13,11), (23,15), (7,1), (26,15), (22,13), (20,15), (11,15), (24,7), (14,11), (16,15), (5,6), (13,13), (25,13), (26,9), (13,9), (19,5), (1,4), (21,14), (15,13)

</details>

### 3. Randomised Prim

*Bushy and branchy with frequent junctions and short stubs.*

- **Seed:** 1001
- **Start:** (c1, r15) → **Exit:** (c27, r1)
- **Quiz doors:** 15 · **Final door:** 1 · **Coins:** 24
- **Critical path:** 41 cells
- ✓ solvable · ✓ in-order gates

```
#############################
#...#.#...#.#...#.....#.#.#.#
#.###.###.#.#.###.#####.#.#.#
#.#.#.#.#.#.......#.........#
#.#.#.#.#.#.###########.###.#
#.#.....#.....#...........#.#
#.###.#####.#.#.#####.#####.#
#.....#.#.#.#.#.....#.#...#.#
#.#####.#.#.###.#######.#####
#.#...#.#.#.#.#...#.......#.#
#.###.#.#.#.#.#.###.#.#.###.#
#.#.#...#.#...#...#.#.#.#...#
#.#.###.#.#.###.###.#####.###
#...#.#...#.#...............#
#.###.#.###.#.#######.#.#.#.#
#...................#.#.#.#.#
#############################
```

<details><summary>Doors (in order)</summary>

| # | Type | Door (c, r) | Spawn (c, r) |
|---|---|---|---|
| 1 | quiz 1 | (5, 15) | (4, 15) |
| 2 | quiz 2 | (7, 15) | (6, 15) |
| 3 | quiz 3 | (10, 15) | (9, 15) |
| 4 | quiz 4 | (12, 15) | (11, 15) |
| 5 | quiz 5 | (13, 14) | (13, 15) |
| 6 | quiz 6 | (14, 13) | (13, 13) |
| 7 | quiz 7 | (15, 12) | (15, 13) |
| 8 | quiz 8 | (15, 10) | (15, 11) |
| 9 | quiz 9 | (15, 7) | (15, 8) |
| 10 | quiz 10 | (15, 5) | (15, 6) |
| 11 | quiz 11 | (17, 5) | (16, 5) |
| 12 | quiz 12 | (19, 5) | (18, 5) |
| 13 | quiz 13 | (21, 5) | (20, 5) |
| 14 | quiz 14 | (23, 5) | (22, 5) |
| 15 | quiz 15 | (24, 3) | (23, 3) |
| F | final | (26, 3) | (25, 3) |

</details>

<details><summary>Coins (24)</summary>

(23,11), (27,14), (3,13), (21,13), (1,7), (25,11), (13,7), (17,2), (11,10), (3,3), (20,1), (22,13), (17,7), (25,12), (11,9), (5,4), (19,9), (9,1), (25,9), (16,13), (12,5), (21,15), (7,8), (21,7)

</details>

### 4. Hunt and Kill

*Mixed rhythm: medium runs broken by sudden turns.*

- **Seed:** 1002
- **Start:** (c1, r15) → **Exit:** (c27, r1)
- **Quiz doors:** 15 · **Final door:** 1 · **Coins:** 24
- **Critical path:** 53 cells
- ✓ solvable · ✓ in-order gates

```
#############################
#...........................#
#.#.###############.#######.#
#.#.......#.....#...#...#...#
#####.###.#.###.#.###.#.#.###
#...#...#.#...#...#...#.....#
#.#####.#.###.###.#.#########
#.......#...#...#.#...#.....#
#############.#.#.###.#.###.#
#.........#...#.#.#.#.#.#.#.#
#.#.#####.#.#.#.#.#.#.#.#.#.#
#.#.....#...#.#.#...#...#.#.#
#.###########.#.###.#####.#.#
#.......#...#.#.#.#.....#.#.#
#.#####.#.#.###.#.###.#.#.#.#
#.#.....#.#.....#.....#.#...#
#############################
```

<details><summary>Doors (in order)</summary>

| # | Type | Door (c, r) | Spawn (c, r) |
|---|---|---|---|
| 1 | quiz 1 | (1, 10) | (1, 11) |
| 2 | quiz 2 | (3, 9) | (2, 9) |
| 3 | quiz 3 | (6, 9) | (5, 9) |
| 4 | quiz 4 | (9, 9) | (8, 9) |
| 5 | quiz 5 | (9, 11) | (9, 10) |
| 6 | quiz 6 | (11, 10) | (11, 11) |
| 7 | quiz 7 | (13, 9) | (12, 9) |
| 8 | quiz 8 | (13, 6) | (13, 7) |
| 9 | quiz 9 | (11, 5) | (12, 5) |
| 10 | quiz 10 | (12, 3) | (11, 3) |
| 11 | quiz 11 | (15, 3) | (14, 3) |
| 12 | quiz 12 | (16, 5) | (15, 5) |
| 13 | quiz 13 | (17, 4) | (17, 5) |
| 14 | quiz 14 | (19, 3) | (18, 3) |
| 15 | quiz 15 | (20, 1) | (19, 1) |
| F | final | (23, 1) | (22, 1) |

</details>

<details><summary>Coins (24)</summary>

(6,11), (27,5), (7,14), (7,15), (5,1), (20,5), (15,14), (8,1), (5,3), (25,4), (27,11), (27,3), (21,14), (7,3), (3,2), (5,4), (27,8), (15,13), (2,13), (16,1), (3,1), (7,13), (15,11), (19,7)

</details>

### 5. Wilson (uniform)

*Unbiased, balanced texture with no directional grain.*

- **Seed:** 1003
- **Start:** (c1, r15) → **Exit:** (c27, r1)
- **Quiz doors:** 15 · **Final door:** 1 · **Coins:** 24
- **Critical path:** 49 cells
- ✓ solvable · ✓ in-order gates

```
#############################
#...........#...#...#.#...#.#
#.#########.###.#.###.###.#.#
#...#.......#...#.#.....#.#.#
#######.###.#.#.#.#.###.#.#.#
#.......#.....#...#.#...#.#.#
#.###.#######.#####.#####.#.#
#.#.......#...#.#...#.#.....#
###########.#.#.#.###.###.###
#.#.....#.#.#...#...........#
#.#####.#.#.###########.###.#
#...............#.....#.#.#.#
###.#.#.#####.#.###.#.#.#.#.#
#.#.#.#.#.....#.....#...#.#.#
#.###.#########.#.#####.#.###
#...........#...#.#.........#
#############################
```

<details><summary>Doors (in order)</summary>

| # | Type | Door (c, r) | Spawn (c, r) |
|---|---|---|---|
| 1 | quiz 1 | (5, 14) | (5, 15) |
| 2 | quiz 2 | (5, 12) | (5, 13) |
| 3 | quiz 3 | (7, 11) | (6, 11) |
| 4 | quiz 4 | (10, 11) | (9, 11) |
| 5 | quiz 5 | (12, 11) | (11, 11) |
| 6 | quiz 6 | (15, 11) | (14, 11) |
| 7 | quiz 7 | (16, 13) | (15, 13) |
| 8 | quiz 8 | (18, 13) | (17, 13) |
| 9 | quiz 9 | (19, 11) | (19, 12) |
| 10 | quiz 10 | (21, 11) | (20, 11) |
| 11 | quiz 11 | (22, 13) | (21, 13) |
| 12 | quiz 12 | (23, 11) | (23, 12) |
| 13 | quiz 13 | (23, 9) | (23, 10) |
| 14 | quiz 14 | (25, 8) | (25, 9) |
| 15 | quiz 15 | (27, 7) | (26, 7) |
| F | final | (27, 5) | (27, 6) |

</details>

<details><summary>Coins (24)</summary>

(15,14), (24,15), (20,15), (23,4), (15,15), (17,4), (25,4), (13,8), (11,8), (7,1), (11,9), (1,1), (21,8), (22,3), (17,3), (23,14), (21,15), (27,9), (3,9), (7,5), (19,9), (25,6), (18,11), (20,9)

</details>

