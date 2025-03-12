let scene, camera, renderer, controls;
let world = [];

function init() {
    // Create Scene
    scene = new THREE.Scene();

    // Camera Setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Renderer Setup
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    light.castShadow = true;
    scene.add(light);

    // Load Textures
    const loader = new THREE.TextureLoader();
    const dirtTexture = loader.load("dirt_texture.png");
    const grassTexture = loader.load("grass_texture.png");

    // Create Ground
    for (let x = -5; x < 5; x++) {
        for (let z = -5; z < 5; z++) {
            let texture = Math.random() > 0.5 ? dirtTexture : grassTexture; // Randomize block textures
            let block = createBlock(x, -0.5, z, texture);
            world.push(block);
        }
    }

    // Orbit Controls (Allows Mouse Movement)
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    animate();
}

// Function to Create Blocks
function createBlock(x, y, z, texture) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshStandardMaterial({ map: texture });
    let block = new THREE.Mesh(geometry, material);
    block.position.set(x, y, z);
    block.castShadow = true;
    block.receiveShadow = true;
    scene.add(block);
    return block;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Movement Controls
document.getElementById("moveForward").addEventListener("click", () => {
    camera.position.z -= 0.5;
});
document.getElementById("moveBackward").addEventListener("click", () => {
    camera.position.z += 0.5;
});
document.getElementById("moveLeft").addEventListener("click", () => {
    camera.position.x -= 0.5;
});
document.getElementById("moveRight").addEventListener("click", () => {
    camera.position.x += 0.5;
});
document.getElementById("jump").addEventListener("click", () => {
    camera.position.y += 1;
    setTimeout(() => camera.position.y -= 1, 200);
});

init();
