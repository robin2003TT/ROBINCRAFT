let scene, camera, renderer, player;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false, isJumping = false;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);

    // Player (a cube)
    const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 1;
    scene.add(player);

    // Floor
    const floorTexture = new THREE.TextureLoader().load("assets/textures/grass_top.png");
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Load background music
    document.getElementById("bg-music").play();

    animate();
}

// Movement controls
document.addEventListener("keydown", (event) => {
    if (event.key === "w") moveForward = true;
    if (event.key === "s") moveBackward = true;
    if (event.key === "a") moveLeft = true;
    if (event.key === "d") moveRight = true;
    if (event.key === " " && !isJumping) {
        isJumping = true;
        player.position.y += 1;
        setTimeout(() => (isJumping = false), 500);
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w") moveForward = false;
    if (event.key === "s") moveBackward = false;
    if (event.key === "a") moveLeft = false;
    if (event.key === "d") moveRight = false;
});

// Mobile Controls
document.getElementById("move-forward").addEventListener("touchstart", () => (moveForward = true));
document.getElementById("move-forward").addEventListener("touchend", () => (moveForward = false));

document.getElementById("move-back").addEventListener("touchstart", () => (moveBackward = true));
document.getElementById("move-back").addEventListener("touchend", () => (moveBackward = false));

document.getElementById("move-left").addEventListener("touchstart", () => (moveLeft = true));
document.getElementById("move-left").addEventListener("touchend", () => (moveLeft = false));

document.getElementById("move-right").addEventListener("touchstart", () => (moveRight = true));
document.getElementById("move-right").addEventListener("touchend", () => (moveRight = false));

document.getElementById("jump").addEventListener("touchstart", () => {
    if (!isJumping) {
        isJumping = true;
        player.position.y += 1;
        setTimeout(() => (isJumping = false), 500);
    }
});

function animate() {
    requestAnimationFrame(animate);

    if (moveForward) player.position.z -= 0.1;
    if (moveBackward) player.position.z += 0.1;
    if (moveLeft) player.position.x -= 0.1;
    if (moveRight) player.position.x += 0.1;

    renderer.render(scene, camera);
}

init();
    
