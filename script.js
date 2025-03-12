// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// Load Textures
const textureLoader = new THREE.TextureLoader();
const dirtTexture = textureLoader.load("assets/textures/dirt.png");
const grassTopTexture = textureLoader.load("assets/textures/grass_top.png");

// Block Material
const dirtMaterial = new THREE.MeshBasicMaterial({ map: dirtTexture });
const grassMaterial = [
    dirtMaterial, dirtMaterial, 
    new THREE.MeshBasicMaterial({ map: grassTopTexture }), 
    dirtMaterial, dirtMaterial, dirtMaterial
];

// Create Blocks (Terrain)
for (let x = -5; x < 5; x++) {
    for (let z = -5; z < 5; z++) {
        const block = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), grassMaterial);
        block.position.set(x, -0.5, z);
        scene.add(block);
    }
}

// Player Controls
const player = new THREE.Object3D();
player.position.y = 1;
scene.add(player);
camera.position.set(0, 2, 5);
camera.lookAt(player.position);

// Movement
const keys = { w: false, s: false, a: false, d: false };
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

function movePlayer() {
    if (keys.w) player.position.z -= 0.1;
    if (keys.s) player.position.z += 0.1;
    if (keys.a) player.position.x -= 0.1;
    if (keys.d) player.position.x += 0.1;
    camera.position.set(player.position.x, player.position.y + 2, player.position.z + 5);
    camera.lookAt(player.position);
}

// Game Loop
function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    renderer.render(scene, camera);
}
animate();
