import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CellularAutomata } from "./CellularAutomata";
import { Impl1 } from "./implementation/Impl1";
import { Impl2 } from "./implementation/Impl2";
import { Impl3 } from "./implementation/Impl3";
import { Impl4 } from "./implementation/Impl4";
import { Impl5 } from "./implementation/Impl5";
const impls = [new Impl5(), new Impl1(), new Impl2(), new Impl3(), new Impl4()];

const params = new URLSearchParams(window.location.search);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let implIndex = params.has('impl') ? params.get('impl'): 0;

let impl = impls[implIndex];
let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 6;
const n = impl.n;

let g = new THREE.IcosahedronGeometry(5, n);
let colors = [];
let c = new THREE.Vector3();

const count = g.attributes.position.count;

let ca = new CellularAutomata(n);


let m;

function init() {
    colors = [];
    let k = 0;
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

let play = params.has('autoplay') && parseInt(params.get('autoplay')) ? true : false;
console.log('autoplay', params.get('autoplay'));
renderer.setAnimationLoop(_ => {
    renderer.render(scene, camera);
})

let undo = [];
let undoPosition = 0;
let undoSize = 30;
let undoMax = 0;
function update() {

    let newColors = [];

    if (impl.before != undefined) {
        impl.before();
    }

    if (impl.loop != undefined) {
        impl.loop(ca, colors, newColors);
    }
    else {
        for (let i = 1; i <= ca.faceCount; i++) {
            impl.update(ca, colors, newColors, i);

        }
    }

    g.setAttribute("color", new THREE.Float32BufferAttribute(newColors, 3));
    m.needsUpdate = true;
    undo[undoPosition] = colors;
    undoPosition = (undoPosition + 1) % undoSize;
    undoMax++;
    //console.log(historyPosition, history);
    colors = newColors;

}

function doUndo() {
    
    if(undoMax == 0) return;

    undoPosition = (undoMax + undoPosition - 1) % undoMax;
    colors = undo[undoPosition];
    //console.log("colors", colors);
    undoMax--;
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    m.needsUpdate = true;
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
    fpsInterval = 1000 / impl.fps;
    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        if (play) update();
    }

}

startAnimating(impl.fps);

const caster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let mousedownStart;
function onClick(event) {

    event.preventDefault();
    const d = new Date();
    //console.log(mousedownStart, d.getTime(), d.getTime() - mousedownStart);
    if (d.getTime() - mousedownStart > 300) return;


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

document.getElementById('player').innerText = play? 'stop' : 'play';
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

document.getElementById('undo').onclick = (event) => {
    event.preventDefault();
    doUndo();
}
document.getElementById('controller').onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
}

document.getElementById('reset').onclick = (event) => {
    init();
    m.needsUpdate = true;
}

const implSelect = document.createElement('select');


impls.forEach((impl, key) => {
    console.log(impl);
    const option = document.createElement('option');
    option.value = key;
    option.innerHTML = impl.ui.name;
    if(key == implIndex) {
        option.selected = "selected";
    }
    implSelect.appendChild(option);
});
implSelect.onchange = function(event) {
    console.log(this.selectedIndex);
    impl = impls[this.selectedIndex];
    params.set('impl', this.selectedIndex);
    var newRelativePathQuery = window.location.pathname + '?' + params.toString();
    history.pushState(null, '', newRelativePathQuery);

    init();
}
document.getElementById('impl-settings').appendChild(implSelect);

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
