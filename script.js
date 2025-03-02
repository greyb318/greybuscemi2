// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load(
    'https://greyb318.github.io/greybuscemi2/KNITRENDER.glb', // Replace with your actual URL
    function (gltf) {
        console.log("Model loaded successfully!");
        const jewelry = gltf.scene;
        jewelry.position.set(0, 1, 0);
        scene.add(jewelry);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            jewelry.rotation.y += 0.01; // Rotate
            jewelry.position.y = 1 + Math.sin(Date.now() * 0.002) * 0.2; // Floating effect
            renderer.render(scene, camera);
        }
        animate();
    },
    undefined,
    function (error) {
        console.error("Error loading model:", error);
    }
);

// Set camera position
camera.position.set(0, 1, 5);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
