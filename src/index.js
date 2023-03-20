import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'tween';
import { CellularAutomata  } from "./CellularAutomata";


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

const n = 3;
let g = new THREE.IcosahedronGeometry(5, n);
let colors = [];
let c = new THREE.Vector3();
let uv = [];
const count = g.attributes.position.count;
const max = count / 3;
console.log("face", max, count / 3);
c.random().multiplyScalar(0.5).addScalar(0.5);

let ca = new CellularAutomata(n);


for (let i = 0; i < count / 3; i++) {
    if (i % ca.facePerZone + 1 == 1) {
        c.random().multiplyScalar(0.5).addScalar(0.5);
    }
    colors.push(0,0,0,0,0,0,0,0,0);
    uv.push(
        (0.067 + i) / max, 0.25,
        (0.933 + i) / max, 0.25,
        (0.5 + i) / max, 1
    );
}
c.set(10,0,0);
ca.setColor(colors, 1, c);

g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
//g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

let m = new THREE.MeshBasicMaterial({  vertexColors: true });
let o = new THREE.Mesh(g, m);
scene.add(o);
console.log(m.map);

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
    let step = 8192 / max;
    let start = step * 0.5;

    for (let i = 0; i < count; i++) {
        //console.log("processing ", i);
        ctx.fillText(i + 1, start + step * i, 32);
    }

    return new THREE.CanvasTexture(c);
}

function update() {

    let newColors = [];
    for(let i = 1; i <= ca.faceCount; i++) {

        let  color = ca.getColor(colors, i);
        //console.log('col',ca.faceCount, i, color);
        // get the color value, divide by 4
        let newColor = Math.round(color * 0.95);

        c.set(newColor, 0, 0);
        ca.setColor(newColors, i, c);
        /*let neighbors = ca.getNeigbors(i);
        neighbors.push(i);
        neighbors.forEach(el => {
            c.set(newColor, 0, 0);
            console.log('setting new color', i, c.x);
            ca.setColor(newColors, el, c);
        });*/

    }
    console.log("colors", colors);
    console.log('new colors', newColors);

    //ca.setColors(colors, ind++, c);
    g.setAttribute("color", new THREE.Float32BufferAttribute(newColors, 3));
    m.needsUpdate = true;
    colors = newColors;
}

const animate = (t) => {
    //console.log("u");


    update();
    
    //TWEEN.update(t);
    window.requestAnimationFrame(animate);
}

//animate();

//update();
//update();
