const TILE = 40;
const COLS = 29;
const ROWS = 17;

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
  { c: 10, r: 13 },
  { c: 7, r: 7 },
  { c: 12, r: 1 },
  { c: 19, r: 1 },
  { c: 18, r: 7 },
  { c: 19, r: 15 },
  { c: 24, r: 9 }
];

const COIN_CELLS = [
  { c: 4, r: 11 },
  { c: 17, r: 8 },
  { c: 15, r: 1 },
  { c: 8, r: 9 },
  { c: 25, r: 13 },
  { c: 1, r: 5 },
  { c: 17, r: 9 },
  { c: 2, r: 13 },
  { c: 1, r: 6 },
  { c: 15, r: 13 },
  { c: 16, r: 3 },
  { c: 27, r: 11 },
  { c: 8, r: 15 },
  { c: 4, r: 4 },
  { c: 13, r: 14 },
  { c: 13, r: 11 },
  { c: 5, r: 10 },
  { c: 24, r: 15 },
  { c: 26, r: 15 },
  { c: 15, r: 10 },
  { c: 1, r: 1 },
  { c: 13, r: 12 },
  { c: 17, r: 13 },
  { c: 11, r: 12 },
  { c: 15, r: 3 },
  { c: 21, r: 5 }
];

const FISH_SRC = "assets/enemy-fish.png";
const PLAYER_SRC = "assets/player.png";
const DOOR_CLOSED_SRC = "assets/door-closed.png";
const DOOR_OPEN_SRC = "assets/door-open.png";
const DOOR_ANIM_SRC = "assets/door-open.png";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const fishImg = new Image();
fishImg.src = FISH_SRC;

const playerImg = new Image();
playerImg.src = PLAYER_SRC;

const doorClosedImg = new Image();
doorClosedImg.src = DOOR_CLOSED_SRC;

const doorOpenImg = new Image();
doorOpenImg.src = DOOR_OPEN_SRC;

const doorAnimImg = new Image();
doorAnimImg.src = DOOR_ANIM_SRC;

const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const healthEl = document.getElementById("health");
const timeEl = document.getElementById("time");
const bestTimeEl = document.getElementById("bestTime");
const badgeEl = document.getElementById("badge");
const doorsHudEl = document.getElementById("doorsHud");
const enemySpeedEl = document.getElementById("enemySpeedHud");
const toast = document.getElementById("toast");

const startModal = document.getElementById("startModal");
const qModal = document.getElementById("questionModal");
const endModal = document.getElementById("endModal");

const qTitle = document.getElementById("questionTitle");
const qText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const endTitle = document.getElementById("endTitle");
const endText = document.getElementById("endText");

const questions = [
  {
    title: "Door 1: Phishing Email",
    text: "Email says: 'Your bank account will close today. Click login-secure-bank.com now.' What should you do?",
    answers: [
      "Click the link quickly",
      "Go to the official bank website yourself",
      "Reply with your password"
    ],
    correct: 1,
    feedback: "Correct. Urgency and strange links are phishing signs."
  },
  {
    title: "Door 2: Suspicious Link",
    text: "Which link looks suspicious?",
    answers: [
      "https://www.paypal.com/login",
      "https://paypa1-security-check.net",
      "https://www.google.com"
    ],
    correct: 1,
    feedback: "Correct. 'paypa1' uses the number 1 and the domain looks fake."
  },
  {
    title: "Door 3: Unsafe Download",
    text: "A file is called free_game_hack.exe. Is it safe to open?",
    answers: [
      "Yes, because it says free",
      "No, it could contain malware",
      "Yes, if it looks interesting"
    ],
    correct: 1,
    feedback: "Correct. Unknown .exe files can install malware."
  },
  {
    title: "Door 4: Fake Login Page",
    text: "A login page asks for your email password and bank PIN together. What is the safest action?",
    answers: [
      "Enter everything",
      "Close it and check the real website",
      "Share it with friends first"
    ],
    correct: 1,
    feedback: "Correct. Real services should not ask for unrelated sensitive details."
  },
  {
    title: "Door 5: Password Safety",
    text: "Which password is strongest?",
    answers: [
      "password123",
      "sarthak2007",
      "Mango!River92#Cloud"
    ],
    correct: 2,
    feedback: "Correct. Strong passwords are longer and mix words, numbers, and symbols."
  },
  {
    title: "Door 6: Scam Message",
    text: "A message says you won a free iPhone and must pay £2 delivery now. What is the safest choice?",
    answers: [
      "Pay quickly",
      "Ignore or report it because it may be a scam",
      "Send your card details"
    ],
    correct: 1,
    feedback: "Correct. Fake prize messages often steal card details."
  },
  {
    title: "Door 7: Safe Behaviour",
    text: "Someone online asks for your verification code. What should you do?",
    answers: [
      "Share it because they asked nicely",
      "Never share verification codes",
      "Post it in chat"
    ],
    correct: 1,
    feedback: "Correct. Verification codes are private."
  }
];

let keys = {};

let player;
let enemy;
let doors;
let coins;

let score;
let health;
let enemySpeed;
let elapsed;
let startTime;

let bestScore = Number(localStorage.getItem("clickbaitBestScore")) || 0;
let bestTime = Number(localStorage.getItem("clickbaitBestTime")) || 0;

let running = false;
let questionOpen = false;
let currentDoor = null;
let animationId = null;
let lastWallDamage = 0;

let enemyGhost = false;
let ghostTimer = null;
let enemyPath = [];
let lastPathUpdate = 0;

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
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
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

function badge() {
  if (score >= 220 && elapsed <= 180 && health >= 14) return "🏆 Gold";
  if (score >= 170 && elapsed <= 240 && health >= 8) return "🥈 Silver";
  if (score >= 100) return "🥉 Bronze";
  return "None";
}

function isWall(c, r) {
  return c < 0 || r < 0 || c >= COLS || r >= ROWS || MAP[r][c] === "#";
}

function lockedDoorAt(c, r) {
  return doors.find(d => d.c === c && d.r === r && !d.unlocked);
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
  player = { x: 0, y: 0, size: 26 };
  enemy = { x: 0, y: 0, size: 34 };

  doors = DOOR_CELLS.map((cell, i) => ({
    ...cell,
    id: i + 1,
    unlocked: false,
    animating: false
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
  health = 20;
  enemySpeed = 1.20;
  elapsed = 0;
  startTime = Date.now();

  lastWallDamage = 0;
  enemyGhost = false;
  enemyPath = [];
  lastPathUpdate = 0;
  currentDoor = null;
  questionOpen = false;

  if (ghostTimer) clearTimeout(ghostTimer);

  setToCell(player, START, 26);
  setToCell(enemy, { c: 1, r: 1 }, 34);

  updateHud();
  draw();
}

function updateHud() {
  scoreEl.textContent = score;
  bestScoreEl.textContent = bestScore;
  healthEl.textContent = health;
  timeEl.textContent = formatTime(elapsed);
  bestTimeEl.textContent = bestTime ? formatTime(bestTime) : "--:--";
  badgeEl.textContent = badge();
  doorsHudEl.textContent = `${doors.filter(d => d.unlocked).length}/7`;
  enemySpeedEl.textContent = enemyGhost ? enemySpeed.toFixed(2) + " 👻" : enemySpeed.toFixed(2);
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
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);

    ctx.fillStyle = "rgba(255,255,255,.05)";
    ctx.fillRect(x + 6, y + 8, 13, 3);
    ctx.fillRect(x + 21, y + 24, 10, 2);
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

  drawTorches();
  drawCoins();
  drawDoors();
  drawExit();
  drawPlayer();
  drawEnemy();
  drawVignette();
}

function drawTorches() {
  const torches = [
    { c: 1, r: 1 },
    { c: 8, r: 5 },
    { c: 20, r: 7 },
    { c: 27, r: 3 },
    { c: 6, r: 15 },
    { c: 24, r: 15 }
  ];

  for (const t of torches) {
    if (isWall(t.c, t.r)) continue;

    const p = cellCenter(t);
    const rad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 78);

    rad.addColorStop(0, "rgba(251,191,36,.50)");
    rad.addColorStop(1, "rgba(251,191,36,0)");

    ctx.fillStyle = rad;
    ctx.fillRect(p.x - 78, p.y - 78, 156, 156);

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCoins() {
  for (const coin of coins) {
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
  for (const d of doors) {
    const p = cellCenter(d);
    const img = d.animating ? doorAnimImg : (d.unlocked ? doorOpenImg : doorClosedImg);

    if (img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, p.x - 20, p.y - 34, 40, 56);
    } else {
      ctx.fillStyle = d.unlocked ? "#22c55e" : "#facc15";
      ctx.fillRect(p.x - 16, p.y - 26, 32, 42);
    }

    ctx.fillStyle = "rgba(15,23,42,.92)";
    ctx.fillRect(p.x - 25, p.y - 62, 52, 18);

    ctx.strokeStyle = "#475569";
    ctx.strokeRect(p.x - 25, p.y - 62, 52, 18);

    ctx.fillStyle = "#e0f2fe";
    ctx.font = "bold 11px Arial";
    ctx.fillText("Door " + d.id, p.x - 20, p.y - 49);
  }
}

function drawExit() {
  const ep = cellCenter(EXIT);
  const exitImg = doors.every(d => d.unlocked) ? doorOpenImg : doorClosedImg;

  if (exitImg.complete && exitImg.naturalWidth > 0) {
    ctx.drawImage(exitImg, ep.x - 22, ep.y - 36, 44, 60);
  } else {
    ctx.fillStyle = doors.every(d => d.unlocked) ? "#22c55e" : "#14b8a6";
    ctx.fillRect(ep.x - 20, ep.y - 30, 40, 56);
  }

  ctx.fillStyle = "rgba(15,23,42,.92)";
  ctx.fillRect(ep.x - 32, ep.y - 64, 68, 18);

  ctx.strokeStyle = "#475569";
  ctx.strokeRect(ep.x - 32, ep.y - 64, 68, 18);

  ctx.fillStyle = "#e0f2fe";
  ctx.font = "bold 11px Arial";
  ctx.fillText("Final Exit", ep.x - 28, ep.y - 51);
}

function drawPlayer() {
  if (playerImg.complete && playerImg.naturalWidth > 0) {
    ctx.drawImage(playerImg, player.x - 6, player.y - 10, 38, 42);
  } else {
    ctx.fillStyle = "#22c55e";
    ctx.strokeStyle = "#bbf7d0";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(player.x + 13, player.y + 13, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = "15px Arial";
    ctx.fillText("🙂", player.x + 4, player.y + 18);
  }
}

function drawEnemy() {
  if (fishImg.complete && fishImg.naturalWidth > 0) {
    ctx.drawImage(fishImg, enemy.x - 4, enemy.y - 4, 42, 42);
  } else {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(enemy.x + 17, enemy.y + 17, 17, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVignette() {
  const vignette = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    180,
    canvas.width / 2,
    canvas.height / 2,
    700
  );

  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,.42)");

  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function damage(reason) {
  const now = Date.now();

  if (now - lastWallDamage < 420) return;

  lastWallDamage = now;
  health = Math.max(0, health - 2);

  toast.textContent = `${reason} -2 health. Health left: ${health}/20`;

  updateHud();

  if (health <= 0) {
    endGame(false, "You lost all health by hitting walls.");
  }
}

function movePlayer() {
  let dx = 0;
  let dy = 0;

  if (keys["arrowup"] || keys["w"]) dy -= 3.2;
  if (keys["arrowdown"] || keys["s"]) dy += 3.2;
  if (keys["arrowleft"] || keys["a"]) dx -= 3.2;
  if (keys["arrowright"] || keys["d"]) dx += 3.2;

  if (dx !== 0) {
    const nx = player.x + dx;

    if (!blockedAt(nx, player.y, 26, true)) {
      player.x = nx;
    } else {
      damage("Wall collision");
    }
  }

  if (dy !== 0) {
    const ny = player.y + dy;

    if (!blockedAt(player.x, ny, 26, true)) {
      player.y = ny;
    } else {
      damage("Wall collision");
    }
  }
}

function nextDoor() {
  return doors.find(d => !d.unlocked);
}

function checkDoor() {
  const d = nextDoor();

  if (!d || questionOpen) return;

  const pc = cellOf(player, 26);
  const adjacent = Math.abs(pc.c - d.c) + Math.abs(pc.r - d.r) <= 1;
  const close = dist(center(player, 26), cellCenter(d)) < TILE * 1.15;

  if (adjacent || close) {
    openQuestion(d);
  }
}

function openQuestion(d) {
  currentDoor = d;
  questionOpen = true;
  running = false;

  qModal.classList.add("active");
  feedback.textContent = "";

  const q = questions[d.id - 1];

  qTitle.textContent = q.title;
  qText.textContent = q.text;
  answers.innerHTML = "";

  toast.textContent = `Door ${d.id} question opened.`;

  q.answers.forEach((a, i) => {
    const b = document.createElement("button");

    b.textContent = a;
    b.onclick = () => answerQuestion(i, q);

    answers.appendChild(b);
  });
}

function answerQuestion(selected, q) {
  answers.querySelectorAll("button").forEach(b => b.disabled = true);

  if (selected === q.correct) {
    score += 20;
    currentDoor.unlocked = true;
    currentDoor.animating = true;

    feedback.textContent = q.feedback + " +20 points.";
    toast.textContent = `Door ${currentDoor.id} unlocked.`;

    updateHud();
    draw();

    setTimeout(() => {
      currentDoor.animating = false;
      draw();
    }, 850);

    setTimeout(() => {
      qModal.classList.remove("active");
      questionOpen = false;
      running = true;
      startTime = Date.now() - elapsed * 1000;
      currentDoor = null;
      loop();
    }, 2100);
  } else {
    score = Math.max(0, score - 10);
    enemySpeed += 0.25;

    activateGhost();

    feedback.textContent = "Wrong answer. -10 points. Enemy speed increased and ignores walls for 5 seconds.";

    updateHud();

    setTimeout(() => {
      qModal.classList.remove("active");
      questionOpen = false;
      running = true;
      startTime = Date.now() - elapsed * 1000;
      currentDoor = null;
      loop();
    }, 2100);
  }
}

function activateGhost() {
  enemyGhost = true;

  toast.textContent = "Wrong answer: enemy can pass through walls for 5 seconds!";

  updateHud();

  if (ghostTimer) clearTimeout(ghostTimer);

  ghostTimer = setTimeout(() => {
    enemyGhost = false;
    enemyPath = [];
    toast.textContent = "Enemy wall collision is back.";
    updateHud();
  }, 5000);
}

function moveEnemy() {
  const ec = center(enemy, 34);
  const pc = center(player, 26);

  if (enemyGhost) {
    const dx = pc.x - ec.x;
    const dy = pc.y - ec.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d > 0) {
      enemy.x += (dx / d) * enemySpeed;
      enemy.y += (dy / d) * enemySpeed;
    }

    return;
  }

  const now = Date.now();

  if (now - lastPathUpdate > 160 || enemyPath.length < 2) {
    enemyPath = findPath(cellOf(enemy, 34), cellOf(player, 26), false);
    lastPathUpdate = now;
  }

  if (!enemyPath || enemyPath.length < 2) return;

  const target = cellCenter(enemyPath[1]);
  const dx = target.x - ec.x;
  const dy = target.y - ec.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  if (d < 2) {
    enemyPath.shift();
    return;
  }

  enemy.x += (dx / d) * enemySpeed;
  enemy.y += (dy / d) * enemySpeed;
}

function checkCoins() {
  const pc = center(player, 26);

  for (const coin of coins) {
    if (!coin.collected && dist(pc, { x: coin.x + 7, y: coin.y + 7 }) < 20) {
      coin.collected = true;
      score += 5;
      updateHud();
    }
  }
}

function checkCaught() {
  if (dist(center(player, 26), center(enemy, 34)) < 24) {
    endGame(false, "The angler fish caught you.");
  }
}

function checkWin() {
  if (doors.every(d => d.unlocked) && dist(center(player, 26), cellCenter(EXIT)) < 28) {
    endGame(true);
  }
}

function saveRecords() {
  let newScore = false;
  let newTime = false;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("clickbaitBestScore", String(bestScore));
    newScore = true;
  }

  if (!bestTime || elapsed < bestTime) {
    bestTime = elapsed;
    localStorage.setItem("clickbaitBestTime", String(bestTime));
    newTime = true;
  }

  return { newScore, newTime };
}

function endGame(won, msg) {
  running = false;

  if (animationId) cancelAnimationFrame(animationId);

  endModal.classList.add("active");

  if (won) {
    const rec = saveRecords();

    updateHud();

    endTitle.textContent = "Level Complete!";

    endText.innerHTML = `
      You escaped the maze.<br><br>
      Final Score: <strong>${score}</strong>${rec.newScore ? " - New high score!" : ""}<br>
      Health: <strong>${health}/20</strong><br>
      Time: <strong>${formatTime(elapsed)}</strong>${rec.newTime ? " - New best time!" : ""}<br>
      Badge: <strong>${badge()}</strong>
    `;
  } else {
    endTitle.textContent = "Game Over";

    endText.innerHTML = `
      ${msg || "Game over."}<br><br>
      Final Score: <strong>${score}</strong><br>
      Health: <strong>${health}/20</strong><br>
      Time: <strong>${formatTime(elapsed)}</strong><br>
      Badge: <strong>${badge()}</strong>
    `;
  }
}

function loop() {
  if (!running || questionOpen) return;

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

function startGame() {
  startModal.classList.remove("active");
  running = true;
  startTime = Date.now();
  toast.textContent = "Reach Door 1. Questions now pop correctly.";
  loop();
}

function restartGame() {
  if (animationId) cancelAnimationFrame(animationId);

  endModal.classList.remove("active");
  qModal.classList.remove("active");

  resetState();

  running = true;
  startTime = Date.now();
  toast.textContent = "Restarted. Reach Door 1.";

  loop();
}

document.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

resetState();

fishImg.onload = draw;
playerImg.onload = draw;
doorClosedImg.onload = draw;
doorOpenImg.onload = draw;
doorAnimImg.onload = draw;
