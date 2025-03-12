let scene, camera, renderer, player;
let keys = { w: false, a: false, s: false, d: false };
let moveSpeed = 0.1;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ground (Grass Texture)
    let textureLoader = new THREE.TextureLoader();
    let groundTexture = textureLoader.load('assets/textures/grass.png');
    let groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });

    let groundGeometry = new THREE.PlaneGeometry(100, 100);
    let ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Player (Cube)
    let playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    let playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 1;
    scene.add(player);

    camera.position.set(0, 5, 10);

    // Mouse Look Controls
    document.addEventListener('mousemove', (event) => {
        let x = event.movementX * 0.002;
        let y = event.movementY * 0.002;
        camera.rotation.y -= x;
        camera.rotation.x -= y;
    });

    animate();
}

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 'a') keys.a = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'd') keys.d = true;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 'a') keys.a = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'd') keys.d = false;
});

// Mobile Controls
function move(direction) {
    if (direction === 'up') player.position.z -= moveSpeed;
    if (direction === 'down') player.position.z += moveSpeed;
    if (direction === 'left') player.position.x -= moveSpeed;
    if (direction === 'right') player.position.x += moveSpeed;
}

function jump() {
    player.position.y += 1;
    setTimeout(() => player.position.y -= 1, 300);
}

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    if (keys.w) player.position.z -= moveSpeed;
    if (keys.a) player.position.x -= moveSpeed;
    if (keys.s) player.position.z += moveSpeed;
    if (keys.d) player.position.x += moveSpeed;

    camera.lookAt(player.position);
    renderer.render(scene, camera);
}

// Background Music
let music = document.getElementById('bg-music');
music.volume = 0.2;

init();
