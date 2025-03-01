import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load 3D Jewelry Model
const loader = new GLTFLoader();
loader.load('assets/KNITRENDER.glb', function (gltf) {
    const jewelry = gltf.scene;
    jewelry.position.set(0, 1, 0);
    scene.add(jewelry);

    function animate() {
        requestAnimationFrame(animate);
        jewelry.rotation.y += 0.01; // Floating effect
        renderer.render(scene, camera);
    }
    animate();
});

// Camera position
camera.position.z = 5;

// Zoom-in effect
document.addEventListener('click', () => {
    camera.position.z -= 2; // Moves closer on click
});
