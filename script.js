// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const loader = new THREE.TextureLoader();
const dirtTexture = loader.load('assets/textures/dirt.png');
const grassTopTexture = loader.load('assets/textures/grass_top.png');

// Create a ground made of blocks
const blockSize = 1;
const ground = new THREE.Group();

for (let x = -5; x < 5; x++) {
    for (let z = -5; z < 5; z++) {
        const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
        const materials = [
            new THREE.MeshBasicMaterial({ map: dirtTexture }), // Left
            new THREE.MeshBasicMaterial({ map: dirtTexture }), // Right
            new THREE.MeshBasicMaterial({ map: grassTopTexture }), // Top
            new THREE.MeshBasicMaterial({ map: dirtTexture }), // Bottom
            new THREE.MeshBasicMaterial({ map: dirtTexture }), // Front
            new THREE.MeshBasicMaterial({ map: dirtTexture })  // Back
        ];
        const cube = new THREE.Mesh(geometry, materials);
        cube.position.set(x * blockSize, -0.5, z * blockSize);
        ground.add(cube);
    }
}

scene.add(ground);

// Camera position
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

// Player controls
const playerSpeed = 0.1;
const keys = {};

document.addEventListener('keydown', (event) => { keys[event.key] = true; });
document.addEventListener('keyup', (event) => { keys[event.key] = false; });

function updatePlayer() {
    if (keys['w']) camera.position.z -= playerSpeed;
    if (keys['s']) camera.position.z += playerSpeed;
    if (keys['a']) camera.position.x -= playerSpeed;
    if (keys['d']) camera.position.x += playerSpeed;
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    updatePlayer();
    renderer.render(scene, camera);
}

animate();
