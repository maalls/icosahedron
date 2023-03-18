console.clear();
console.log("start",document.body);
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 8, 13).setLength(10);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x404040);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let g = new THREE.IcosahedronGeometry(5, 1)

const count = g.attributes.position.count;
const color = new THREE.Color();


g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
const colors1 = g.attributes.color;

const names = ['blue', 'red', 'green', 'orange', 'yellow', 'darkblue', 'white', 'indigo', 'violet', 'brown'];
for (let i = 0; i < (30 / 3); i++) {
    color.setColorName(names[i]);
    colors1.setXYZ(i * 3 + 0, color.r, color.g, color.b);
    colors1.setXYZ(i * 3 + 1, color.r, color.g, color.b);
    colors1.setXYZ(i * 3 + 2, color.r, color.g, color.b);
}

let m = new THREE.MeshLambertMaterial({
    vertexColors: true,
});
let o = new THREE.Mesh(g, m);
scene.add(o);

renderer.setAnimationLoop(_ => {
    renderer.render(scene, camera);
})