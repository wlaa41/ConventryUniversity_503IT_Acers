# ClickBait: Dungeon of Phishing

**ClickBait: Dungeon of Phishing** is a browser-based educational maze game that teaches phishing recognition and cyber-safety awareness to players aged 11–16.

> Built for **503IT Communication and Collaboration** at Coventry University.

![ClickBait banner](docs/screenshots/banner.png) 

---

## What ClickBait is:

The player is trapped inside a dungeon. An angler fish, representing the predatory tactics behind real-world phishing, is hunting them through the maze. They have to clear 16 locked doors to escape, each of which throws a real cyber-safety scenario at them. They are given 4 options and have to make a choice for every scenario. 

Answer correctly and the door opens. Answer incorrectly and the fish gets faster and starts ignoring walls. The fish keeps chasing the player, so standing still is never an option. The player progresses through the maze to reach the final door.

The final door doesn't have a question. It asks the player to actually create a strong password. If the password passes all six strength checks the door locks behind them and the fish can't follow.

The game also includes a **hidden bonus level**. This level unlocks only when the player escapes the maze with the highest badge in the main game. If the player completes the hidden level, they receive a higher final badge.

---

## Who it's for

The game is designed for KS3 and lower KS4 students, roughly ages 11 to 16. We picked this age range because it sits right where most young people start running gaming accounts, social media, and school logins independently, but before most schools formally teach how those accounts get attacked.

The scenarios in the game come from the kinds of attacks this group actually sees: fake Instagram pages, free-skin downloads, panic emails like: "your account will be deleted in 2 hours", verification code social engineering, dodgy public-Wi-Fi prompts and so on. 

ClickBait teaches cybersecurity in a practical and interactive way. Instead of only reading about online safety, players learn by making decisions inside the game. Each question includes a short learning popup that explains why the correct answer is safe. A teacher should be able to put a class in front of this without any setup: it runs in the browser, asks for no real personal data, and stores everything locally.


---

## Main Features

- 2D dungeon maze gameplay
- 16 cybersecurity question doors
- Angler fish enemy that chases the player
- Wrong answers increase pressure
- Feedback popup after each question
- Cyber Coin system for revival
- Hint system
- Limited player health and revive system
- Final strong password challenge
- Badge system based on performance
- Hidden level with 10 doors, unlocked by the highest badge
- Higher badge for completing the hidden level
- Login and register system using browser storage
- Score, time, and best performance tracking
- Pause menu, sound toggle, restart, and exit options
- Cyber Safety Tips screen

---

## Getting Started

No installation or build step is required.

Clone the repository:

```bash
git clone https://github.com/<your-org>/clickbait.git
cd clickbait
```

Open the game by double-clicking:

```text
index.html
```

Or run it locally using Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Firefox

---

## Controls

| Action | Key |
|---|---|
| Move Up | W or Arrow Up |
| Move Down | S or Arrow Down |
| Move Left | A or Arrow Left |
| Move Right | D or Arrow Right |
| Pause Game | ESC |
| Select Answer | Mouse Click |

---

## Project Structure

```text
clickbait/
├── index.html
├── style.css
├── script.js
├── assets/
└── sounds/
    
```

---

## Code Overview

The project is built using simple web technologies.

| File / Folder | Purpose |
|---|---|
| `index.html` | Contains the game screens, menus, popups, canvas, and page structure |
| `style.css` | Controls the visual design, dungeon theme, buttons, HUD, and layouts |
| `script.js` | Controls the game logic, player movement, enemy movement, questions, scoring, badges, password door, hidden level, and saved progress |
| `assets/` | Stores images such as the player, enemy, doors, icons, and background |
| `sounds/` | Stores sound effects and background audio |


The game uses:

- HTML5
- CSS3
- JavaScript
- localStorage
- Web Audio / HTML Audio

No framework was used, so the game can run directly in the browser without installing extra packages.

---

## Where to Get Help

For help with the project, users can read this README, check the comments inside `script.js`, contact one of the project team members or open an issue on the GitHub repository.

---

## Maintainers and Contributors

| Name | Student ID | GitHub | Role |
|---|---:|---|---|
| Roshana Khadka | 16318254 | [@ginmartinii](https://github.com/ginmartinii) | Project Manager and Tester |
| Sarthak Lamichhane | 15903541 | [@sarthak-44](https://github.com/sarthak-44) | Programmer and Debugging |
| Suresh Sapkota | 16028744 | [@Sureshh369](https://github.com/Sureshh369) | UX/UI Designer |
| Yuwan Shakya | 15949044 | [@yuwansqya16-stack](https://github.com/yuwansqya16-stack) | Content Researcher |
| Abhisek Shrestha |15599436:|[@Abhicrestha22-sketch](https://github.com/abhicrestha22-sketch)|Artist & Asset Researcher|


---

## Acknowledgements

Thanks to **Prof. Will Jamous**, our module instructor, for guiding us during the project and helping us stay focused on teamwork, communication, and realistic project scope.

This project was created as part of university coursework for **503IT Communication and Collaboration** at Coventry University.

## Group Members - Acers

| # | GitHub Username | Profile |
|---|---|---|
| 1 | `sarthak-44` | https://github.com/sarthak-44 |
| 2 | `abhicrestha22-sketch` | https://github.com/abhicrestha22-sketch |
| 3 | `ginmartinii` | https://github.com/ginmartinii |
| 4 | `Sureshh369` | https://github.com/Sureshh369 |
| 5 | `yuwansqya16-stack` | https://github.com/yuwansqya16-stack |
