const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player setup
let player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 40,
    height: 60,
    color: "blue",
    velocityY: 0,
    speed: 5,
    jumping: false
};

// Movement keys
let keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

// Event Listeners for PC
window.addEventListener("keydown", (e) => {
    if (e.key in keys) keys[e.key] = true;
    if (e.key === " ") jump();
});

window.addEventListener("keyup", (e) => {
    if (e.key in keys) keys[e.key] = false;
});

// Mobile Controls
document.getElementById("moveLeft").addEventListener("touchstart", () => keys.a = true);
document.getElementById("moveLeft").addEventListener("touchend", () => keys.a = false);
document.getElementById("moveRight").addEventListener("touchstart", () => keys.d = true);
document.getElementById("moveRight").addEventListener("touchend", () => keys.d = false);
document.getElementById("moveUp").addEventListener("touchstart", () => keys.w = true);
document.getElementById("moveUp").addEventListener("touchend", () => keys.w = false);
document.getElementById("moveDown").addEventListener("touchstart", () => keys.s = true);
document.getElementById("moveDown").addEventListener("touchend", () => keys.s = false);
document.getElementById("jump").addEventListener("touchstart", jump);

// Jump Function
function jump() {
    if (!player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
}

// Game Loop
function update() {
    // Gravity
    player.velocityY += 0.5;
    player.y += player.velocityY;

    // Movement
    if (keys.a) player.x -= player.speed;
    if (keys.d) player.x += player.speed;
    if (keys.w) player.y -= player.speed;
    if (keys.s) player.y += player.speed;

    // Collision with ground
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.jumping = false;
    }

    draw();
    requestAnimationFrame(update);
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Start Game
update();
