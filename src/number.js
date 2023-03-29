// @author prisoner849

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CellularAutomata } from "./CellularAutomata";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
let n = 3;
let g = new THREE.IcosahedronGeometry(5, n);
let colors = [];
let c = new THREE.Vector3();
let uv = [];
let ca = new CellularAutomata(n);
console.log('face count', ca.faceCount);
const count = g.attributes.position.count;
console.log("count", count);
let max = ca.faceCount;
for (let i = 0; i < count; i++) {
    if (i % ca.facePerZone == 0) {
        c.random().multiplyScalar(0.5).addScalar(0.5);
    }
    colors.push(c.x, c.y, c.z, c.x, c.y, c.z, c.x, c.y, c.z);
    uv.push(
        (0.067 + i) / max, 0.25,
        (0.933 + i) / max, 0.25,
        (0.5 + i) / max, 1
    );
}
g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

let m = new THREE.MeshBasicMaterial({ vertexColors: true, map: makeNumbers() });
let o = new THREE.Mesh(g, m);
scene.add(o);


renderer.setAnimationLoop(_ => {
    renderer.render(scene, camera);
})

function makeNumbers() {
    let c = numbers;
    let ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = 'bold 10px Arial';

    let step = 20480 / max;
    let start = step * 0.5;

    for (let i = 0; i < max; i++) {
        ctx.fillText(i + 1, start + step * i, 32);
    }

    return new THREE.CanvasTexture(c);
}

ca.printNeigbors();


const caster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {

    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.offsetWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.offsetHeight) * 2 + 1;

    caster.setFromCamera(mouse, camera);

    const intersects = caster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        const intersection = intersects[0];

        const colorAttribute = intersection.object.geometry.getAttribute('color');
        const face = intersection.face;
        const i = face.a / 3 + 1;
        console.log(i, ca.getNeigbors(i), ca.getNeigborCount(colors, i));
        ca.computeNeigbors(i);
        const color = new THREE.Color(Math.random() * 0xff0000);

        colorAttribute.setXYZ(face.a, color.r, color.g, color.b);
        colorAttribute.setXYZ(face.b, color.r, color.g, color.b);
        colorAttribute.setXYZ(face.c, color.r, color.g, color.b);

        colorAttribute.needsUpdate = true;

    }

}

window.addEventListener("click", onClick, false);