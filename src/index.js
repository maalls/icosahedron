import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CellularAutomata } from "./CellularAutomata";
import { Impl1 } from "./implementation/Impl1";
import { Impl2 } from "./implementation/Impl2";
import { Impl3 } from "./implementation/Impl3";
import { Impl4 } from "./implementation/Impl4";
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
let impl = new Impl4();
let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 6;
const n = impl.n;

let g = new THREE.IcosahedronGeometry(5, n);
let colors = [];
let c = new THREE.Vector3();

const count = g.attributes.position.count;

let uv = [];
let ca = new CellularAutomata(n);
const max = ca.faceCount;



//col.setRGB(10, 0, 0);




let m;

function init() {
    colors = [];
    for (let i = 0; i < count / 3; i++) {

        colors.push(0, 0, 0, 0, 0, 0, 0, 0, 0);

    }
    let col = new THREE.Color();
    impl.init(ca, colors);

    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
}
init();
m = new THREE.MeshBasicMaterial({ vertexColors: true });



let o = new THREE.Mesh(g, m);
scene.add(o);

let play = false;

renderer.setAnimationLoop(_ => {
    renderer.render(scene, camera);
})

function update() {

    let newColors = [];

    if (impl.before != undefined) {
        impl.before();
    }

    for (let i = 1; i <= ca.faceCount; i++) {


        impl.update(ca, colors, newColors, i);

    }

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
        if (play) update();
    }

}

startAnimating(impl.fps);

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
let mousedownStart;
function onClick(event) {
    const d = new Date();
    //console.log(mousedownStart, d.getTime(), d.getTime() - mousedownStart);
    if (d.getTime() - mousedownStart > 300) return;
    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.offsetWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.offsetHeight) * 2 + 1;

    caster.setFromCamera(mouse, camera);

    const intersects = caster.intersectObjects(scene.children);

    if (intersects.length > 0) {



        const intersection = intersects[0];

        const colorAttribute = intersection.object.geometry.getAttribute('color');
        const face = intersection.face;
        const i = (face.a) / 3 + 1;

        if (impl.onClick != undefined) {
            impl.onClick(ca, colors, i);

            g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
            //m.needsUpdate = true;
        }
        else {

            console.log(i, 'col', ca.getColor(colors, i), ca.getNeigbors(i), ca.getNeigborCount(colors, i));
            //console.log(ca.computeNeigbors(i));


            const color = new THREE.Color(Math.random() * 0xff0000);

            colorAttribute.setXYZ(face.a, ca.getColor(colors, i), 0, 0);
            colorAttribute.setXYZ(face.b, ca.getColor(colors, i), 0, 0);
            colorAttribute.setXYZ(face.c, ca.getColor(colors, i), 0, 0);
        }
        colorAttribute.needsUpdate = true;

    }



}

window.addEventListener("mousedown", () => {
    const d = new Date();
    mousedownStart = d.getTime();
}, false);
window.addEventListener("click", onClick, false);



document.getElementById('player').onclick = (event) => {
    event.preventDefault();
    if (play) {
        play = false;
        document.getElementById('player').innerText = 'play';
    }
    else {
        play = true;
        document.getElementById('player').innerText = 'stop';
    }
}

document.getElementById('step').onclick = (event) => {
    event.preventDefault();
    update();
}


document.getElementById('reset').onclick = (event) => {
    init();
    m.needsUpdate = true;
}


if (impl.hasOwnProperty('getUiSetting')) {
    let uiSettings = impl.getUiSetting();
    if (uiSettings != undefined) {

        uiSettings.forEach(setting => {

            switch (setting.type) {

                case 'select':


            }
        });

    }
}
