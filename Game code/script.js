const TILE = 40;
const COLS = 29;
const ROWS = 17;

const TOTAL_HEALTH = 20;
const REVIVE_COST = 3;
const MAX_REVIVES = 2;
const HINT_COST = 1;

const MAIN_ENEMY_SPEED = 0.82;
const HIDDEN_ENEMY_SPEED = 1.75;
const MAIN_QUESTION_TIME = 18;
const HIDDEN_QUESTION_TIME = 14;
const PLAYER_SPEED = 2.45;

const MAIN_MAP = [
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

const HIDDEN_MAP = [
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

const MAIN_START = { c: 1, r: 15 };
const MAIN_EXIT = { c: 27, r: 1 };

const HIDDEN_START = { c: 1, r: 15 };
const HIDDEN_EXIT = { c: 27, r: 1 };

const MAIN_DOOR_CELLS = [
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

const HIDDEN_DOOR_CELLS = [
  { c: 9, r: 15, spawn: { c: 7, r: 15 }, final: false },
  { c: 11, r: 9, spawn: { c: 11, r: 11 }, final: false },
  { c: 7, r: 5, spawn: { c: 7, r: 7 }, final: false },
  { c: 11, r: 1, spawn: { c: 9, r: 1 }, final: false },
  { c: 17, r: 3, spawn: { c: 15, r: 3 }, final: false },
  { c: 21, r: 3, spawn: { c: 21, r: 1 }, final: false },
  { c: 17, r: 7, spawn: { c: 19, r: 7 }, final: false },
  { c: 17, r: 15, spawn: { c: 17, r: 13 }, final: false },
  { c: 23, r: 13, spawn: { c: 21, r: 13 }, final: false },
  { c: 25, r: 7, spawn: { c: 25, r: 9 }, final: false }
];

const MAIN_COIN_CELLS = [
  { c: 4, r: 11 }, { c: 17, r: 8 }, { c: 15, r: 1 }, { c: 8, r: 9 },
  { c: 25, r: 13 }, { c: 1, r: 5 }, { c: 17, r: 9 }, { c: 2, r: 13 },
  { c: 1, r: 6 }, { c: 15, r: 13 }, { c: 16, r: 3 }, { c: 27, r: 11 },
  { c: 8, r: 15 }, { c: 4, r: 4 }, { c: 13, r: 14 }, { c: 13, r: 11 },
  { c: 5, r: 10 }, { c: 24, r: 15 }, { c: 26, r: 15 }, { c: 15, r: 10 },
  { c: 1, r: 1 }, { c: 13, r: 12 }, { c: 17, r: 13 }, { c: 11, r: 12 },
  { c: 15, r: 3 }, { c: 21, r: 5 }
];

const HIDDEN_COIN_CELLS = [
  { c: 3, r: 15 }, { c: 6, r: 15 }, { c: 9, r: 13 }, { c: 11, r: 11 },
  { c: 10, r: 9 }, { c: 7, r: 7 }, { c: 9, r: 3 }, { c: 13, r: 1 },
  { c: 17, r: 1 }, { c: 19, r: 3 }, { c: 19, r: 7 }, { c: 17, r: 11 },
  { c: 19, r: 15 }, { c: 21, r: 13 }, { c: 23, r: 11 }, { c: 25, r: 9 },
  { c: 27, r: 5 }, { c: 27, r: 3 }
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

const mainQuestions = [
  {
    title: "Door 1: School Account Warning",
    text: "Your school account will be permanently deleted in 2 hours. The sender is support-schoolservices@gmail.com. What should you do?",
    answers: ["Click quickly before losing access", "Ignore warning signs because it mentions school", "Check with your school or official platform first", "Reply asking if the email is legitimate"],
    correct: 2,
    hint: "Check the sender and verify through the official school system.",
    lesson: "Urgent account warnings can be phishing. Always verify through official school platforms."
  },
  {
    title: "Door 2: Free Gaming Download",
    text: "A gaming website says FREE PREMIUM SKINS – DOWNLOAD NOW and immediately starts downloading a file. What should you do?",
    answers: ["Run the file immediately", "Delete the file and leave the site", "Share with friends first", "Disable antivirus and continue"],
    correct: 1,
    hint: "Unexpected downloads are risky.",
    lesson: "Unknown downloads can contain malware. Delete them and leave the site."
  },
  {
    title: "Door 3: Public WiFi",
    text: "You connect to free public WiFi and need to log into an important account. What is safest?",
    answers: ["Log in normally", "Wait until using a trusted connection", "Use easier passwords", "Turn brightness down before logging in"],
    correct: 1,
    hint: "Think about whether the network is trusted.",
    lesson: "Public WiFi can be unsafe for important accounts. Use a trusted connection."
  },
  {
    title: "Door 4: Fake Instagram Page",
    text: "URL: secure-instagram-login.verify-account.net. The page looks identical to Instagram. What is the strongest warning sign?",
    answers: ["It uses dark mode", "It loaded quickly", "The web address is unusual", "It asked for your username"],
    correct: 2,
    hint: "A fake page can look real. Check the URL.",
    lesson: "The web address is one of the biggest warning signs of a fake login page."
  },
  {
    title: "Door 5: Unexpected Link",
    text: "A friend sends an unknown link. It requests login, then payment information. When should you stop?",
    answers: ["After payment request", "After login request", "After receiving unexpected link", "After account gets locked"],
    correct: 2,
    hint: "The safest time to stop is before clicking.",
    lesson: "Stop when you receive an unexpected link. Verify with the person first."
  },
  {
    title: "Door 6: Password Strength",
    text: "Password A: BlueFoxTrainCoffeePizza99. Password B: G!7$qL#2z@8. Which is better security practice?",
    answers: ["Password A because it is longer and unique", "Password B because symbols always mean stronger security", "Both are equally secure", "Neither because passwords should never contain words"],
    correct: 0,
    hint: "Length and uniqueness matter.",
    lesson: "Long unique passphrases can be strong and easier to remember."
  },
  {
    title: "Door 7: Verification Code",
    text: "A close friend asks you to receive a verification code for them. The account looks genuine. What is safest?",
    answers: ["Help because you know them personally", "Send only part of the code", "Refuse because verification codes should stay private", "Ask them to promise not to misuse it"],
    correct: 2,
    hint: "A verification code is like an account key.",
    lesson: "Never share verification codes. Even real-looking accounts can be hacked."
  },
  {
    title: "Door 8: QR Code Login",
    text: "A QR website uses HTTPS, looks professional, asks for school login details, and the URL is unrelated to your school. What is the greatest concern?",
    answers: ["QR codes are always dangerous", "Professional design", "Unrelated website requesting credentials", "HTTPS encryption"],
    correct: 2,
    hint: "HTTPS does not always mean the site is trusted.",
    lesson: "A fake website can still use HTTPS. Check if the site belongs to your school."
  },
  {
    title: "Door 9: Suspicious Link Clicked",
    text: "You accidentally click a suspicious link. Nothing downloads and nothing happens. What is the BEST response?",
    answers: ["Ignore it because nothing happened", "Restart device immediately", "Monitor activity and avoid entering information afterward", "Factory reset device"],
    correct: 2,
    hint: "Nothing visible does not always mean safe.",
    lesson: "After clicking a suspicious link, avoid entering details and monitor your accounts."
  },
  {
    title: "Door 10: Shared Computer",
    text: "You use a school computer. After logging out, the browser asks Save password? What is safest?",
    answers: ["Save because computer requires login already", "Save temporarily", "Decline saving credentials on shared devices", "Save if browser looks trustworthy"],
    correct: 2,
    hint: "Other people may use the device later.",
    lesson: "Never save passwords on shared computers."
  },
  {
    title: "Door 11: School Portal Email",
    text: "A school portal email asks you to sign in again. The sender matches previous emails and the link opens the correct domain. What should you do?",
    answers: ["Log in immediately because domain is correct", "Ignore the email completely", "Access the portal manually rather than through the email link", "Reply asking whether it is legitimate"],
    correct: 2,
    hint: "Manual access is safer than email links.",
    lesson: "Open important portals manually instead of clicking email links."
  },
  {
    title: "Door 12: Delivery Message",
    text: "You order gaming equipment. Ten minutes later, a delivery message has correct branding, order number, first name, and HTTPS link. Best action?",
    answers: ["Enter details because information matches recent activity", "Click link but avoid entering payment details", "Open retailer website independently and verify delivery information there", "Trust message because scammers cannot know order numbers"],
    correct: 2,
    hint: "Scammers can sometimes know real order details.",
    lesson: "Realistic details do not prove safety. Verify through the official retailer site."
  },
  {
    title: "Door 13: Safe Charging",
    text: "Your phone battery is low at an event. Option A: free USB cable already connected. Option B: power socket only. Option C: staff charger. What is safest?",
    answers: ["Option A because charging is charging", "Option B", "Option C because staff are trusted", "Use whichever charges fastest"],
    correct: 1,
    hint: "USB cables can transfer data.",
    lesson: "A power socket is safer than an unknown USB cable."
  },
  {
    title: "Door 14: Urgency Trick",
    text: "Why do many phishing attacks create urgency?",
    answers: ["Faster internet connections require speed", "Urgency increases mistakes and reduces critical thinking", "Messages expire automatically", "Attackers cannot send longer messages"],
    correct: 1,
    hint: "Urgency makes people rush.",
    lesson: "Urgency reduces careful thinking. Scammers want fast mistakes."
  },
  {
    title: "Door 15: Spam Filter Trust",
    text: "An email has correct branding, correct domain spelling, expected timing and passes spam filters. Which assumption is MOST dangerous?",
    answers: ["Thinking branding proves legitimacy", "Thinking spam filters catch everything", "Thinking timing matters", "Thinking security updates exist"],
    correct: 1,
    hint: "Spam filters help, but they are not perfect.",
    lesson: "Spam filters do not catch everything. You still need to check carefully."
  }
];

const hiddenQuestions = [
  {
    title: "Hidden Door 1: HTTPS Trap",
    text: "A website has a padlock icon and HTTPS, but the domain is school-login-help.net instead of your school’s real website. What is the biggest risk?",
    answers: ["HTTPS means it is always safe", "The website may still be fake even with HTTPS", "The padlock means the school owns it", "Only old websites are dangerous"],
    correct: 1,
    hint: "HTTPS protects connection, not honesty.",
    lesson: "HTTPS only means the connection is encrypted. A fake website can also use HTTPS."
  },
  {
    title: "Hidden Door 2: Credential Stuffing",
    text: "You used the same password for a game account and your school email. The game website gets hacked. What attack could happen next?",
    answers: ["Credential stuffing", "Screen freezing", "WiFi boosting", "File compression"],
    correct: 0,
    hint: "Attackers try leaked passwords on other accounts.",
    lesson: "Credential stuffing is when attackers use leaked usernames and passwords on other websites."
  },
  {
    title: "Hidden Door 3: Recovery Code",
    text: "A friend asks for your recovery code because they say they need help logging in. Why is this dangerous?",
    answers: ["Recovery codes can unlock your account", "Recovery codes only work once so they are safe", "Friends cannot misuse codes", "Codes are only for games"],
    correct: 0,
    hint: "Recovery codes are like backup keys.",
    lesson: "Recovery codes can bypass normal login protection. Never share them."
  },
  {
    title: "Hidden Door 4: Fake Support",
    text: "A message says: 'We detected suspicious activity. Send your password so support can secure your account.' What is the best answer?",
    answers: ["Send the password if the message looks professional", "Send only half of the password", "Never share your password with support", "Ask support to delete the message"],
    correct: 2,
    hint: "Real support should not ask for passwords.",
    lesson: "Real support teams never need your password. Anyone asking for it is suspicious."
  },
  {
    title: "Hidden Door 5: QR Phishing",
    text: "A poster at school says 'Scan to get free exam answers'. The QR code opens a login page. What should you do?",
    answers: ["Login quickly before it expires", "Scan again on another phone", "Close it and report it", "Share it with classmates"],
    correct: 2,
    hint: "Free exam answers is already suspicious.",
    lesson: "QR codes can hide dangerous links. Close suspicious pages and report them."
  },
  {
    title: "Hidden Door 6: Social Engineering",
    text: "An attacker does not hack the system. Instead, they trick a student into giving login details. What is this called?",
    answers: ["Social engineering", "File backup", "Password hashing", "Software update"],
    correct: 0,
    hint: "The attack targets the person.",
    lesson: "Social engineering tricks people into making security mistakes."
  },
  {
    title: "Hidden Door 7: Shared Computer",
    text: "You are using a shared school computer. The browser asks to save your password. Why should you click 'Never'?",
    answers: ["Saved passwords can be accessed by the next user", "Saving passwords makes internet slower", "The keyboard will stop working", "Passwords become shorter"],
    correct: 0,
    hint: "Think who uses it after you.",
    lesson: "Never save passwords on shared or public computers."
  },
  {
    title: "Hidden Door 8: Deepfake Voice",
    text: "You get a voice message that sounds like your friend asking for your login code. What is the safest action?",
    answers: ["Trust it because it sounds real", "Send the code quickly", "Verify with them using another method", "Post the code in a group chat"],
    correct: 2,
    hint: "Voices can be faked.",
    lesson: "AI can fake voices. Verify strange requests another way."
  },
  {
    title: "Hidden Door 9: MFA Fatigue",
    text: "You keep getting login approval notifications even though you are not logging in. What might an attacker be trying?",
    answers: ["Making your phone faster", "Annoying you until you press approve", "Updating your account", "Improving your password"],
    correct: 1,
    hint: "They want one mistaken tap.",
    lesson: "MFA fatigue attacks spam approval requests until the user accidentally accepts one."
  },
  {
    title: "Hidden Door 10: Emergency Response",
    text: "You entered your password on a suspicious website, then realised it may be fake. What should you do first?",
    answers: ["Wait to see what happens", "Delete browser history only", "Change the password on the real website immediately", "Message the fake website asking for deletion"],
    correct: 2,
    hint: "Act before the attacker uses it.",
    lesson: "If you entered a password on a fake site, change it immediately on the real site and enable 2FA."
  }
];

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
let audioUnlocked = false;

for (const [name, src] of Object.entries(SOUNDS)) {
  audio[name] = new Audio(src);
  audio[name].preload = "auto";
}

audio.bg.loop = true;
audio.bg.volume = 0.22;

const levelHud = $("levelHud");
const userHud = $("userHud");
const scoreEl = $("score");
const bestScoreEl = $("bestScore");
const healthEl = $("health");
const cyberCoinsHud = $("cyberCoinsHud");
const doorsHudEl = $("doorsHud");
const timeEl = $("time");
const fishHud = $("fishHud");
const toast = $("toast");
const damageFlash = $("damageFlash");

const startModal = $("startModal");
const loadingModal = $("loadingModal");
const loadingFill = $("loadingFill");
const loadingText = $("loadingText");
const loadingTitle = $("loadingTitle");
const pauseModal = $("pauseModal");
const qModal = $("questionModal");
const passwordModal = $("passwordModal");
const reviveModal = $("reviveModal");
const learningModal = $("learningModal");
const hiddenLevelModal = $("hiddenLevelModal");
const endModal = $("endModal");
const tipsModal = $("tipsModal");
const feedbackModal = $("feedbackModal");
const feedbackThanks = $("feedbackThanks");
const manualFeedbackDownload = $("manualFeedbackDownload");
const finalAnimationModal = $("finalAnimationModal");
const finalAnimationVideo = $("finalAnimationVideo");

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
const registerStrength = $("registerStrength");
const authMessage = $("authMessage");
const loggedInBox = $("loggedInBox");
const loggedInName = $("loggedInName");
const soundBtn = $("soundBtn");

let activeLevel = "main";
let currentMap = MAIN_MAP;
let currentStart = MAIN_START;
let currentExit = MAIN_EXIT;
let currentDoorCells = MAIN_DOOR_CELLS;
let currentCoinCells = MAIN_COIN_CELLS;
let currentQuestions = mainQuestions;
let currentEnemyBaseSpeed = MAIN_ENEMY_SPEED;
let currentQuestionTime = MAIN_QUESTION_TIME;

let keys = {};
let player;
let enemy;
let doors;
let coins;

let score = 0;
let health = TOTAL_HEALTH;
let cyberCoins = 0;
let enemySpeed = MAIN_ENEMY_SPEED;
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

let questionTimeLeft = MAIN_QUESTION_TIME;
let enemyGhost = false;
let enemyPath = [];
let lastPathUpdate = 0;
let lastWallDamage = 0;

let playerFacing = "right";
let playerMoving = false;
let enemyFacing = "left";
let lastDeathReason = "";
let enemyFrozenUntil = 0;
let doorCooldownUntil = 0;
let finalPasswordLocked = false;

let hintsUsed = 0;
let questionsAnswered = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let revivesUsed = 0;
let hiddenCompleted = false;

function isTypingTarget(event) {
  const target = event.target;

  if (!target) return false;

  const tag = target.tagName;

  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function unlockAudio() {
  if (audioUnlocked) return;

  audioUnlocked = true;

  for (const sound of Object.values(audio)) {
    sound.volume = sound === audio.bg ? 0.22 : 0.8;

    sound.play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
      })
      .catch(() => {});
  }
}

function playSound(name) {
  if (!soundOn) return;

  const sound = audio[name];

  if (!sound) {
    console.warn("Sound not found:", name);
    return;
  }

  try {
    const clone = sound.cloneNode();
    clone.volume = sound.volume || 0.8;

    clone.play().catch(error => {
      console.warn("Sound play failed:", name, error.message);
    });
  } catch (error) {
    console.warn("Sound error:", name, error.message);
  }
}

function startMusic() {
  if (!soundOn) return;

  audio.bg.volume = activeLevel === "hidden" ? 0.16 : 0.22;
  audio.bg.loop = true;

  audio.bg.play().catch(error => {
    console.warn("Background music blocked or missing:", error.message);
  });
}

function stopMusic() {
  try {
    audio.bg.pause();
    audio.bg.currentTime = 0;
  } catch {}
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
  playerMoving = false;
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
  updateRegisterStrength();
  playSound("click");
}

function showLogin() {
  registerPanel.classList.add("hidden");
  loginPanel.classList.remove("hidden");
  authMessage.textContent = "";
  playSound("click");
}

function getRegisterPasswordIssues(password) {
  const issues = [];

  if (password.length < 8) issues.push("8 characters");
  if (!/[A-Z]/.test(password)) issues.push("uppercase letter");
  if (!/[a-z]/.test(password)) issues.push("lowercase letter");
  if (!/[0-9]/.test(password)) issues.push("number");
  if (!/[^A-Za-z0-9]/.test(password)) issues.push("special character");

  return issues;
}

function updateRegisterStrength() {
  if (!registerStrength) return;

  const password = registerPassword.value;
  const issues = getRegisterPasswordIssues(password);

  registerStrength.classList.remove("medium", "strong");

  if (!password) {
    registerStrength.textContent = "Password needs 8 characters, uppercase, lowercase, number, and special character.";
    return;
  }

  if (issues.length === 0) {
    registerStrength.textContent = "Strong password. Good cyber habit!";
    registerStrength.classList.add("strong");
    return;
  }

  if (issues.length <= 2) {
    registerStrength.textContent = "Almost strong. Add: " + issues.join(", ") + ".";
    registerStrength.classList.add("medium");
    return;
  }

  registerStrength.textContent = "Weak password. Add: " + issues.join(", ") + ".";
}

function registerUser() {
  const username = safeName(registerUsername.value);
  const password = registerPassword.value;
  const users = getUsers();

  if (!username) {
    authMessage.textContent = "Please enter a username.";
    return;
  }

  const passwordIssues = getRegisterPasswordIssues(password);

  if (passwordIssues.length > 0) {
    authMessage.textContent = "Use a stronger password. Missing: " + passwordIssues.join(", ") + ".";
    updateRegisterStrength();
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

function setLevel(levelName) {
  activeLevel = levelName;

  if (levelName === "hidden") {
    currentMap = HIDDEN_MAP;
    currentStart = HIDDEN_START;
    currentExit = HIDDEN_EXIT;
    currentDoorCells = HIDDEN_DOOR_CELLS;
    currentCoinCells = HIDDEN_COIN_CELLS;
    currentQuestions = hiddenQuestions;
    currentEnemyBaseSpeed = HIDDEN_ENEMY_SPEED;
    currentQuestionTime = HIDDEN_QUESTION_TIME;
  } else {
    currentMap = MAIN_MAP;
    currentStart = MAIN_START;
    currentExit = MAIN_EXIT;
    currentDoorCells = MAIN_DOOR_CELLS;
    currentCoinCells = MAIN_COIN_CELLS;
    currentQuestions = mainQuestions;
    currentEnemyBaseSpeed = MAIN_ENEMY_SPEED;
    currentQuestionTime = MAIN_QUESTION_TIME;
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

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function isWall(c, r) {
  return c < 0 || r < 0 || c >= COLS || r >= ROWS || currentMap[r][c] === "#";
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
function resetState(keepLevel = false) {
  if (!keepLevel) setLevel("main");

  player = { x: 0, y: 0, size: 26 };
  enemy = { x: 0, y: 0, size: 34 };

  doors = currentDoorCells.map((door, index) => ({
    ...door,
    id: index + 1,
    unlocked: false,
    lockedBehind: false
  }));

  coins = currentCoinCells.map(cell => {
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
  enemySpeed = currentEnemyBaseSpeed;
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
  playerMoving = false;
  enemyFacing = activeLevel === "hidden" ? "left" : "right";

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

  setToCell(player, currentStart, player.size);

  if (activeLevel === "hidden") {
    setToCell(enemy, { c: 27, r: 15 }, enemy.size);
  } else {
    setToCell(enemy, { c: 1, r: 1 }, enemy.size);
  }

  updateHud();
  draw();
}

function updateHud() {
  levelHud.textContent = activeLevel === "hidden" ? "Hidden" : "Main";
  userHud.textContent = currentUser || "Guest";
  scoreEl.textContent = score;
  bestScoreEl.textContent = bestScore;
  healthEl.textContent = health;
  cyberCoinsHud.textContent = cyberCoins;
  doorsHudEl.textContent = `${doors ? doors.filter(d => d.unlocked).length : 0}/${currentDoorCells.length}`;
  timeEl.textContent = formatTime(elapsed);
  fishHud.textContent = `Buff ${fishBuffLevel}${enemyGhost ? " 👻" : ""}`;
}

function drawTile(c, r, type) {
  const x = c * TILE;
  const y = r * TILE;

  if (type === "#") {
    ctx.fillStyle = activeLevel === "hidden" ? "#111827" : "#1e293b";
    ctx.fillRect(x, y, TILE, TILE);

    ctx.fillStyle = activeLevel === "hidden" ? "#312e81" : "#334155";
    ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(x + 7, y + 8, 14, 3);
    ctx.fillRect(x + 21, y + 25, 11, 3);
  } else {
    ctx.fillStyle = activeLevel === "hidden" ? "#27272a" : "#71717a";
    ctx.fillRect(x, y, TILE, TILE);

    ctx.fillStyle = activeLevel === "hidden" ? "#3f3f46" : "#52525b";
    ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
  }
}

function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      drawTile(c, r, currentMap[r][c]);
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

    ctx.fillStyle = activeLevel === "hidden" ? "#c084fc" : "#fde68a";
    ctx.fillRect(coin.x + 2, coin.y, 10, 14);

    ctx.fillStyle = activeLevel === "hidden" ? "#7e22ce" : "#f59e0b";
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

    if (door.lockedBehind) img = doorClosedImg;

    if (img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, p.x - 20, p.y - 34, 40, 56);
    } else {
      ctx.fillStyle = door.lockedBehind ? "#ef4444" : door.unlocked ? "#22c55e" : activeLevel === "hidden" ? "#c084fc" : "#facc15";
      ctx.fillRect(p.x - 16, p.y - 26, 32, 42);
    }

    ctx.fillStyle = "#020617";
    ctx.fillRect(p.x - 35, p.y - 62, 70, 18);

    ctx.strokeStyle = door.lockedBehind ? "#ef4444" : activeLevel === "hidden" ? "#c084fc" : "#67e8f9";
    ctx.strokeRect(p.x - 35, p.y - 62, 70, 18);

    ctx.fillStyle = "#e0f2fe";
    ctx.font = "10px Courier New";

    let label = activeLevel === "hidden" ? `H-${door.id}` : door.final ? "FINAL" : `DOOR ${door.id}`;

    if (door.lockedBehind) label = "LOCKED";

    ctx.fillText(label, p.x - 26, p.y - 49);
  }
}

function drawExit() {
  const ep = cellCenter(currentExit);

  ctx.fillStyle = "#020617";
  ctx.fillRect(ep.x - 34, ep.y - 28, 68, 24);

  ctx.strokeStyle = activeLevel === "hidden" ? "#c084fc" : "#67e8f9";
  ctx.strokeRect(ep.x - 34, ep.y - 28, 68, 24);

  ctx.fillStyle = activeLevel === "hidden" ? "#c084fc" : "#67e8f9";
  ctx.font = "bold 12px Courier New";
  ctx.fillText(activeLevel === "hidden" ? "H-EXIT" : "EXIT", ep.x - 28, ep.y - 12);
}

function drawPlayer() {
  const w = 38;
  const h = 42;
  const x = player.x - 6;
  const y = player.y - 10;
  const walkBounce = playerMoving ? Math.sin(Date.now() / 90) * 2 : 0;

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  if (playerImg.complete && playerImg.naturalWidth > 0) {
    if (playerFacing === "left") {
      ctx.translate(x + w, y + walkBounce);
      ctx.scale(-1, 1);
      ctx.drawImage(playerImg, 0, 0, w, h);
    } else {
      ctx.drawImage(playerImg, x, y + walkBounce, w, h);
    }
  } else {
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(player.x + 5, player.y + 4 + walkBounce, 18, 22);
  }

  ctx.restore();
}

function drawEnemy() {
  const buffSize = fishBuffLevel * 4 + (activeLevel === "hidden" ? 6 : 0);
  const drawSize = 40 + buffSize;
  const offset = (drawSize - enemy.size) / 2;

  ctx.save();

  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) {
    ctx.globalAlpha = 0.35;
  } else if (enemyGhost || fishBuffLevel > 0 || activeLevel === "hidden") {
    ctx.shadowColor = activeLevel === "hidden" ? "rgba(192,132,252,.95)" : "rgba(239,68,68,.95)";
    ctx.shadowBlur = 20 + fishBuffLevel * 4;
  }

  if (fishImg.complete && fishImg.naturalWidth > 0) {
    if (enemyFacing === "left") {
      ctx.translate(enemy.x - offset + drawSize, enemy.y - offset);
      ctx.scale(-1, 1);
      ctx.drawImage(fishImg, 0, 0, drawSize, drawSize);
    } else {
      ctx.drawImage(fishImg, enemy.x - offset, enemy.y - offset, drawSize, drawSize);
    }
  } else {
    ctx.fillStyle = activeLevel === "hidden" ? "#9333ea" : "#ef4444";
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
  gradient.addColorStop(1, activeLevel === "hidden" ? "rgba(45,0,80,.55)" : "rgba(0,0,0,.45)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function flashDamage() {
  damageFlash.classList.add("active");
  setTimeout(() => damageFlash.classList.remove("active"), 260);
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

  if (health <= 0) handlePlayerDeath("You lost all health.");
}

function movePlayer() {
  let dx = 0;
  let dy = 0;

  if (keys.arrowup || keys.w) dy -= PLAYER_SPEED;
  if (keys.arrowdown || keys.s) dy += PLAYER_SPEED;
  if (keys.arrowleft || keys.a) dx -= PLAYER_SPEED;
  if (keys.arrowright || keys.d) dx += PLAYER_SPEED;

  playerMoving = dx !== 0 || dy !== 0;

  if (dx > 0) playerFacing = "right";
  if (dx < 0) playerFacing = "left";

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
    if (door.final && activeLevel === "main") {
      openPasswordDoor(door);
    } else {
      openQuestion(door);
    }
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

  const question = currentQuestions[door.id - 1];

  qTitle.textContent = question.title;
  qText.textContent = question.text;
  hintBtn.disabled = false;
  hintBtn.textContent = `Use Hint (${HINT_COST} Coin)`;

  toast.textContent = `${activeLevel === "hidden" ? "Hidden" : "Cyber"} Door ${door.id} challenge opened.`;
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

  questionTimeLeft = currentQuestionTime;
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

  const question = currentQuestions[currentDoor.id - 1];

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

  answers.querySelectorAll("button").forEach(button => button.disabled = true);

  if (questionInterval) clearInterval(questionInterval);
  questionInterval = null;

  questionsAnswered++;

  const correct = !timedOut && selected === question.correct;

  if (correct) {
    correctAnswers++;
    score += activeLevel === "hidden" ? 35 : 20;
    cyberCoins++;
    currentDoor.unlocked = true;

    feedback.textContent = `Correct answer. +${activeLevel === "hidden" ? 35 : 20} score and +1 Cyber Coin.`;
    toast.textContent = `Door ${currentDoor.id} unlocked. Read the explanation, then continue.`;

    playSound("correct");
    playSound("unlock");

    updateHud();
    draw();

    showLearning("Correct!", question.lesson, true);
  } else {
    wrongAnswers++;
    score = Math.max(0, score - (activeLevel === "hidden" ? 18 : 10));

    buffFish();

    if (activeLevel !== "hidden") {
      setToCell(player, currentDoor.spawn, player.size);
    } else {
      toast.textContent = "Wrong answer. No respawn in hidden level. The fish gets faster.";
    }

    doorCooldownUntil = Date.now() + 1400;

    feedback.textContent = timedOut ? "Time up. Fish buff activated." : "Wrong answer. Fish buff activated.";

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

  const completedAllDoors = doors.every(door => door.unlocked);

  questionOpen = false;
  currentDoor = null;

  clearKeys();

  if (activeLevel === "hidden" && completedAllDoors) {
    toast.textContent = "All hidden doors unlocked. Reach the hidden exit!";
  }

  resumeGame(false);
}
function buffFish() {
  fishBuffLevel++;

  enemySpeed = Math.min(
    activeLevel === "hidden" ? 2.85 : 1.65,
    currentEnemyBaseSpeed + fishBuffLevel * (activeLevel === "hidden" ? 0.22 : 0.10)
  );

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

  if (password.length < 8) issues.push("Add at least 8 characters.");
  if (!/[A-Z]/.test(password)) issues.push("Add one uppercase letter.");
  if (!/[a-z]/.test(password)) issues.push("Add one lowercase letter.");
  if (!/[0-9]/.test(password)) issues.push("Add one number.");
  if (!/[^A-Za-z0-9]/.test(password)) issues.push("Add one special character.");
  if (password !== confirmPassword) issues.push("Passwords do not match.");

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
  currentDoor.lockedBehind = true;

  finalPasswordLocked = true;
  enemyFrozenUntil = Date.now() + 999999;
  enemyGhost = false;
  enemyPath = [];

  passwordFeedback.textContent = "Strong password confirmed. Final door locked. The fish cannot follow you.";
  toast.textContent = "Strong password accepted. Final escape animation starting.";

  playSound("lock");
  playSound("open");

  updateHud();
  draw();

  setTimeout(() => {
    passwordModal.classList.remove("active");
    passwordOpen = false;
    currentDoor = null;
    clearKeys();
    playFinalAnimation();
  }, 800);
}

function playFinalAnimation() {
  running = false;
  paused = false;
  clearKeys();

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  stopMusic();

  finalAnimationModal.classList.add("active");

  finalAnimationVideo.currentTime = 0;
  finalAnimationVideo.muted = !soundOn;

  finalAnimationVideo.play().catch(error => {
    console.warn("Final animation play failed:", error.message);

    setTimeout(() => {
      finalAnimationModal.classList.remove("active");
      afterMainLevelComplete();
    }, 3000);
  });

  finalAnimationVideo.onended = () => {
    finalAnimationModal.classList.remove("active");
    afterMainLevelComplete();
  };
}

function afterMainLevelComplete() {
  stopOverallTimer();

  if (correctAnswers >= 14) {
    hiddenLevelModal.classList.add("active");
    playSound("bonus");
  } else {
    endGame(true, "main");
  }
}

function startHiddenLevel() {
  hiddenLevelModal.classList.remove("active");

  setLevel("hidden");
  resetState(true);

  running = false;
  paused = false;

  loadingTitle.textContent = "Entering Hidden Maze...";
  loadingText.textContent = "Loading harder questions...";
  loadingFill.style.width = "0%";
  loadingModal.classList.add("active");

  playSound("click");

  let progress = 0;

  const steps = [
    "Opening secret path...",
    "Building confusing maze...",
    "Increasing fish speed...",
    "Loading advanced cyber questions...",
    "Activating hidden doors...",
    "Entering hidden level..."
  ];

  const interval = setInterval(() => {
    progress++;

    loadingFill.style.width = Math.min(100, Math.round((progress / steps.length) * 100)) + "%";
    loadingText.textContent = steps[progress - 1] || "Entering hidden level...";

    if (progress >= steps.length) {
      clearInterval(interval);

      setTimeout(() => {
        loadingModal.classList.remove("active");
        beginLevel();
      }, 300);
    }
  }, 750);
}

function skipHiddenLevel() {
  hiddenLevelModal.classList.remove("active");
  endGame(true, "main");
}

function moveEnemy() {
  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) return;

  const enemyCenter = center(enemy, enemy.size);
  const playerCenter = center(player, player.size);

  const dxToPlayer = playerCenter.x - enemyCenter.x;

  if (dxToPlayer > 0) enemyFacing = "right";
  if (dxToPlayer < 0) enemyFacing = "left";

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

  if (now - lastPathUpdate > 170 || enemyPath.length < 2) {
    enemyPath = findPath(cellOf(enemy, enemy.size), cellOf(player, player.size), false);
    lastPathUpdate = now;
  }

  if (!enemyPath || enemyPath.length < 2) return;

  const target = cellCenter(enemyPath[1]);
  const dx = target.x - enemyCenter.x;
  const dy = target.y - enemyCenter.y;
  const d = Math.hypot(dx, dy);

  if (dx > 0) enemyFacing = "right";
  if (dx < 0) enemyFacing = "left";

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

      score += activeLevel === "hidden" ? 12 : 5;

      toast.textContent = activeLevel === "hidden"
        ? "Shadow score collected. +12 score."
        : "Score coin collected. +5 score.";

      playSound("bonus");
      updateHud();
    }
  }
}

function checkCaught() {
  if (Date.now() < enemyFrozenUntil || finalPasswordLocked) return;

  const catchDistance = 22 + fishBuffLevel * 2 + (activeLevel === "hidden" ? 4 : 0);

  if (dist(center(player, player.size), center(enemy, enemy.size)) < catchDistance) {
    handlePlayerDeath(activeLevel === "hidden" ? "The shadow phishing fish caught you." : "The buffed phishing fish caught you.");
  }
}

function checkWin() {
  if (activeLevel === "main") return;

  if (doors.every(door => door.unlocked) && dist(center(player, player.size), cellCenter(currentExit)) < 32) {
    hiddenCompleted = true;
    endGame(true, "hidden");
  }
}

function getProgressDoorNumber() {
  const active = nextDoor();

  if (active) return active.id;

  return currentDoorCells.length;
}

function getEnemyReviveCell() {
  const progressDoor = getProgressDoorNumber();
  const targetDoorNumber = Math.max(1, progressDoor - 2);
  const targetDoor = doors[targetDoorNumber - 1];

  if (!targetDoor) return currentStart;

  return targetDoor.spawn || currentStart;
}

function getPlayerRespawnCell() {
  const unlocked = doors.filter(door => door.unlocked);

  if (!unlocked.length) return currentStart;

  return unlocked[unlocked.length - 1].spawn || currentStart;
}

function handlePlayerDeath(reason) {
  clearKeys();

  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  lastDeathReason = reason;

  if (revivesUsed >= MAX_REVIVES) {
    endGame(false, "dead", "No revives left. You used all 2 revives.");
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
    endGame(false, "dead", "Not enough Cyber Coins to revive.");
  }
}

function useRevive() {
  if (revivesUsed >= MAX_REVIVES) {
    reviveModal.classList.remove("active");
    endGame(false, "dead", "No revives left. You used all 2 revives.");
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
  playerMoving = false;

  clearKeys();

  toast.textContent = `Revived. Revives Used: ${revivesUsed}/${MAX_REVIVES}. Fish respawned 2 doors behind.`;

  playSound("bonus");
  updateHud();
  draw();

  resumeGame(false);
}

function refuseRevive() {
  reviveModal.classList.remove("active");
  endGame(false, "dead", lastDeathReason);
}

function saveRecords() {
  const record = {
    newScore: false,
    newTime: false
  };

  if (activeLevel === "main") {
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
  }

  return record;
}

function getBadge() {
  if (activeLevel === "hidden" && hiddenCompleted) return "🌑 Shadow Cyber Master";
  if (correctAnswers >= 14) return "🏆 Cyber Expert";
  if (correctAnswers >= 11) return "🥈 Cyber Defender";
  if (correctAnswers >= 8) return "🥉 Cyber Learner";
  return "🛡️ Cyber Beginner";
}

function endGame(won, source = "main", message = "") {
  clearKeys();

  running = false;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  stopOverallTimer();
  stopMusic();

  if (won) {
    const record = saveRecords();
    updateHud();

    endTitle.textContent = source === "hidden" ? "Hidden Level Completed" : "Final Result";
    playSound("bonus");

    endText.innerHTML = `
      <div class="result-grid">
        <div>Player</div><strong>${currentUser || "Guest"}</strong>
        <div>Level</div><strong>${source === "hidden" ? "Hidden Level" : "Main Level"}</strong>
        <div>Final Score</div><strong>${score}${record.newScore ? " ⭐ New Best" : ""}</strong>
        <div>Best Score</div><strong>${bestScore}</strong>
        <div>Time</div><strong>${formatTime(elapsed)}${record.newTime ? " ⭐ New Best" : ""}</strong>
        <div>Correct Answers</div><strong>${correctAnswers}/${questionsAnswered}</strong>
        <div>Wrong Answers</div><strong>${wrongAnswers}</strong>
        <div>Hints Used</div><strong>${hintsUsed}</strong>
        <div>Revives Used</div><strong>${revivesUsed} / ${MAX_REVIVES}</strong>
        <div>Cyber Coins Left</div><strong>${cyberCoins}</strong>
        <div>Fish Buff Level</div><strong>${fishBuffLevel}</strong>
        <div>Badge</div><strong>${getBadge()}</strong>
      </div>
      <p class="small-text">
        ${source === "hidden"
          ? "You survived the secret cyber maze and proved advanced cyber awareness."
          : "Strong cyber habits help you escape real online dangers. Think before you click."}
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
        <div>Level</div><strong>${activeLevel === "hidden" ? "Hidden Level" : "Main Level"}</strong>
        <div>Final Score</div><strong>${score}</strong>
        <div>Best Score</div><strong>${bestScore}</strong>
        <div>Time</div><strong>${formatTime(elapsed)}</strong>
        <div>Doors Completed</div><strong>${doors.filter(door => door.unlocked).length}/${doors.length}</strong>
        <div>Correct Answers</div><strong>${correctAnswers}/${questionsAnswered}</strong>
        <div>Wrong Answers</div><strong>${wrongAnswers}</strong>
        <div>Hints Used</div><strong>${hintsUsed}</strong>
        <div>Revives Used</div><strong>${revivesUsed} / ${MAX_REVIVES}</strong>
        <div>Badge</div><strong>${getBadge()}</strong>
      </div>
      <p class="small-text">Mistakes are part of learning. Try again and watch for cyber traps.</p>
    `;
  }

  endModal.classList.add("active");
}

function openCyberTips() {
  if (!tipsModal) return;

  tipsModal.classList.add("active");
  playSound("click");
}

function closeCyberTips() {
  if (!tipsModal) return;

  tipsModal.classList.remove("active");
  playSound("click");
}

function openFeedbackForm() {
  if (!feedbackModal) return;

  feedbackThanks.textContent = "";
  feedbackThanks.className = "small-text";

  if (manualFeedbackDownload) {
    manualFeedbackDownload.classList.add("hidden");
    manualFeedbackDownload.removeAttribute("href");
    manualFeedbackDownload.removeAttribute("download");
  }

  feedbackModal.classList.add("active");
  playSound("click");
}

function closeFeedbackForm() {
  if (!feedbackModal) return;

  feedbackModal.classList.remove("active");
  playSound("click");
}

function getCheckedRadioValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function getCheckedCheckboxValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(input => input.value);
}

function validateFeedbackForm() {
  const requiredRadioGroups = [
    "age",
    "knowledge",
    "fun",
    "fishStrong",
    "realLife",
    "better",
    "popup",
    "passwordBetter",
    "overallRating"
  ];

  for (const group of requiredRadioGroups) {
    if (!getCheckedRadioValue(group)) {
      return "Please answer all choice questions marked with * before submitting.";
    }
  }

  if (getCheckedCheckboxValues("keepPlaying").length === 0) {
    return "Please select at least one answer for what made you keep playing.";
  }

  return "";
}

function submitFeedbackForm() {
  console.log("Feedback submit button clicked.");

  const error = validateFeedbackForm();

  if (error) {
    feedbackThanks.textContent = error;
    feedbackThanks.className = "small-text feedback-error";

    if (manualFeedbackDownload) {
      manualFeedbackDownload.classList.add("hidden");
    }

    console.warn("Feedback validation stopped:", error);
    playSound("wrong");
    return;
  }

  const keepPlayingAnswers = getCheckedCheckboxValues("keepPlaying");
  const otherAnswer = $("keepPlayingOther").value.trim();

  if (otherAnswer) {
    keepPlayingAnswers.push("Other: " + otherAnswer);
  }

  const feedbackData = {
    playerName: currentUser || "Guest",
    submittedAt: new Date().toISOString(),

    gameResult: {
      level: activeLevel === "hidden" ? "Hidden Level" : "Main Level",
      score: score,
      bestScore: bestScore,
      time: formatTime(elapsed),
      health: health,
      cyberCoinsLeft: cyberCoins,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      hintsUsed: hintsUsed,
      revivesUsed: revivesUsed,
      fishBuffLevel: fishBuffLevel,
      badge: getBadge()
    },

    feedback: {
      age: getCheckedRadioValue("age"),
      knowledgeBefore: getCheckedRadioValue("knowledge"),
      funLevel: getCheckedRadioValue("fun"),
      keptPlayingBecause: keepPlayingAnswers,
      fishGettingStrongerEffect: getCheckedRadioValue("fishStrong"),
      realLifeCyberFeeling: getCheckedRadioValue("realLife"),
      betterAtSpottingScams: getCheckedRadioValue("better"),
      learningPopupHelp: getCheckedRadioValue("popup"),
      strongerPasswordAfterPlaying: getCheckedRadioValue("passwordBetter"),
      overallRating: getCheckedRadioValue("overallRating"),

      favouritePart: $("favouritePart").value.trim(),
      annoyingPart: $("annoyingPart").value.trim(),
      suggestedNewThing: $("newThing").value.trim()
    }
  };

  try {
    const savedFeedback = JSON.parse(localStorage.getItem("clickbaitFeedback") || "[]");
    savedFeedback.push(feedbackData);
    localStorage.setItem("clickbaitFeedback", JSON.stringify(savedFeedback));

    console.log("Feedback saved in localStorage:", feedbackData);
  } catch (error) {
    console.error("LocalStorage save failed:", error);
  }

  const safeUser = (currentUser || "guest")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_");

  const safeDate = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\./g, "-");

  const filename = `clickbait_feedback_${safeUser}_${safeDate}.json`;

  const fileContent = JSON.stringify(feedbackData, null, 2);
  const blob = new Blob([fileContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  if (manualFeedbackDownload) {
    manualFeedbackDownload.href = url;
    manualFeedbackDownload.download = filename;
    manualFeedbackDownload.textContent = "Download Feedback File";
    manualFeedbackDownload.classList.remove("hidden");
  }

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = filename;
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  feedbackThanks.textContent = "Thank you for playing. Feedback saved in browser. If it did not download automatically, click Download Feedback File.";
  feedbackThanks.className = "small-text feedback-success";

  console.log("Feedback download prepared:", filename);

  playSound("bonus");
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

  unlockAudio();
  playSound("click");

  setLevel("main");

  startModal.classList.remove("active");
  loadingModal.classList.add("active");

  loadingTitle.textContent = "Entering Cyber Maze...";
  loadingFill.style.width = "0%";
  loadingText.textContent = "Preparing doors...";

  let progress = 0;

  const loadingSteps = [
    "Preparing doors...",
    "Loading cyber questions...",
    "Starting fish AI...",
    "Checking password door...",
    "Activating wall collision system...",
    "Preparing score coins...",
    "Loading final password challenge...",
    "Entering maze..."
  ];

  const totalLoadingTime = 6000;
  const stepTime = totalLoadingTime / loadingSteps.length;

  const loadInterval = setInterval(() => {
    progress++;

    const percent = Math.min(100, Math.round((progress / loadingSteps.length) * 100));
    loadingFill.style.width = percent + "%";
    loadingText.textContent = loadingSteps[progress - 1] || "Entering maze...";

    if (progress >= loadingSteps.length) {
      clearInterval(loadInterval);

      setTimeout(() => {
        loadingModal.classList.remove("active");
        resetState(true);
        beginLevel();
      }, 300);
    }
  }, stepTime);
}

function beginLevel() {
  running = true;
  paused = false;
  elapsed = 0;
  startTime = Date.now();

  toast.textContent = activeLevel === "hidden"
    ? "Hidden level started. The fish is faster and questions are harder."
    : "Only the next door is shown. Answer carefully and survive.";

  startOverallTimer();
  startMusic();
  loop();
}

function pauseGame() {
  if (
    !running ||
    questionOpen ||
    passwordOpen ||
    endModal.classList.contains("active") ||
    hiddenLevelModal.classList.contains("active")
  ) {
    return;
  }

  clearKeys();

  paused = true;
  running = false;
  stopOverallTimer();

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  if (soundBtn) soundBtn.textContent = soundOn ? "Sound: On" : "Sound: Off";

  pauseModal.classList.add("active");
  playSound("click");
}

function resumeGame(closePause = true) {
  if (
    endModal.classList.contains("active") ||
    questionOpen ||
    passwordOpen ||
    reviveModal.classList.contains("active") ||
    finalAnimationModal.classList.contains("active") ||
    hiddenLevelModal.classList.contains("active") ||
    feedbackModal.classList.contains("active")
  ) {
    return;
  }

  clearKeys();

  if (closePause) pauseModal.classList.remove("active");

  paused = false;
  running = true;

  startOverallTimer();
  startMusic();

  if (!animationId) loop();
}

function closeAllModals() {
  [
    pauseModal,
    qModal,
    passwordModal,
    reviveModal,
    learningModal,
    hiddenLevelModal,
    endModal,
    loadingModal,
    tipsModal,
    feedbackModal,
    finalAnimationModal
  ].forEach(modal => {
    if (modal) modal.classList.remove("active");
  });

  if (finalAnimationVideo) {
    finalAnimationVideo.pause();
    finalAnimationVideo.currentTime = 0;
  }
}

function restartGame() {
  closeAllModals();

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  resetState(true);

  running = true;
  paused = false;
  elapsed = 0;
  startTime = Date.now();

  toast.textContent = activeLevel === "hidden"
    ? "Hidden level restarted. The fish is still fast."
    : "Restarted. Only the next door is visible.";

  startOverallTimer();
  startMusic();
  loop();
}

function exitGame() {
  closeAllModals();

  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  stopOverallTimer();
  stopMusic();
  clearKeys();

  setLevel("main");
  resetState(true);

  startModal.classList.add("active");
  goSetupPage(3);

  toast.textContent = "Exited game safely. You can start again from the menu.";
}

document.addEventListener("keydown", event => {
  const keyPressed = event.key.toLowerCase();
  const typing = isTypingTarget(event);

  if (passwordOpen && keyPressed === "enter" && !typing) {
    event.preventDefault();
    submitPasswordDoor();
    return;
  }

  if (!typing && ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(keyPressed)) {
    event.preventDefault();
  }

  if (!typing && keyPressed === "escape") {
    if (feedbackModal && feedbackModal.classList.contains("active")) {
      closeFeedbackForm();
      return;
    }

    if (tipsModal && tipsModal.classList.contains("active")) {
      closeCyberTips();
      return;
    }

    paused ? resumeGame(true) : pauseGame();
    return;
  }

  if (
    !typing &&
    !questionOpen &&
    !passwordOpen &&
    !paused &&
    !reviveModal.classList.contains("active") &&
    !startModal.classList.contains("active") &&
    !loadingModal.classList.contains("active") &&
    !tipsModal.classList.contains("active") &&
    !feedbackModal.classList.contains("active") &&
    !finalAnimationModal.classList.contains("active") &&
    !hiddenLevelModal.classList.contains("active")
  ) {
    keys[keyPressed] = true;
  }
});

document.addEventListener("keyup", event => {
  if (isTypingTarget(event)) return;
  keys[event.key.toLowerCase()] = false;
});

window.addEventListener("blur", clearKeys);

window.addEventListener("visibilitychange", () => {
  if (document.hidden) clearKeys();
});

passwordInput.addEventListener("input", updatePasswordChecks);
passwordConfirmInput.addEventListener("input", updatePasswordChecks);
registerPassword.addEventListener("input", updateRegisterStrength);

restoreLogin();
setLevel("main");
resetState(true);
updateRegisterStrength();

fishImg.onload = draw;
playerImg.onload = draw;
doorClosedImg.onload = draw;
doorOpenImg.onload = draw;

if (soundBtn) {
  soundBtn.textContent = soundOn ? "Sound: On" : "Sound: Off";
}
