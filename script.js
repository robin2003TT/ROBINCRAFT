const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = 400;

const player = { x: 100, y: 300, size: 30, color: "blue", speed: 5 };

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") player.x += player.speed;
    if (e.key === "ArrowLeft") player.x -= player.speed;
});

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
