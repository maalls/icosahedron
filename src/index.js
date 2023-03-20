import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'tween';
import { CellularAutomata } from "./CellularAutomata";


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
    colors.push(0, 0, 0, 0, 0, 0, 0, 0, 0);
    
}
let col = new THREE.Color();
//col.setRGB(10, 0, 0);
ca.setColor(colors, 1, 1);



g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
//g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

let m = new THREE.MeshBasicMaterial({ vertexColors: true });
let o = new THREE.Mesh(g, m);
scene.add(o);



renderer.setAnimationLoop(_ => {
    renderer.render(scene, camera);
})


function update() {

    let newColors = [];
    for (let i = 1; i <= ca.faceCount; i++) {

        let color = ca.getColor(colors, i);
        //console.log('col',ca.faceCount, i, color);
        // get the color value, divide by 4
        let newColor = color / 10 * 9;

        ca.getNeigbors(i).forEach(el => {
            newColor += ca.getColor(colors, el) / 10;
        });

        //c.set(newColor, 0, 0);
        ca.setColor(newColors, i, newColor);
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

update();
update();
update();
update();
update();
update();
update();
update();
update();
update();
update();
