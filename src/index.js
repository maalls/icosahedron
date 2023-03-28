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

const n = 20;
const fps = 1;
let g = new THREE.IcosahedronGeometry(5, n);
let colors = [];
let c = new THREE.Vector3();

const count = g.attributes.position.count;

let uv = [];
let ca = new CellularAutomata(n);
const max = ca.faceCount;


for (let i = 0; i < count / 3; i++) {

    colors.push(0, 0, 0, 0, 0, 0, 0, 0, 0);

}
let col = new THREE.Color();
//col.setRGB(10, 0, 0);

let pop = Math.floor(ca.faceCount / 4);
let done = [];
let j;
for (let i = 1; i <= pop; i++) {
    do {
        j = 1 + Math.floor(Math.random() * ca.faceCount);
    }
    while (done.includes(j));
    done.push(j);
    ca.setColor(colors, j, 1);
}

g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
let m;
let showNumber = false;
if (showNumber) {

    for (let i = 0; i < count / 3; i++) {

        uv.push(
            (0.067 + i) / max, 0.25,
            (0.933 + i) / max, 0.25,
            (0.5 + i) / max, 1
        );

    }
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

    m = new THREE.MeshBasicMaterial({ vertexColors: true, map: makeNumbers() });
}
else {
    m = new THREE.MeshBasicMaterial({ vertexColors: true });
}


let o = new THREE.Mesh(g, m);
scene.add(o);



renderer.setAnimationLoop(_ => {
    renderer.render(scene, camera);
})


function update() {

    //console.log('coll', ca.getColor(colors, 1));
    //console.log(colors);
    let newColors = [];
    for (let i = 1; i <= ca.faceCount; i++) {

        let color = ca.getColor(colors, i);
        let neighbor = ca.getNeigborCount(colors, i);
        //console.log(i, neighbor);
        if (neighbor == 0 || neighbor == 3) {

            ca.setColor(newColors, i, 0);

        }
        else if (neighbor == 2) {

            ca.setColor(newColors, i, 1);

        }

        else {
            ca.setColor(newColors, i, color);
        }
        //console.log('col',ca.faceCount, i, color);
        // get the color value, divide by 4
        //let newColor = color / 10 * 8;

        //ca.getNeigbors(i).forEach(el => {
        //    newColor += ca.getColor(colors, el) / 10;
        //});
        //ca.setColor(newColors, i, newColor);


    }
    //console.log("colors", colors);
    //console.log('new colors', newColors);

    //ca.setColors(colors, ind++, c);
    g.setAttribute("color", new THREE.Float32BufferAttribute(newColors, 3));
    m.needsUpdate = true;
    colors = newColors;

}

var fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}


const animate = (t) => {
    //console.log("u");

    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        update();
    }

}

startAnimating(fps);

//update();
//update();
//update();
/*update();
update();
update();
update();
update();
update();
update();
update();
*/


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
        const i = face.a / 3;
        console.log(i, ca.getNeigbors(i), ca.getNeigborCount(colors, i));
        console.log(ca.computeNeigbors(i));
        const color = new THREE.Color(Math.random() * 0xff0000);

        colorAttribute.setXYZ(face.a, color.r, color.g, color.b);
        colorAttribute.setXYZ(face.b, color.r, color.g, color.b);
        colorAttribute.setXYZ(face.c, color.r, color.g, color.b);

        colorAttribute.needsUpdate = true;

    }

}

window.addEventListener("click", onClick, false);