import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Load 3D Jewelry Model from GitHub root directory
const loader = new GLTFLoader();
loader.load('https://greyb318.github.io/greybuscemi2/KNITRENDER.glb', function (gltf) {
    const jewelry = gltf.scene;
    jewelry.position.set(0, 1, 0);
    scene.add(jewelry);

    // Animate floating effect
    function animate() {
        requestAnimationFrame(animate);
        jewelry.rotation.y += 0.01; // Rotate
        jewelry.position.y = 1 + Math.sin(Date.now() * 0.002) * 0.2; // Float up & down
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error("Error loading model:", error);
});

// Camera positioning
camera.position.set(0, 1, 5);

// Zoom-in effect
document.addEventListener('click', () => {
    if (camera.position.z > 2) {
        camera.position.z -= 1; // Moves closer on click
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
