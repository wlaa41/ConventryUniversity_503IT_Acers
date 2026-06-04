const TILE = 40;
const COLS = 29;
const ROWS = 17;

const TOTAL_HEALTH = 20;
const REVIVE_COST = 3;
const MAX_REVIVES = 2;
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
const PLAYER_SRC = "assets/player-animated.gif";
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
let soundOn = localStorage.getItem("clickbaitSound") !== "off";

for (const [name, src] of Object.entries(SOUNDS)) {
  audio[name] = new Audio(src);
  audio[name].preload = "auto";
}

audio.bg.loop = true;
audio.bg.volume = 0.22;

const userHud = $("userHud");
const scoreEl = $("score");
const bestScoreEl = $("bestScore");
const healthEl = $("health");
const cyberCoinsHud = $("cyberCoinsHud");
const doorsHudEl = $("doorsHud");
const timeEl = $("time");
const bestTimeEl = $("bestTime");
const fishHud = $("fishHud");
const toast = $("toast");
const damageFlash = $("damageFlash");

const startModal = $("startModal");
const loadingModal = $("loadingModal");
const loadingFill = $("loadingFill");
const loadingText = $("loadingText");
const pauseModal = $("pauseModal");
const qModal = $("questionModal");
const passwordModal = $("passwordModal");
const reviveModal = $("reviveModal");
const learningModal = $("learningModal");
const endModal = $("endModal");

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
const passwordConfirmInput = $("passwordConfirmInput");
const passwordChecks = $("passwordChecks");
const passwordFeedback = $("passwordFeedback");

const reviveText = $("reviveText");
const endTitle = $("endTitle");
const endText = $("endText");

const loginPanel = $("loginPanel");
const registerPanel = $("registerPanel");
const loginUsername = $("loginUsername");
const loginPassword = $("loginPassword");
const registerUsername = $("registerUsername");
const registerPassword = $("registerPassword");
const authMessage = $("authMessage");
const loggedInBox = $("loggedInBox");
const loggedInName = $("loggedInName");
const soundBtn = $("soundBtn");

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
    hint: "Check the sender and verify through the official school system.",
    lesson: "Urgent account warnings can be phishing. Always verify through official school platforms."
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
    hint: "Unexpected downloads are risky.",
    lesson: "Unknown downloads can contain malware. Delete them and leave the site."
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
    hint: "Think about whether the network is trusted.",
    lesson: "Public WiFi can be unsafe for important accounts. Use a trusted connection."
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
    hint: "A fake page can look real. Check the URL.",
    lesson: "The web address is one of the biggest warning signs of a fake login page."
  },
  {
    title: "Door 5: Unexpected Link",
    text: "A friend sends an unknown link. It requests login, then payment information. When should you stop?",
    answers: [
      "After payment request",
      "After login request",
      "After receiving unexpected link",
      "After account gets locked"
    ],
    correct: 2,
    hint: "The safest time to stop is before clicking.",
    lesson: "Stop when you receive an unexpected link. Verify with the person first."
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
    hint: "Length and uniqueness matter.",
    lesson: "Long unique passphrases can be strong and easier to remember."
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
    hint: "A verification code is like an account key.",
    lesson: "Never share verification codes. Even real-looking accounts can be hacked."
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
    hint: "HTTPS does not always mean the site is trusted.",
    lesson: "A fake website can still use HTTPS. Check if the site belongs to your school."
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
    hint: "Nothing visible does not always mean safe.",
    lesson: "After clicking a suspicious link, avoid entering details and monitor your accounts."
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
    hint: "Other people may use the device later.",
    lesson: "Never save passwords on shared computers."
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
    hint: "Manual access is safer than email links.",
    lesson: "Open important portals manually instead of clicking email links."
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
    lesson: "Realistic details do not prove safety. Verify through the official retailer site."
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
    hint: "USB cables can transfer data.",
    lesson: "A power socket is safer than an unknown USB cable."
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
    lesson: "Urgency reduces careful thinking. Scammers want fast mistakes."
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
    lesson: "Spam filters do not catch everything. You still need to check carefully."
  }
];

let keys = {};
let player;
let enemy;
let doors;
let coins;

let score = 0;
let health = TOTAL_HEALTH;
let cyberCoins = 0;
let enemySpeed = BASE_ENEMY_SPEED;
let fishBuffLevel = 0;
let elapsed = 0;
let startTime = Date.now();

let bestScore = 0;
let bestTime = 0;
let currentUser = localStorage.getItem("clickbaitCurrentUser") || "";

let running = false;
let paused = false;
let questionOpen = false;
let passwordOpen = false;

let currentDoor = null;
let animationId = null;
let questionInterval = null;
let ghostTimer = null;
let gameTimerInterval = null;

let questionTimeLeft = QUESTION_TIME;
let enemyGhost = false;
let enemyPath = [];
let lastPathUpdate = 0;
let lastWallDamage = 0;

let playerFacing = "right";
let lastDeathReason = "";
let enemyFrozenUntil = 0;
let doorCooldownUntil = 0;
let finalPasswordLocked = false;

let hintsUsed = 0;
let questionsAnswered = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let revivesUsed = 0;

function playSound(name) {
  if (!soundOn) return;
  const sound = audio[name];
  if (!sound) return;

  try {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch {}
}

function startMusic() {
  if (!soundOn) return;
  audio.bg.play().catch(() => {});
}

function stopMusic() {
  audio.bg.pause();
  audio.bg.currentTime = 0;
}

function toggleSound() {
  soundOn = !soundOn;
  localStorage.setItem("clickbaitSound", soundOn ? "on" : "off");

  if (soundBtn) {
    soundBtn.textContent = soundOn ? "Sound: On" : "Sound: Off";
  }

  if (soundOn && running) {
    startMusic();
  } else {
    stopMusic();
  }
}

function clearKeys() {
  keys = {};
}

function startOverallTimer() {
  stopOverallTimer();

  startTime = Date.now() - elapsed * 1000;

  gameTimerInterval = setInterval(() => {
    if (!paused) {
      elapsed = Math.floor((Date.now() - startTime) / 1000);
      updateHud();
    }
  }, 250);
}

function stopOverallTimer() {
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval);
    gameTimerInterval = null;
  }
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
  const username = safeName(registerUsername.value);
  const password = registerPassword.value;
  const users = getUsers();

  if (!username || password.length < 4) {
    authMessage.textContent = "Use a username and at least 4 password characters.";
    return;
  }

  if (users[username]) {
    authMessage.textContent = "Username already exists.";
    return;
  }

  users[username] = {
    password,
    bestScore: 0,
    bestTime: 0,
    gamesPlayed: 0
  };

  saveUsers(users);
  loginUser(username, password);
}

function loginUser(username, password) {
  const user = username || safeName(loginUsername.value);
  const pass = password || loginPassword.value;
  const users = getUsers();

  if (!users[user]) {
    authMessage.textContent = "Username not found.";
    return;
  }

  if (users[user].password !== pass) {
    authMessage.textContent = "Wrong password.";
    return;
  }

  currentUser = user;
  localStorage.setItem("clickbaitCurrentUser", user);

  bestScore = users[user].bestScore || 0;
  bestTime = users[user].bestTime || 0;

  loggedInName.textContent = user;
  loggedInBox.classList.remove("hidden");
  authMessage.textContent = "Login successful.";
  userHud.textContent = user;

  updateHud();
  playSound("click");
}

function logoutUser() {
  currentUser = "";
  localStorage.removeItem("clickbaitCurrentUser");

  loggedInBox.classList.add("hidden");
  authMessage.textContent = "Logged out.";
  userHud.textContent = "Guest";

  bestScore = 0;
  bestTime = 0;

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

function goSetupPage(page) {
  if (page === 2) {
    if (!$("acceptTerms").checked || !$("acceptParents").checked) {
      $("page1Warning").textContent = "Please accept both safety rules before continuing.";
      return;
    }
  }

  ["setupPage1", "setupPage2", "setupPage3"].forEach(id => {
    $(id).classList.remove("active");
  });

  $("setupPage" + page).classList.add("active");
  playSound("click");
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

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function isWall(c, r) {
  return c < 0 || r < 0 || c >= COLS || r >= ROWS || MAP[r][c] === "#";
}

function nextDoor() {
  return doors.find(d => !d.unlocked);
}

function lockedDoorAt(c, r) {
  const door = nextDoor();
  return door && door.c === c && door.r === r ? door : null;
}

function blockedAt(x, y, size, blockDoors = true) {
  const points = [
    [x + 3, y + 3],
    [x + size - 3, y + 3],
    [x + 3, y + size - 3],
    [x + size - 3, y + size - 3]
  ];

  for (const [px, py] of points) {
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

  const output = [];

  for (const d of dirs) {
    const c = cell.c + d.dc;
    const r = cell.r + d.dr;

    if (isWall(c, r)) continue;
    if (blockDoors && lockedDoorAt(c, r)) continue;

    output.push({ c, r });
  }

  return output;
}

function findPath(start, goal, blockDoors = false) {
  const queue = [start];
  const seen = new Set([key(start.c, start.r)]);
  const previous = new Map();

  while (queue.length) {
    const current = queue.shift();

    if (current.c === goal.c && current.r === goal.r) break;

    for (const next of neighbors(current, blockDoors)) {
      const k = key(next.c, next.r);

      if (seen.has(k)) continue;

      seen.add(k);
      previous.set(k, current);
      queue.push(next);
    }
  }

  if (!seen.has(key(goal.c, goal.r))) return [];

  const path = [];
  let current = goal;

  while (!(current.c === start.c && current.r === start.r)) {
    path.push(current);
    current = previous.get(key(current.c, current.r));

    if (!current) return [];
  }

  path.push(start);
  return path.reverse();
}

function resetState() {
  player = { x: 0, y: 0, size: 26 };
  enemy = { x: 0, y: 0, size: 34 };

  doors = DOOR_CELLS.map((door, index) => ({
    ...door,
    id: index + 1,
    unlocked: false,
    lockedBehind: false
  }));

  coins = COIN_CELLS.map(cell => {
    const p = cellCenter(cell);

    return {
      ...cell,
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
  finalPasswordLocked = false;

  hintsUsed = 0;
  questionsAnswered = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  revivesUsed = 0;

  stopOverallTimer();
  clearKeys();

  if (ghostTimer) clearTimeout(ghostTimer);
  if (questionInterval) clearInterval(questionInterval);

  setToCell(player, START, player.size);
  setToCell(enemy, { c: 1, r: 1 }, enemy.size);

  updateHud();
  draw();
}

function updateHud() {
  userHud.textContent = currentUser || "Guest";
  scoreEl.textContent = score;
  bestScoreEl.textContent = bestScore;
  healthEl.textContent = health;
  cyberCoinsHud.textContent = cyberCoins;
  doorsHudEl.textContent = `${doors ? doors.filter(d => d.unlocked).length : 0}/${DOOR_CELLS.length}`;
  timeEl.textContent = formatTime(elapsed);
  bestTimeEl.textContent = bestTime ? formatTime(bestTime) : "--:--";
  fishHud.textContent = `Buff ${fishBuffLevel}${enemyGhost ? " 👻" : ""}`;
}

function drawTile(c, r, type) {
  const x = c * TILE;
  const y = r * TILE;

  if (type === "#") {
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x, y, TILE, TILE);

    ctx.fillStyle = "#334155";
    ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(x + 7, y + 8, 14, 3);
    ctx.fillRect(x + 21, y + 25, 11, 3);
  } else {
    ctx.fillStyle = "#71717a";
    ctx.fillRect(x, y, TILE, TILE);

    ctx.fillStyle = "#52525b";
    ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
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
    ctx.fillRect(coin.x + 2, coin.y, 10, 14);

    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(coin.x + 4, coin.y + 3, 6, 8);
  }
}

function drawDoors() {
  if (!doors) return;

  const activeDoor = nextDoor();

  for (const door of doors) {
    if (!door.unlocked && (!activeDoor || door.id !== activeDoor.id)) continue;

    const p = cellCenter(door);

    let img = door.unlocked ? doorOpenImg : doorClosedImg;

    if (door.lockedBehind) {
      img = doorClosedImg;
    }

    if (img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, p.x - 20, p.y - 34, 40, 56);
    } else {
      ctx.fillStyle = door.lockedBehind ? "#ef4444" : door.unlocked ? "#22c55e" : "#facc15";
      ctx.fillRect(p.x - 16, p.y - 26, 32, 42);
    }

    ctx.fillStyle = "#020617";
    ctx.fillRect(p.x - 31, p.y - 62, 64, 18);

    ctx.strokeStyle = door.lockedBehind ? "#ef4444" : "#67e8f9";
    ctx.strokeRect(p.x - 31, p.y - 62, 64, 18);

    ctx.fillStyle = "#e0f2fe";
    ctx.font = "10px Courier New";

    let label = door.final ? "FINAL" : `DOOR ${door.id}`;

    if (door.lockedBehind) {
      label = "LOCKED";
    }

    ctx.fillText(label, p.x - 24, p.y - 49);
  }
}

function drawExit() {
  const ep = cellCenter(EXIT);

  ctx.fillStyle = "#020617";
  ctx.fillRect(ep.x - 24, ep.y - 28, 48, 24);

  ctx.strokeStyle = "#67e8f9";
  ctx.strokeRect(ep.x - 24, ep.y - 28, 48, 24);

  ctx.fillStyle = "#67e8f9";
  ctx.font = "bold 12px Courier New";
  ctx.fillText("EXIT", ep.x - 14, ep.y - 12);
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
    ctx.fillRect(player.x + 5, player.y + 4, 18, 22);
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
    ctx.fillStyle = enemyGhost ? "#a855f7" : "#ef4444";
    ctx.fillRect(enemy.x, enemy.y, drawSize, drawSize);
  }

  ctx.restore();
}

function drawVignette() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    180,
    canvas.width / 2,
    canvas.height / 2,
    700
  );

  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,.45)");

  ctx.fillStyle = gradient;
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

  const door = nextDoor();

  if (!door || questionOpen || passwordOpen || paused) return;

  const isNear = dist(center(player, player.size), cellCenter(door)) < TILE * 1.15;

  if (isNear) {
    door.final ? openPasswordDoor(door) : openQuestion(door);
  }
}

function openQuestion(door) {
  clearKeys();

  currentDoor = door;
  questionOpen = true;
  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  qModal.classList.add("active");
  feedback.textContent = "";
  hintText.textContent = "";
  answers.innerHTML = "";

  const question = questions[door.id - 1];

  qTitle.textContent = question.title;
  qText.textContent = question.text;
  hintBtn.disabled = false;
  hintBtn.textContent = `Use Hint (${HINT_COST} Coin)`;

  toast.textContent = `Door ${door.id} challenge opened.`;
  playSound("click");

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = `${String.fromCharCode(65 + index)}) ${answer}`;
    button.onclick = () => answerQuestion(index, question, false);
    answers.appendChild(button);
  });

  startQuestionTimer(question);
}

function startQuestionTimer(question) {
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
      answerQuestion(-1, question, true);
    }
  }, 1000);
}

function useHint() {
  if (!questionOpen || !currentDoor) return;

  const question = questions[currentDoor.id - 1];

  if (cyberCoins < HINT_COST) {
    hintText.textContent = "Not enough Cyber Coins.";
    return;
  }

  cyberCoins -= HINT_COST;
  hintsUsed++;

  hintText.textContent = `Hint: ${question.hint}`;
  hintBtn.disabled = true;

  updateHud();
  playSound("hint");
}

function answerQuestion(selected, question, timedOut) {
  if (!questionOpen) return;

  answers.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });

  if (questionInterval) clearInterval(questionInterval);
  questionInterval = null;

  questionsAnswered++;

  const correct = !timedOut && selected === question.correct;

  if (correct) {
    correctAnswers++;
    score += 20;
    cyberCoins++;
    currentDoor.unlocked = true;

    feedback.textContent = "Correct answer. +20 score and +1 Cyber Coin.";
    toast.textContent = `Door ${currentDoor.id} unlocked. Read the explanation, then continue.`;

    playSound("correct");
    playSound("unlock");

    updateHud();
    draw();

    showLearning("Correct!", question.lesson, true);
  } else {
    wrongAnswers++;
    score = Math.max(0, score - 10);

    buffFish();

    setToCell(player, currentDoor.spawn, player.size);
    doorCooldownUntil = Date.now() + 1400;

    feedback.textContent = timedOut
      ? "Time up. Fish buff activated."
      : "Wrong answer. Fish buff activated.";

    playSound("wrong");

    updateHud();
    draw();

    showLearning(timedOut ? "Time Up" : "Wrong Answer", question.lesson, false);
  }
}

function showLearning(title, text, correct) {
  learningTitle.textContent = title;
  learningText.textContent = text;

  learningModal.classList.add("active");

  toast.textContent = correct
    ? "Correct answer. Read the learning point, then press Continue."
    : "Wrong answer. Read the learning point, then press Continue.";
}

function continueLearning() {
  learningModal.classList.remove("active");
  closeQuestionAndResume();
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

function openPasswordDoor(door) {
  clearKeys();

  currentDoor = door;
  passwordOpen = true;
  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  passwordInput.value = "";
  passwordConfirmInput.value = "";
  passwordFeedback.textContent = "";
  updatePasswordChecks();

  passwordModal.classList.add("active");

  playSound("lock");
  toast.textContent = "Final door: create and confirm a strong password to lock the fish out.";
}

function getPasswordIssues(password, confirmPassword = "") {
  const issues = [];

  if (password.length < 8) {
    issues.push("Add at least 8 characters.");
  }

  if (!/[A-Z]/.test(password)) {
    issues.push("Add one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    issues.push("Add one lowercase letter.");
  }

  if (!/[0-9]/.test(password)) {
    issues.push("Add one number.");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    issues.push("Add one special character.");
  }

  if (password !== confirmPassword) {
    issues.push("Passwords do not match.");
  }

  return issues;
}

function updatePasswordChecks() {
  const password = passwordInput.value;
  const confirmPassword = passwordConfirmInput.value;

  const checks = [
    { ok: password.length >= 8, text: "At least 8 characters" },
    { ok: /[A-Z]/.test(password), text: "One uppercase letter" },
    { ok: /[a-z]/.test(password), text: "One lowercase letter" },
    { ok: /[0-9]/.test(password), text: "One number" },
    { ok: /[^A-Za-z0-9]/.test(password), text: "One special character" },
    { ok: password.length > 0 && password === confirmPassword, text: "Passwords match" }
  ];

  passwordChecks.innerHTML = checks
    .map(check => `<li class="${check.ok ? "ok" : "bad"}">${check.ok ? "✅" : "❌"} ${check.text}</li>`)
    .join("");

  return checks.every(check => check.ok);
}

function submitPasswordDoor() {
  if (!passwordOpen) return;

  const password = passwordInput.value;
  const confirmPassword = passwordConfirmInput.value;
  const issues = getPasswordIssues(password, confirmPassword);

  if (issues.length > 0) {
    passwordFeedback.innerHTML = `
      Weak password. Please fix:<br>
      ${issues.map(issue => `• ${issue}`).join("<br>")}
    `;

    toast.textContent = "Weak password. Fix the missing requirements before the final door opens.";
    playSound("wrong");
    updatePasswordChecks();
    return;
  }

  score += 30;
  cyberCoins++;
  currentDoor.unlocked = true;
  currentDoor.lockedBehind = false;

  finalPasswordLocked = true;
  enemyFrozenUntil = Date.now() + 999999;
  enemyGhost = false;
  enemyPath = [];

  passwordFeedback.textContent = "Strong password confirmed. Final door unlocked. The fish cannot follow you.";
  toast.textContent = "Strong passwords protect accounts. Run to EXIT and lock the fish out!";

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
}

function moveEnemy() {
  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) return;

  const enemyCenter = center(enemy, enemy.size);
  const playerCenter = center(player, player.size);

  if (enemyGhost) {
    const dx = playerCenter.x - enemyCenter.x;
    const dy = playerCenter.y - enemyCenter.y;
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
  const dx = target.x - enemyCenter.x;
  const dy = target.y - enemyCenter.y;
  const d = Math.hypot(dx, dy);

  if (d < 2) {
    enemyPath.shift();
    return;
  }

  enemy.x += (dx / d) * enemySpeed;
  enemy.y += (dy / d) * enemySpeed;
}

function checkCoins() {
  const playerCenter = center(player, player.size);

  for (const coin of coins) {
    if (!coin.collected && dist(playerCenter, { x: coin.x + 7, y: coin.y + 7 }) < 20) {
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
  if (doors.every(door => door.unlocked) && dist(center(player, player.size), cellCenter(EXIT)) < 30) {
    endGame(true);
  }
}

function checkFinalDoorRelock() {
  if (!doors) return;

  const finalDoor = doors[doors.length - 1];

  if (!finalDoor || !finalDoor.unlocked || finalDoor.lockedBehind) return;

  const playerCell = cellOf(player, player.size);

  if (playerCell.r < finalDoor.r || dist(center(player, player.size), cellCenter(EXIT)) < 35) {
    finalDoor.lockedBehind = true;
    toast.textContent = "Final door locked behind you. The fish is trapped outside.";
    playSound("lock");
    draw();
  }
}

function getProgressDoorNumber() {
  const active = nextDoor();

  if (active) return active.id;

  return DOOR_CELLS.length;
}

function getEnemyReviveCell() {
  const progressDoor = getProgressDoorNumber();
  const targetDoorNumber = Math.max(1, progressDoor - 2);
  const targetDoor = doors[targetDoorNumber - 1];

  if (!targetDoor) return START;

  return targetDoor.spawn || START;
}

function getPlayerRespawnCell() {
  const unlocked = doors.filter(door => door.unlocked);

  if (!unlocked.length) return START;

  return unlocked[unlocked.length - 1].spawn || START;
}

function handlePlayerDeath(reason) {
  clearKeys();

  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  lastDeathReason = reason;

  if (revivesUsed >= MAX_REVIVES) {
    endGame(false, "No revives left. You used all 2 revives.");
    return;
  }

  if (cyberCoins >= REVIVE_COST) {
    reviveText.innerHTML = `
      ${reason}<br><br>
      You have <strong>${cyberCoins}</strong> Cyber Coins.<br>
      Revives Used: <strong>${revivesUsed} / ${MAX_REVIVES}</strong><br><br>
      Spend <strong>${REVIVE_COST}</strong> Cyber Coins to revive with full health?
      <br><br>
      The fish will respawn two doors behind your current progress.
    `;

    reviveModal.classList.add("active");
    playSound("warning");
  } else {
    endGame(false, "Not enough Cyber Coins to revive.");
  }
}

function useRevive() {
  if (revivesUsed >= MAX_REVIVES) {
    reviveModal.classList.remove("active");
    endGame(false, "No revives left. You used all 2 revives.");
    return;
  }

  reviveModal.classList.remove("active");

  cyberCoins -= REVIVE_COST;
  revivesUsed++;
  health = TOTAL_HEALTH;

  setToCell(player, getPlayerRespawnCell(), player.size);
  setToCell(enemy, getEnemyReviveCell(), enemy.size);

  enemyPath = [];
  enemyGhost = false;
  playerFacing = "right";

  clearKeys();

  toast.textContent = `Revived. Revives Used: ${revivesUsed}/${MAX_REVIVES}. Fish respawned 2 doors behind.`;

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
  const record = {
    newScore: false,
    newTime: false
  };

  if (score > bestScore) {
    bestScore = score;
    record.newScore = true;
  }

  if (!bestTime || elapsed < bestTime) {
    bestTime = elapsed;
    record.newTime = true;
  }

  if (currentUser) {
    const users = getUsers();

    if (users[currentUser]) {
      users[currentUser].bestScore = Math.max(users[currentUser].bestScore || 0, bestScore);
      users[currentUser].bestTime = !users[currentUser].bestTime
        ? bestTime
        : Math.min(users[currentUser].bestTime, bestTime);
      users[currentUser].gamesPlayed = (users[currentUser].gamesPlayed || 0) + 1;

      saveUsers(users);
    }
  }

  return record;
}

function getBadge() {
  if (correctAnswers >= 14) return "🏆 Cyber Expert";
  if (correctAnswers >= 11) return "🥈 Cyber Defender";
  if (correctAnswers >= 8) return "🥉 Cyber Learner";
  return "🛡️ Cyber Beginner";
}

function endGame(won, message) {
  clearKeys();

  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  stopOverallTimer();
  stopMusic();

  if (won) {
    const record = saveRecords();
    updateHud();

    endTitle.textContent = "Final Result";
    playSound("bonus");

    endText.innerHTML = `
      <div class="result-grid">
        <div>Player</div><strong>${currentUser || "Guest"}</strong>
        <div>Final Score</div><strong>${score}${record.newScore ? " ⭐ New Best" : ""}</strong>
        <div>Best Score</div><strong>${bestScore}</strong>
        <div>Time</div><strong>${formatTime(elapsed)}${record.newTime ? " ⭐ New Best" : ""}</strong>
        <div>Best Time</div><strong>${bestTime ? formatTime(bestTime) : "--:--"}</strong>
        <div>Correct Answers</div><strong>${correctAnswers}/${questionsAnswered}</strong>
        <div>Hints Used</div><strong>${hintsUsed}</strong>
        <div>Revives Used</div><strong>${revivesUsed} / ${MAX_REVIVES}</strong>
        <div>Cyber Coins Left</div><strong>${cyberCoins}</strong>
        <div>Fish Buff Level</div><strong>${fishBuffLevel}</strong>
        <div>Badge</div><strong>${getBadge()}</strong>
      </div>
      <p class="small-text">
        Strong cyber habits help you escape real online dangers. Think before you click.
      </p>
    `;
  } else {
    endTitle.textContent = "Game Over";
    playSound("over");
    playSound("overVoice");

    endText.innerHTML = `
      <p>${message || "Game over."}</p>
      <div class="result-grid">
        <div>Player</div><strong>${currentUser || "Guest"}</strong>
        <div>Final Score</div><strong>${score}</strong>
        <div>Best Score</div><strong>${bestScore}</strong>
        <div>Time</div><strong>${formatTime(elapsed)}</strong>
        <div>Best Time</div><strong>${bestTime ? formatTime(bestTime) : "--:--"}</strong>
        <div>Doors Completed</div><strong>${doors.filter(door => door.unlocked).length}/${doors.length}</strong>
        <div>Correct Answers</div><strong>${correctAnswers}/${questionsAnswered}</strong>
        <div>Hints Used</div><strong>${hintsUsed}</strong>
        <div>Revives Used</div><strong>${revivesUsed} / ${MAX_REVIVES}</strong>
        <div>Badge</div><strong>${getBadge()}</strong>
      </div>
      <p class="small-text">
        Strong cyber habits help you escape real online dangers. Think before you click.
      </p>
    `;
  }

  endModal.classList.add("active");
}

function loop() {
  if (!running || paused || questionOpen || passwordOpen) {
    animationId = null;
    return;
  }

  movePlayer();
  moveEnemy();
  checkCoins();
  checkDoor();
  checkCaught();
  checkFinalDoorRelock();
  checkWin();
  updateHud();
  draw();

  animationId = requestAnimationFrame(loop);
}

function startGame() {
  if (!currentUser) {
    authMessage.textContent = "Please login or register before starting.";
    return;
  }

  if (!$("acceptTerms").checked || !$("acceptParents").checked) {
    goSetupPage(1);
    $("page1Warning").textContent = "Please accept the rules before starting.";
    return;
  }

  playSound("click");

  startModal.classList.remove("active");
  loadingModal.classList.add("active");

  loadingFill.style.width = "0%";
  loadingText.textContent = "Preparing doors...";

  let progress = 0;

  const loadingSteps = [
    "Preparing doors...",
    "Loading cyber questions...",
    "Starting fish AI...",
    "Checking password door...",
    "Entering maze..."
  ];

  const loadInterval = setInterval(() => {
    progress += 20;
    loadingFill.style.width = progress + "%";

    const stepIndex = Math.min(Math.floor(progress / 20) - 1, loadingSteps.length - 1);
    loadingText.textContent = loadingSteps[Math.max(0, stepIndex)];

    if (progress >= 100) {
      clearInterval(loadInterval);
      loadingModal.classList.remove("active");
      beginGame();
    }
  }, 350);
}

function beginGame() {
  resetState();

  running = true;
  paused = false;
  elapsed = 0;
  startTime = Date.now();

  toast.textContent = "Only the next door is shown. Answer carefully and survive.";

  startOverallTimer();
  startMusic();
  loop();
}

function pauseGame() {
  if (!running || questionOpen || passwordOpen || endModal.classList.contains("active")) return;

  clearKeys();

  paused = true;
  running = false;
  stopOverallTimer();

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  if (soundBtn) {
    soundBtn.textContent = soundOn ? "Sound: On" : "Sound: Off";
  }

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

  startOverallTimer();
  startMusic();

  if (!animationId) {
    loop();
  }
}

function restartGame() {
  [
    pauseModal,
    qModal,
    passwordModal,
    reviveModal,
    learningModal,
    endModal,
    loadingModal
  ].forEach(modal => modal.classList.remove("active"));

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  resetState();

  running = true;
  paused = false;
  elapsed = 0;
  startTime = Date.now();

  toast.textContent = "Restarted. Only the next door is visible.";

  startOverallTimer();
  startMusic();
  loop();
}

function exitGame() {
  [
    pauseModal,
    qModal,
    passwordModal,
    reviveModal,
    learningModal,
    endModal,
    loadingModal
  ].forEach(modal => modal.classList.remove("active"));

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  stopOverallTimer();
  stopMusic();
  clearKeys();
  resetState();

  startModal.classList.add("active");
  goSetupPage(3);

  toast.textContent = "Exited game safely. You can start again from the menu.";
}

document.addEventListener("keydown", event => {
  const keyPressed = event.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(keyPressed)) {
    event.preventDefault();
  }

  if (keyPressed === "escape") {
    paused ? resumeGame(true) : pauseGame();
    return;
  }

  if (
    !questionOpen &&
    !passwordOpen &&
    !paused &&
    !reviveModal.classList.contains("active") &&
    !startModal.classList.contains("active") &&
    !loadingModal.classList.contains("active")
  ) {
    keys[keyPressed] = true;
  }
});

document.addEventListener("keyup", event => {
  keys[event.key.toLowerCase()] = false;
});

window.addEventListener("blur", clearKeys);

window.addEventListener("visibilitychange", () => {
  if (document.hidden) clearKeys();
});

passwordInput.addEventListener("input", updatePasswordChecks);
passwordConfirmInput.addEventListener("input", updatePasswordChecks);

restoreLogin();
resetState();

fishImg.onload = draw;
playerImg.onload = draw;
doorClosedImg.onload = draw;
doorOpenImg.onload = draw;

if (soundBtn) {
  soundBtn.textContent = soundOn ? "Sound: On" : "Sound: Off";
}
