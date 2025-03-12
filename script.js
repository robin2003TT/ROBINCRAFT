let scene, camera, renderer, controls;
let world = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting & Shadows
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    light.castShadow = true;
    scene.add(light);

    // Ground Generation
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

    for (let x = -5; x < 5; x++) {
        for (let z = -5; z < 5; z++) {
            let block = new THREE.Mesh(geometry, material);
            block.position.set(x, -0.5, z);
            scene.add(block);
            world.push(block);
        }
    }

    camera.position.y = 2;
    camera.position.z = 5;

    animate();
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Controls
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
    camera.position.y += 0.5;
    setTimeout(() => camera.position.y -= 0.5, 200);
});

init();
