const TILE = 40;
const COLS = 29;
const ROWS = 17;
const TOTAL_HEALTH = 20;
const REVIVE_COST = 3;
const QUESTION_TIME = 18;
const PLAYER_SPEED = 2.45;
const BASE_ENEMY_SPEED = 0.82;
const HINT_COST = 1;

const MAP = [
  "#############################",
  "#.#...........#.......#.....#",
  "#.#.#####.###.###.###.#####.#",
  "#.#.....#.#.#.....#...#.....#",
  "#.##..###.#.#######.###.###.#",
  "#.#...#...#.......#.#...#.#.#",
  "#.#.###.###.###.###.###...#.#",
  "#.#...#.#.....#.#...#...#...#",
  "#.###.#.#####.#.#.###.###.###",
  "#...#.#.....#.#.#.#...#...#.#",
  "#.#.#.#####.###.#.#.###.###.#",
  "#.....#...#.#...#.#.#...#...#",
  "#.###.#.###.#.###.#.###.#.#.#",
  "#.......#...#...#.#.......#.#",
  "#########.###.#.#.###.#####.#",
  "#.........#...#.......#.....#",
  "#############################"
];

const START = { c: 1, r: 15 };
const EXIT = { c: 27, r: 1 };

const DOOR_CELLS = [
  { c: 7, r: 15, spawn: { c: 5, r: 15 }, final: false },
  { c: 10, r: 13, spawn: { c: 9, r: 14 }, final: false },
  { c: 11, r: 9, spawn: { c: 11, r: 11 }, final: false },
  { c: 7, r: 7, spawn: { c: 7, r: 9 }, final: false },
  { c: 9, r: 3, spawn: { c: 9, r: 5 }, final: false },
  { c: 12, r: 1, spawn: { c: 10, r: 1 }, final: false },
  { c: 15, r: 3, spawn: { c: 13, r: 3 }, final: false },
  { c: 19, r: 1, spawn: { c: 17, r: 1 }, final: false },
  { c: 19, r: 3, spawn: { c: 21, r: 3 }, final: false },
  { c: 18, r: 7, spawn: { c: 19, r: 6 }, final: false },
  { c: 17, r: 11, spawn: { c: 17, r: 9 }, final: false },
  { c: 19, r: 15, spawn: { c: 17, r: 15 }, final: false },
  { c: 23, r: 13, spawn: { c: 21, r: 13 }, final: false },
  { c: 24, r: 9, spawn: { c: 23, r: 10 }, final: false },
  { c: 27, r: 7, spawn: { c: 25, r: 7 }, final: false },
  { c: 27, r: 2, spawn: { c: 27, r: 4 }, final: true }
];

const COIN_CELLS = [
  { c: 4, r: 11 }, { c: 17, r: 8 }, { c: 15, r: 1 }, { c: 8, r: 9 },
  { c: 25, r: 13 }, { c: 1, r: 5 }, { c: 17, r: 9 }, { c: 2, r: 13 },
  { c: 1, r: 6 }, { c: 15, r: 13 }, { c: 16, r: 3 }, { c: 27, r: 11 },
  { c: 8, r: 15 }, { c: 4, r: 4 }, { c: 13, r: 14 }, { c: 13, r: 11 },
  { c: 5, r: 10 }, { c: 24, r: 15 }, { c: 26, r: 15 }, { c: 15, r: 10 },
  { c: 1, r: 1 }, { c: 13, r: 12 }, { c: 17, r: 13 }, { c: 11, r: 12 },
  { c: 15, r: 3 }, { c: 21, r: 5 }
];

const FISH_SRC = "assets/enemy-fish.png";
const PLAYER_SRC = "assets/player.png";
const DOOR_CLOSED_SRC = "assets/door-closed.png";
const DOOR_OPEN_SRC = "assets/door-open.png";

const SOUNDS = {
  bg: "sounds/videogame bg.mp3",
  click: "sounds/button startup.wav",
  correct: "sounds/quiz corect answer.mp3",
  wrong: "sounds/wronganswer.mp3",
  unlock: "sounds/door unlocking.mp3",
  open: "sounds/door opening.mp3",
  lock: "sounds/door lock.mp3",
  damage: "sounds/character collide on wall.mp3",
  bonus: "sounds/bonus.mp3",
  hint: "sounds/tips pop up.mp3",
  enemy: "sounds/enemy charc sound.mp3",
  alarm: "sounds/timer alaram.ogg",
  over: "sounds/game over.mp3",
  overVoice: "sounds/game over voice.mp3",
  warning: "sounds/waring bg.wav"
};

const $ = id => document.getElementById(id);
const canvas = $("game");
const ctx = canvas.getContext("2d");

const fishImg = new Image();
fishImg.src = FISH_SRC;

const playerImg = new Image();
playerImg.src = PLAYER_SRC;

const doorClosedImg = new Image();
doorClosedImg.src = DOOR_CLOSED_SRC;

const doorOpenImg = new Image();
doorOpenImg.src = DOOR_OPEN_SRC;

const audio = {};
for (const [name, src] of Object.entries(SOUNDS)) {
  audio[name] = new Audio(src);
  audio[name].preload = "auto";
}
audio.bg.loop = true;
audio.bg.volume = 0.22;

const scoreEl = $("score");
const bestScoreEl = $("bestScore");
const healthEl = $("health");
const cyberCoinsHud = $("cyberCoinsHud");
const doorsHudEl = $("doorsHud");
const timeEl = $("time");
const bestTimeEl = $("bestTime");
const fishHud = $("fishHud");
const userHud = $("userHud");
const toast = $("toast");
const damageFlash = $("damageFlash");

const startModal = $("startModal");
const pauseModal = $("pauseModal");
const qModal = $("questionModal");
const passwordModal = $("passwordModal");
const reviveModal = $("reviveModal");
const learningModal = $("learningModal");
const endModal = $("endModal");

const loginPanel = $("loginPanel");
const registerPanel = $("registerPanel");
const loginUsername = $("loginUsername");
const loginPassword = $("loginPassword");
const registerUsername = $("registerUsername");
const registerPassword = $("registerPassword");
const authMessage = $("authMessage");
const loggedInBox = $("loggedInBox");
const loggedInName = $("loggedInName");

const qTitle = $("questionTitle");
const qText = $("questionText");
const questionTimer = $("questionTimer");
const answers = $("answers");
const feedback = $("feedback");
const hintText = $("hintText");
const hintBtn = $("hintBtn");
const learningTitle = $("learningTitle");
const learningText = $("learningText");
const passwordInput = $("passwordInput");
const passwordChecks = $("passwordChecks");
const passwordFeedback = $("passwordFeedback");
const reviveText = $("reviveText");
const endTitle = $("endTitle");
const endText = $("endText");

const questions = [
  {
    title: "Door 1: School Account Warning",
    text: "Your school account will be permanently deleted in 2 hours. The sender is support-schoolservices@gmail.com. What should you do?",
    answers: [
      "Click quickly before losing access",
      "Ignore warning signs because it mentions school",
      "Check with your school or official platform first",
      "Reply asking if the email is legitimate"
    ],
    correct: 2,
    hint: "Look at the sender and the urgent message. Real school alerts should be checked through official systems.",
    lesson: "Urgent account deletion messages can be phishing. Always verify through the official school platform or a trusted staff member."
  },
  {
    title: "Door 2: Free Gaming Download",
    text: "A gaming website says FREE PREMIUM SKINS – DOWNLOAD NOW and immediately starts downloading a file. What should you do?",
    answers: [
      "Run the file immediately",
      "Delete the file and leave the site",
      "Share with friends first",
      "Disable antivirus and continue"
    ],
    correct: 1,
    hint: "Unexpected downloads are risky, especially from gaming sites offering free items.",
    lesson: "Unexpected downloads can contain malware. Delete the file and leave the site."
  },
  {
    title: "Door 3: Public WiFi",
    text: "You connect to free public WiFi and need to log into an important account. What is safest?",
    answers: [
      "Log in normally",
      "Wait until using a trusted connection",
      "Use easier passwords",
      "Turn brightness down before logging in"
    ],
    correct: 1,
    hint: "Think about whether the network can be trusted.",
    lesson: "Important accounts are safer on trusted networks. Public WiFi can expose your activity."
  },
  {
    title: "Door 4: Fake Instagram Page",
    text: "URL: secure-instagram-login.verify-account.net. The page looks identical to Instagram. What is the strongest warning sign?",
    answers: [
      "It uses dark mode",
      "It loaded quickly",
      "The web address is unusual",
      "It asked for your username"
    ],
    correct: 2,
    hint: "A fake page can look real. Check the domain name.",
    lesson: "A fake login page can copy a real design. The web address is usually the biggest warning sign."
  },
  {
    title: "Door 5: Unexpected Link Chain",
    text: "A friend sends an unknown link. It requests login, then payment information. When should you stop?",
    answers: [
      "After payment request",
      "After login request",
      "After receiving unexpected link",
      "After account gets locked"
    ],
    correct: 2,
    hint: "The safest point is before you interact with the suspicious link.",
    lesson: "Stop at the unexpected link stage. Verify with the person through another trusted method."
  },
  {
    title: "Door 6: Password Strength",
    text: "Password A: BlueFoxTrainCoffeePizza99. Password B: G!7$qL#2z@8. Which is better security practice?",
    answers: [
      "Password A because it is longer and unique",
      "Password B because symbols always mean stronger security",
      "Both are equally secure",
      "Neither because passwords should never contain words"
    ],
    correct: 0,
    hint: "Length and uniqueness matter a lot.",
    lesson: "Long unique passphrases can be strong and easier to remember than short random passwords."
  },
  {
    title: "Door 7: Verification Code",
    text: "A close friend asks you to receive a verification code for them. The account looks genuine. What is safest?",
    answers: [
      "Help because you know them personally",
      "Send only part of the code",
      "Refuse because verification codes should stay private",
      "Ask them to promise not to misuse it"
    ],
    correct: 2,
    hint: "Verification codes are like keys to an account.",
    lesson: "Never share verification codes. Even a friend account may be hacked."
  },
  {
    title: "Door 8: QR Code Login",
    text: "A QR website uses HTTPS, looks professional, asks for school login details, and the URL is unrelated to your school. What is the greatest concern?",
    answers: [
      "QR codes are always dangerous",
      "Professional design",
      "Unrelated website requesting credentials",
      "HTTPS encryption"
    ],
    correct: 2,
    hint: "HTTPS does not prove the website belongs to your school.",
    lesson: "A website can use HTTPS and still be fake. Be careful when an unrelated site asks for credentials."
  },
  {
    title: "Door 9: Suspicious Link Clicked",
    text: "You accidentally click a suspicious link. Nothing downloads and nothing happens. What is the BEST response?",
    answers: [
      "Ignore it because nothing happened",
      "Restart device immediately",
      "Monitor activity and avoid entering information afterward",
      "Factory reset device"
    ],
    correct: 2,
    hint: "Nothing visible does not always mean nothing happened.",
    lesson: "After clicking suspicious links, avoid entering details and monitor account activity."
  },
  {
    title: "Door 10: Shared Computer",
    text: "You use a school computer. After logging out, the browser asks Save password? What is safest?",
    answers: [
      "Save because computer requires login already",
      "Save temporarily",
      "Decline saving credentials on shared devices",
      "Save if browser looks trustworthy"
    ],
    correct: 2,
    hint: "Shared device means other people may use it later.",
    lesson: "Do not save passwords on shared computers. Someone else could access your account."
  },
  {
    title: "Door 11: School Portal Email",
    text: "A school portal email asks you to sign in again. The sender matches previous emails and the link opens the correct domain. What should you do?",
    answers: [
      "Log in immediately because domain is correct",
      "Ignore the email completely",
      "Access the portal manually rather than through the email link",
      "Reply asking whether it is legitimate"
    ],
    correct: 2,
    hint: "Manual access avoids risky email links.",
    lesson: "Even when an email looks correct, manually opening the portal is safer than clicking email links."
  },
  {
    title: "Door 12: Delivery Message",
    text: "You order gaming equipment. Ten minutes later, a delivery message has correct branding, order number, first name, and HTTPS link. Best action?",
    answers: [
      "Enter details because information matches recent activity",
      "Click link but avoid entering payment details",
      "Open retailer website independently and verify delivery information there",
      "Trust message because scammers cannot know order numbers"
    ],
    correct: 2,
    hint: "Scammers can sometimes know real order details.",
    lesson: "Realistic details do not prove safety. Verify delivery through the official retailer website."
  },
  {
    title: "Door 13: Safe Charging",
    text: "Your phone battery is low at an event. Option A: free USB cable already connected. Option B: power socket only. Option C: staff charger. What is safest?",
    answers: [
      "Option A because charging is charging",
      "Option B",
      "Option C because staff are trusted",
      "Use whichever charges fastest"
    ],
    correct: 1,
    hint: "USB cables can transfer data. A power socket only gives power.",
    lesson: "A power socket avoids unknown USB data risks. Unknown charging cables can be unsafe."
  },
  {
    title: "Door 14: Urgency Trick",
    text: "Why do many phishing attacks create urgency?",
    answers: [
      "Faster internet connections require speed",
      "Urgency increases mistakes and reduces critical thinking",
      "Messages expire automatically",
      "Attackers cannot send longer messages"
    ],
    correct: 1,
    hint: "Urgency makes people rush.",
    lesson: "Urgency reduces careful thinking. Scammers want you to act before checking."
  },
  {
    title: "Door 15: Spam Filter Trust",
    text: "An email has correct branding, correct domain spelling, expected timing and passes spam filters. Which assumption is MOST dangerous?",
    answers: [
      "Thinking branding proves legitimacy",
      "Thinking spam filters catch everything",
      "Thinking timing matters",
      "Thinking security updates exist"
    ],
    correct: 1,
    hint: "Spam filters help, but they are not perfect.",
    lesson: "Spam filters do not catch every dangerous message. You still need to check carefully."
  }
];

let keys = {};
let player, enemy, doors, coins;
let score, health, cyberCoins, enemySpeed, fishBuffLevel, elapsed, startTime;
let bestScore = Number(localStorage.getItem("clickbaitBestScore")) || 0;
let bestTime = Number(localStorage.getItem("clickbaitBestTime")) || 0;
let currentUser = localStorage.getItem("clickbaitCurrentUser") || "";
let running = false, paused = false, questionOpen = false, passwordOpen = false;
let currentDoor = null, animationId = null, questionInterval = null, ghostTimer = null;
let questionTimeLeft = QUESTION_TIME;
let enemyGhost = false, enemyPath = [], lastPathUpdate = 0, lastWallDamage = 0;
let playerFacing = "right", lastDeathReason = "", enemyFrozenUntil = 0, doorCooldownUntil = 0;
let hintsUsed = 0, questionsAnswered = 0, correctAnswers = 0, wrongAnswers = 0, finalPasswordLocked = false;

function playSound(name) {
  const s = audio[name];
  if (!s) return;
  try {
    s.currentTime = 0;
    s.play().catch(() => {});
  } catch {}
}

function startMusic() {
  audio.bg.play().catch(() => {});
}

function stopMusic() {
  audio.bg.pause();
  audio.bg.currentTime = 0;
}

function clearKeys() {
  keys = {};
}

function getUsers() {
  return JSON.parse(localStorage.getItem("clickbaitUsers") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("clickbaitUsers", JSON.stringify(users));
}

function safeName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 18);
}

function showRegister() {
  loginPanel.classList.add("hidden");
  registerPanel.classList.remove("hidden");
  authMessage.textContent = "";
  playSound("click");
}

function showLogin() {
  registerPanel.classList.add("hidden");
  loginPanel.classList.remove("hidden");
  authMessage.textContent = "";
  playSound("click");
}

function registerUser() {
  const u = safeName(registerUsername.value);
  const p = registerPassword.value;
  const users = getUsers();

  if (!u || p.length < 4) {
    authMessage.textContent = "Use a simple username and at least 4 password characters.";
    return;
  }

  if (users[u]) {
    authMessage.textContent = "This username already exists. Login instead.";
    return;
  }

  users[u] = {
    password: p,
    bestScore: 0,
    bestTime: 0,
    gamesPlayed: 0
  };

  saveUsers(users);
  loginUser(u, p);
}

function loginUser(username, password) {
  const u = username || safeName(loginUsername.value);
  const p = password || loginPassword.value;
  const users = getUsers();

  if (!users[u] || users[u].password !== p) {
    authMessage.textContent = "Wrong username or password.";
    return;
  }

  currentUser = u;
  localStorage.setItem("clickbaitCurrentUser", u);
  loggedInName.textContent = u;
  loggedInBox.classList.remove("hidden");
  authMessage.textContent = "Logged in successfully.";
  bestScore = users[u].bestScore || 0;
  bestTime = users[u].bestTime || 0;
  updateHud();
  playSound("click");
}

function logoutUser() {
  currentUser = "";
  localStorage.removeItem("clickbaitCurrentUser");
  loggedInBox.classList.add("hidden");
  authMessage.textContent = "Logged out.";
  updateHud();
}

function restoreLogin() {
  const users = getUsers();

  if (currentUser && users[currentUser]) {
    loggedInName.textContent = currentUser;
    loggedInBox.classList.remove("hidden");
    bestScore = users[currentUser].bestScore || 0;
    bestTime = users[currentUser].bestTime || 0;
  }
}

function cellCenter(cell) {
  return {
    x: cell.c * TILE + TILE / 2,
    y: cell.r * TILE + TILE / 2
  };
}

function setToCell(obj, cell, size) {
  const p = cellCenter(cell);
  obj.x = p.x - size / 2;
  obj.y = p.y - size / 2;
}

function center(obj, size) {
  return {
    x: obj.x + size / 2,
    y: obj.y + size / 2
  };
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function cellOf(obj, size) {
  const p = center(obj, size);
  return {
    c: Math.floor(p.x / TILE),
    r: Math.floor(p.y / TILE)
  };
}

function key(c, r) {
  return `${c},${r}`;
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function isWall(c, r) {
  return c < 0 || r < 0 || c >= COLS || r >= ROWS || MAP[r][c] === "#";
}

function nextDoor() {
  return doors.find(d => !d.unlocked);
}

function lockedDoorAt(c, r) {
  const d = nextDoor();
  return d && d.c === c && d.r === r ? d : null;
}

function blockedAt(x, y, size, blockDoors = true) {
  const pts = [
    [x + 3, y + 3],
    [x + size - 3, y + 3],
    [x + 3, y + size - 3],
    [x + size - 3, y + size - 3]
  ];

  for (const [px, py] of pts) {
    const c = Math.floor(px / TILE);
    const r = Math.floor(py / TILE);

    if (isWall(c, r)) return true;
    if (blockDoors && lockedDoorAt(c, r)) return true;
  }

  return false;
}

function neighbors(cell, blockDoors = false) {
  const dirs = [
    { dc: 1, dr: 0 },
    { dc: -1, dr: 0 },
    { dc: 0, dr: 1 },
    { dc: 0, dr: -1 }
  ];

  const out = [];

  for (const d of dirs) {
    const c = cell.c + d.dc;
    const r = cell.r + d.dr;

    if (isWall(c, r)) continue;
    if (blockDoors && lockedDoorAt(c, r)) continue;

    out.push({ c, r });
  }

  return out;
}

function findPath(start, goal, blockDoors = false) {
  const q = [start];
  const seen = new Set([key(start.c, start.r)]);
  const prev = new Map();

  while (q.length) {
    const cur = q.shift();

    if (cur.c === goal.c && cur.r === goal.r) break;

    for (const n of neighbors(cur, blockDoors)) {
      const k = key(n.c, n.r);

      if (seen.has(k)) continue;

      seen.add(k);
      prev.set(k, cur);
      q.push(n);
    }
  }

  if (!seen.has(key(goal.c, goal.r))) return [];

  const path = [];
  let cur = goal;

  while (!(cur.c === start.c && cur.r === start.r)) {
    path.push(cur);
    cur = prev.get(key(cur.c, cur.r));

    if (!cur) return [];
  }

  path.push(start);
  return path.reverse();
}

function resetState() {
  player = {
    x: 0,
    y: 0,
    size: 26
  };

  enemy = {
    x: 0,
    y: 0,
    size: 34
  };

  doors = DOOR_CELLS.map((d, i) => ({
    ...d,
    id: i + 1,
    unlocked: false
  }));

  coins = COIN_CELLS.map(c => {
    const p = cellCenter(c);
    return {
      ...c,
      x: p.x - 7,
      y: p.y - 7,
      collected: false
    };
  });

  score = 0;
  health = TOTAL_HEALTH;
  cyberCoins = 0;
  enemySpeed = BASE_ENEMY_SPEED;
  fishBuffLevel = 0;
  elapsed = 0;
  startTime = Date.now();
  running = false;
  paused = false;
  questionOpen = false;
  passwordOpen = false;
  currentDoor = null;
  enemyGhost = false;
  enemyPath = [];
  playerFacing = "right";
  lastPathUpdate = 0;
  lastWallDamage = 0;
  enemyFrozenUntil = 0;
  doorCooldownUntil = 0;
  hintsUsed = 0;
  questionsAnswered = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  finalPasswordLocked = false;

  clearKeys();

  if (ghostTimer) clearTimeout(ghostTimer);
  if (questionInterval) clearInterval(questionInterval);

  setToCell(player, START, player.size);
  setToCell(enemy, { c: 1, r: 1 }, enemy.size);

  updateHud();
  draw();
}

function updateHud() {
  scoreEl.textContent = score;
  bestScoreEl.textContent = bestScore;
  healthEl.textContent = health;
  cyberCoinsHud.textContent = cyberCoins;
  doorsHudEl.textContent = `${doors ? doors.filter(d => d.unlocked).length : 0}/${DOOR_CELLS.length}`;
  timeEl.textContent = formatTime(elapsed || 0);
  bestTimeEl.textContent = bestTime ? formatTime(bestTime) : "--:--";
  fishHud.textContent = `Buff ${fishBuffLevel || 0} | ${(enemySpeed || BASE_ENEMY_SPEED).toFixed(2)}${enemyGhost ? " 👻" : ""}`;
  userHud.textContent = currentUser || "Guest";
}

function drawTile(c, r, type) {
  const x = c * TILE;
  const y = r * TILE;

  if (type === "#") {
    const g = ctx.createLinearGradient(x, y, x + TILE, y + TILE);
    g.addColorStop(0, "#475569");
    g.addColorStop(0.55, "#1f2937");
    g.addColorStop(1, "#0f172a");

    ctx.fillStyle = g;
    ctx.fillRect(x, y, TILE, TILE);

    ctx.strokeStyle = "rgba(226,232,240,.22)";
    ctx.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
  } else {
    const g = ctx.createLinearGradient(x, y, x + TILE, y + TILE);
    g.addColorStop(0, "#a1a1aa");
    g.addColorStop(0.6, "#71717a");
    g.addColorStop(1, "#52525b");

    ctx.fillStyle = g;
    ctx.fillRect(x, y, TILE, TILE);

    ctx.strokeStyle = "rgba(15,23,42,.18)";
    ctx.strokeRect(x, y, TILE, TILE);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      drawTile(c, r, MAP[r][c]);
    }
  }

  drawCoins();
  drawDoors();
  drawExit();
  drawPlayer();
  drawEnemy();
  drawVignette();
}

function drawCoins() {
  for (const coin of coins || []) {
    if (coin.collected) continue;

    ctx.fillStyle = "#fde68a";
    ctx.beginPath();
    ctx.arc(coin.x + 7, coin.y + 7, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(coin.x + 7, coin.y + 7, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDoors() {
  if (!doors) return;

  const active = nextDoor();

  for (const d of doors) {
    if (!d.unlocked && (!active || d.id !== active.id)) continue;

    const p = cellCenter(d);
    const img = d.unlocked ? doorOpenImg : doorClosedImg;

    if (img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, p.x - 20, p.y - 34, 40, 56);
    } else {
      ctx.fillStyle = d.unlocked ? "#22c55e" : "#facc15";
      ctx.fillRect(p.x - 16, p.y - 26, 32, 42);
    }

    ctx.fillStyle = "rgba(15,23,42,.92)";
    ctx.fillRect(p.x - 30, p.y - 62, 62, 18);

    ctx.strokeStyle = "#475569";
    ctx.strokeRect(p.x - 30, p.y - 62, 62, 18);

    ctx.fillStyle = "#e0f2fe";
    ctx.font = "bold 11px Arial";
    ctx.fillText(d.final ? "Final" : `Door ${d.id}`, p.x - 22, p.y - 49);
  }
}

function drawExit() {
  const ep = cellCenter(EXIT);

  ctx.fillStyle = "rgba(15,23,42,.92)";
  ctx.fillRect(ep.x - 22, ep.y - 28, 44, 22);

  ctx.fillStyle = "#67e8f9";
  ctx.font = "bold 12px Arial";
  ctx.fillText("EXIT", ep.x - 14, ep.y - 13);
}

function drawPlayer() {
  const w = 38;
  const h = 42;
  const x = player.x - 6;
  const y = player.y - 10;

  ctx.save();

  if (playerImg.complete && playerImg.naturalWidth > 0) {
    if (playerFacing === "left") {
      ctx.translate(x + w, y);
      ctx.scale(-1, 1);
      ctx.drawImage(playerImg, 0, 0, w, h);
    } else {
      ctx.drawImage(playerImg, x, y, w, h);
    }
  } else {
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(player.x + 13, player.y + 13, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawEnemy() {
  const buffSize = fishBuffLevel * 4;
  const drawSize = 40 + buffSize;
  const offset = (drawSize - enemy.size) / 2;

  ctx.save();

  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) {
    ctx.globalAlpha = 0.35;
  } else if (enemyGhost || fishBuffLevel > 0) {
    ctx.shadowColor = enemyGhost ? "rgba(239,68,68,.95)" : "rgba(251,191,36,.85)";
    ctx.shadowBlur = 20 + fishBuffLevel * 4;
  }

  if (fishImg.complete && fishImg.naturalWidth > 0) {
    ctx.drawImage(fishImg, enemy.x - offset, enemy.y - offset, drawSize, drawSize);
  } else {
    ctx.fillStyle = enemyGhost ? "purple" : "red";
    ctx.beginPath();
    ctx.arc(enemy.x + 17, enemy.y + 17, 17 + buffSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawVignette() {
  const v = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    180,
    canvas.width / 2,
    canvas.height / 2,
    700
  );

  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(0,0,0,.42)");

  ctx.fillStyle = v;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function flashDamage() {
  damageFlash.classList.add("active");

  setTimeout(() => {
    damageFlash.classList.remove("active");
  }, 260);
}

function damage(reason) {
  const now = Date.now();

  if (now - lastWallDamage < 420) return;

  lastWallDamage = now;
  health = Math.max(0, health - 2);

  flashDamage();
  playSound("damage");

  toast.textContent = `${reason} -2 health. Health left: ${health}/${TOTAL_HEALTH}`;

  updateHud();

  if (health <= 0) {
    handlePlayerDeath("You lost all health.");
  }
}

function movePlayer() {
  let dx = 0;
  let dy = 0;

  if (keys.arrowup || keys.w) dy -= PLAYER_SPEED;
  if (keys.arrowdown || keys.s) dy += PLAYER_SPEED;
  if (keys.arrowleft || keys.a) dx -= PLAYER_SPEED;
  if (keys.arrowright || keys.d) dx += PLAYER_SPEED;

  if (dx > 0) playerFacing = "left";
  if (dx < 0) playerFacing = "right";

  if (dx !== 0 && dy !== 0) {
    dx *= 0.707;
    dy *= 0.707;
  }

  if (dx !== 0) {
    const nx = player.x + dx;

    if (!blockedAt(nx, player.y, player.size, true)) {
      player.x = nx;
    } else {
      damage("Wall collision");
    }
  }

  if (dy !== 0) {
    const ny = player.y + dy;

    if (!blockedAt(player.x, ny, player.size, true)) {
      player.y = ny;
    } else {
      damage("Wall collision");
    }
  }
}

function checkDoor() {
  if (Date.now() < doorCooldownUntil) return;

  const d = nextDoor();

  if (!d || questionOpen || passwordOpen || paused) return;

  if (dist(center(player, player.size), cellCenter(d)) < TILE * 1.15) {
    d.final ? openPasswordDoor(d) : openQuestion(d);
  }
}

function openQuestion(d) {
  clearKeys();

  currentDoor = d;
  questionOpen = true;
  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  qModal.classList.add("active");
  feedback.textContent = "";
  hintText.textContent = "";
  answers.innerHTML = "";

  const q = questions[d.id - 1];

  qTitle.textContent = q.title;
  qText.textContent = q.text;
  hintBtn.disabled = false;
  hintBtn.textContent = `Use Hint (${HINT_COST} Cyber Coin)`;

  toast.textContent = `Door ${d.id} question opened.`;
  playSound("click");

  q.answers.forEach((a, i) => {
    const b = document.createElement("button");
    b.textContent = `${String.fromCharCode(65 + i)}) ${a}`;
    b.onclick = () => answerQuestion(i, q, false);
    answers.appendChild(b);
  });

  startQuestionTimer(q);
}

function startQuestionTimer(q) {
  if (questionInterval) clearInterval(questionInterval);

  questionTimeLeft = QUESTION_TIME;
  questionTimer.textContent = questionTimeLeft;

  questionInterval = setInterval(() => {
    questionTimeLeft--;
    questionTimer.textContent = questionTimeLeft;

    if (questionTimeLeft === 5) playSound("alarm");

    if (questionTimeLeft <= 0) {
      clearInterval(questionInterval);
      questionInterval = null;
      answerQuestion(-1, q, true);
    }
  }, 1000);
}

function useHint() {
  if (!questionOpen || !currentDoor) return;

  const q = questions[currentDoor.id - 1];

  if (cyberCoins < HINT_COST) {
    hintText.textContent = "Not enough Cyber Coins for a hint.";
    return;
  }

  cyberCoins -= HINT_COST;
  hintsUsed++;
  hintText.textContent = `Hint: ${q.hint}`;
  hintBtn.disabled = true;
  updateHud();
  playSound("hint");
}

function answerQuestion(selected, q, timedOut) {
  if (!questionOpen) return;

  answers.querySelectorAll("button").forEach(b => {
    b.disabled = true;
  });

  if (questionInterval) clearInterval(questionInterval);
  questionInterval = null;

  questionsAnswered++;

  const good = !timedOut && selected === q.correct;

  if (good) {
    correctAnswers++;
    score += 20;
    cyberCoins++;
    currentDoor.unlocked = true;

    feedback.textContent = "+20 points and +1 Cyber Coin.";
    toast.textContent = `Door ${currentDoor.id} unlocked. Next door revealed.`;

    playSound("correct");
    playSound("unlock");
    updateHud();
    draw();

    showLearning("Correct", q.lesson, true);
  } else {
    wrongAnswers++;
    score = Math.max(0, score - 10);

    buffFish();

    setToCell(player, currentDoor.spawn, player.size);
    doorCooldownUntil = Date.now() + 1400;

    feedback.textContent = timedOut ? "Time up. Fish buff activated." : "Wrong answer. Fish buff activated.";

    playSound("wrong");
    updateHud();
    draw();

    showLearning(timedOut ? "Time Up" : "Wrong Answer", q.lesson, false);
  }
}

function showLearning(title, text, correct) {
  learningTitle.textContent = title;
  learningText.textContent = text;
  learningModal.classList.add("active");

  setTimeout(() => {
    learningModal.classList.remove("active");
    closeQuestionAndResume();
  }, correct ? 1600 : 1300);
}

function closeQuestionAndResume() {
  qModal.classList.remove("active");
  questionOpen = false;
  currentDoor = null;
  clearKeys();
  resumeGame(false);
}

function buffFish() {
  fishBuffLevel++;
  enemySpeed = Math.min(1.65, BASE_ENEMY_SPEED + fishBuffLevel * 0.10);
  enemyGhost = true;
  enemyPath = [];

  toast.textContent = "Fish buff: faster, bigger, and can pass walls for 6 seconds.";
  playSound("enemy");

  if (ghostTimer) clearTimeout(ghostTimer);

  ghostTimer = setTimeout(() => {
    enemyGhost = false;
    enemyPath = [];
    toast.textContent = "Wall-pass ended, but fish speed buff remains.";
    updateHud();
  }, 6000);
}

function openPasswordDoor(d) {
  clearKeys();

  currentDoor = d;
  passwordOpen = true;
  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  passwordInput.value = "";
  passwordFeedback.textContent = "";
  updatePasswordChecks();

  passwordModal.classList.add("active");
  playSound("lock");

  toast.textContent = "Final door: create a strong password to lock the fish behind you.";
}

function updatePasswordChecks() {
  const p = passwordInput.value;

  const checks = [
    { ok: p.length >= 12, t: "At least 12 characters" },
    { ok: /[A-Z]/.test(p), t: "One uppercase letter" },
    { ok: /[a-z]/.test(p), t: "One lowercase letter" },
    { ok: /[0-9]/.test(p), t: "One number" },
    { ok: /[^A-Za-z0-9]/.test(p), t: "One symbol" },
    { ok: !p.toLowerCase().includes("password"), t: "Does not use the word password" }
  ];

  passwordChecks.innerHTML = checks
    .map(c => `<li class="${c.ok ? "ok" : "bad"}">${c.ok ? "✅" : "❌"} ${c.t}</li>`)
    .join("");

  return checks.every(c => c.ok);
}

function submitPasswordDoor() {
  if (!passwordOpen) return;

  if (updatePasswordChecks()) {
    score += 30;
    cyberCoins++;
    currentDoor.unlocked = true;
    finalPasswordLocked = true;
    enemyFrozenUntil = Date.now() + 999999;
    enemyGhost = false;
    enemyPath = [];

    passwordFeedback.textContent = "Strong password. Final door locked behind you. The fish cannot follow now.";
    toast.textContent = "Final door secured. Run to EXIT!";

    playSound("lock");
    playSound("open");
    updateHud();
    draw();

    setTimeout(() => {
      passwordModal.classList.remove("active");
      passwordOpen = false;
      currentDoor = null;
      clearKeys();
      resumeGame(false);
    }, 1000);
  } else {
    score = Math.max(0, score - 10);

    buffFish();

    setToCell(player, currentDoor.spawn, player.size);
    doorCooldownUntil = Date.now() + 1600;

    passwordFeedback.textContent = "Weak password. Fish buff activated.";

    updateHud();
    draw();

    setTimeout(() => {
      passwordModal.classList.remove("active");
      passwordOpen = false;
      currentDoor = null;
      clearKeys();
      resumeGame(false);
    }, 1000);
  }
}

function moveEnemy() {
  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) return;

  const ec = center(enemy, enemy.size);
  const pc = center(player, player.size);

  if (enemyGhost) {
    const dx = pc.x - ec.x;
    const dy = pc.y - ec.y;
    const d = Math.hypot(dx, dy);

    if (d > 0) {
      enemy.x += (dx / d) * enemySpeed;
      enemy.y += (dy / d) * enemySpeed;
    }

    return;
  }

  const now = Date.now();

  if (now - lastPathUpdate > 180 || enemyPath.length < 2) {
    enemyPath = findPath(cellOf(enemy, enemy.size), cellOf(player, player.size), false);
    lastPathUpdate = now;
  }

  if (!enemyPath || enemyPath.length < 2) return;

  const target = cellCenter(enemyPath[1]);
  const dx = target.x - ec.x;
  const dy = target.y - ec.y;
  const d = Math.hypot(dx, dy);

  if (d < 2) {
    enemyPath.shift();
    return;
  }

  enemy.x += (dx / d) * enemySpeed;
  enemy.y += (dy / d) * enemySpeed;
}

function checkCoins() {
  const pc = center(player, player.size);

  for (const coin of coins) {
    if (!coin.collected && dist(pc, { x: coin.x + 7, y: coin.y + 7 }) < 20) {
      coin.collected = true;
      score += 5;
      playSound("bonus");
      updateHud();
    }
  }
}

function checkCaught() {
  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) return;

  const catchDistance = 22 + fishBuffLevel * 2;

  if (dist(center(player, player.size), center(enemy, enemy.size)) < catchDistance) {
    handlePlayerDeath("The buffed phishing fish caught you.");
  }
}

function checkWin() {
  if (doors.every(d => d.unlocked) && dist(center(player, player.size), cellCenter(EXIT)) < 30) {
    endGame(true);
  }
}

function getRespawnCell() {
  const unlocked = doors.filter(d => d.unlocked);
  return unlocked.length ? unlocked[unlocked.length - 1].spawn : START;
}

function handlePlayerDeath(reason) {
  clearKeys();

  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  lastDeathReason = reason;

  if (cyberCoins >= REVIVE_COST) {
    reviveText.innerHTML = `
      ${reason}<br><br>
      You have <strong>${cyberCoins}</strong> Cyber Coins.<br>
      Spend <strong>${REVIVE_COST}</strong> to revive with full health?
    `;

    reviveModal.classList.add("active");
    playSound("warning");
  } else {
    endGame(false, reason);
  }
}

function useRevive() {
  reviveModal.classList.remove("active");

  cyberCoins -= REVIVE_COST;
  health = TOTAL_HEALTH;

  setToCell(player, getRespawnCell(), player.size);
  setToCell(enemy, { c: 1, r: 1 }, enemy.size);

  enemyPath = [];
  enemyGhost = false;
  playerFacing = "right";

  clearKeys();

  toast.textContent = `Revived using ${REVIVE_COST} Cyber Coins. Full health restored.`;

  playSound("bonus");
  updateHud();
  draw();

  resumeGame(false);
}

function refuseRevive() {
  reviveModal.classList.remove("active");
  endGame(false, lastDeathReason);
}

function saveRecords() {
  const rec = {
    newScore: false,
    newTime: false
  };

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("clickbaitBestScore", String(bestScore));
    rec.newScore = true;
  }

  if (!bestTime || elapsed < bestTime) {
    bestTime = elapsed;
    localStorage.setItem("clickbaitBestTime", String(bestTime));
    rec.newTime = true;
  }

  if (currentUser) {
    const users = getUsers();

    if (users[currentUser]) {
      users[currentUser].bestScore = Math.max(users[currentUser].bestScore || 0, score);
      users[currentUser].bestTime = !users[currentUser].bestTime
        ? elapsed
        : Math.min(users[currentUser].bestTime, elapsed);
      users[currentUser].gamesPlayed = (users[currentUser].gamesPlayed || 0) + 1;
      saveUsers(users);
    }
  }

  return rec;
}

function endGame(won, msg) {
  clearKeys();

  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  stopMusic();

  if (won) {
    const rec = saveRecords();
    updateHud();

    endTitle.textContent = "Final Result";
    playSound("bonus");

    endText.innerHTML = `
      <div class="result-grid">
        <div>Player</div><strong>${currentUser || "Guest"}</strong>
        <div>Final Score</div><strong>${score}${rec.newScore ? " ⭐ New Best" : ""}</strong>
        <div>Best Score</div><strong>${bestScore}</strong>
        <div>Time</div><strong>${formatTime(elapsed)}${rec.newTime ? " ⭐ New Best" : ""}</strong>
        <div>Best Time</div><strong>${bestTime ? formatTime(bestTime) : "--:--"}</strong>
        <div>Correct Answers</div><strong>${correctAnswers}/${questionsAnswered}</strong>
        <div>Hints Used</div><strong>${hintsUsed}</strong>
        <div>Cyber Coins Left</div><strong>${cyberCoins}</strong>
        <div>Fish Buff Level</div><strong>${fishBuffLevel}</strong>
      </div>
      <p><strong>Cyber Badge:</strong> ${
        correctAnswers >= 13
          ? "🏆 Cyber Expert"
          : correctAnswers >= 10
            ? "🥈 Cyber Defender"
            : "🥉 Cyber Learner"
      }</p>
    `;
  } else {
    endTitle.textContent = "Game Over";
    playSound("over");
    playSound("overVoice");

    endText.innerHTML = `
      ${msg || "Game over."}<br><br>
      <div class="result-grid">
        <div>Player</div><strong>${currentUser || "Guest"}</strong>
        <div>Final Score</div><strong>${score}</strong>
        <div>Best Score</div><strong>${bestScore}</strong>
        <div>Time</div><strong>${formatTime(elapsed)}</strong>
        <div>Best Time</div><strong>${bestTime ? formatTime(bestTime) : "--:--"}</strong>
        <div>Doors Completed</div><strong>${doors.filter(d => d.unlocked).length}/${doors.length}</strong>
        <div>Correct Answers</div><strong>${correctAnswers}/${questionsAnswered}</strong>
        <div>Hints Used</div><strong>${hintsUsed}</strong>
      </div>
    `;
  }

  endModal.classList.add("active");
}

function loop() {
  if (!running || paused || questionOpen || passwordOpen) {
    animationId = null;
    return;
  }

  elapsed = Math.floor((Date.now() - startTime) / 1000);

  movePlayer();
  moveEnemy();
  checkCoins();
  checkDoor();
  checkCaught();
  checkWin();
  updateHud();
  draw();

  animationId = requestAnimationFrame(loop);
}

function allAccepted() {
  return $("acceptHow").checked && $("acceptParents").checked && $("acceptTerms").checked;
}

function startGame() {
  if (!currentUser) {
    authMessage.textContent = "Please login or register before starting.";
    return;
  }

  if (!allAccepted()) {
    $("agreeWarning").textContent = "Please manually accept How to Play, Parental Controls, and Terms.";
    return;
  }

  playSound("click");
  startModal.classList.remove("active");

  resetState();

  running = true;
  paused = false;
  startTime = Date.now();

  toast.textContent = "Only the next door is shown. Answer carefully.";

  startMusic();
  loop();
}

function pauseGame() {
  if (!running || questionOpen || passwordOpen || endModal.classList.contains("active")) return;

  clearKeys();

  paused = true;
  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  pauseModal.classList.add("active");
  playSound("click");
}

function resumeGame(closePause = true) {
  if (
    endModal.classList.contains("active") ||
    questionOpen ||
    passwordOpen ||
    reviveModal.classList.contains("active")
  ) {
    return;
  }

  clearKeys();

  if (closePause) {
    pauseModal.classList.remove("active");
  }

  paused = false;
  running = true;
  startTime = Date.now() - elapsed * 1000;

  if (!animationId) {
    loop();
  }
}

function restartGame() {
  [
    startModal,
    pauseModal,
    qModal,
    passwordModal,
    reviveModal,
    learningModal,
    endModal
  ].forEach(m => m.classList.remove("active"));

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  resetState();

  running = true;
  startTime = Date.now();

  toast.textContent = "Restarted. Only the next door is visible.";

  startMusic();
  loop();
}

function showIntroTab(type) {
  ["how", "parents", "terms"].forEach(t => {
    $("intro-" + t).classList.remove("active");
  });

  $("intro-" + type).classList.add("active");
  playSound("click");
}

document.addEventListener("keydown", e => {
  const k = e.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) {
    e.preventDefault();
  }

  if (k === "escape") {
    paused ? resumeGame(true) : pauseGame();
    return;
  }

  if (
    !questionOpen &&
    !passwordOpen &&
    !paused &&
    !reviveModal.classList.contains("active") &&
    !startModal.classList.contains("active")
  ) {
    keys[k] = true;
  }
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

window.addEventListener("blur", clearKeys);

window.addEventListener("visibilitychange", () => {
  if (document.hidden) clearKeys();
});

passwordInput.addEventListener("input", updatePasswordChecks);

restoreLogin();
resetState();

fishImg.onload = draw;
playerImg.onload = draw;
doorClosedImg.onload = draw;
doorOpenImg.onload = draw;
