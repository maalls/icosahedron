
import * as THREE from "three";

import { CellularAutomata } from "./CellularAutomata";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class Engine {
    constructor() {
        this.isPlaying = false;
    }
    setImplementation(implementation) {
        this.implementation = implementation;
    }
    setRenderer(renderer) {
        this.renderer = renderer;
    }
    play() {
        this.isPlaying = true;
    }
    pause() {
        this.isPlaying = false;
    }
    init() {

        let renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x404040);
        renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(renderer.domElement);
        let impl = this.implementation;

        const n = impl.n;

        this.g = new THREE.IcosahedronGeometry(5, n);
        
        this.reset();



        
        let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
        camera.position.set(0, 10, 10);

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 6;

        let scene = new THREE.Scene();
        this.m = new THREE.MeshBasicMaterial({ vertexColors: true });
        let o = new THREE.Mesh(this.g, this.m);
        scene.add(o);
        renderer.setAnimationLoop(_ => {
            renderer.render(scene, camera);
        })

        this.undos = [];
        this.undoPosition = 0;
        this.undoSize = 30;
        this.undoMax = 0;

        

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
                if (this.isPlaying) this.update();
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
                    impl.onClick(this.ca, colors, i);

                    this.g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
                    //m.needsUpdate = true;
                }
                else {

                    console.log(i, 'col', this.ca.getColor(colors, i), this.ca.getNeigbors(i), this.ca.getNeigborCount(colors, i));
                    //console.log(ca.computeNeigbors(i));
                    const color = new THREE.Color(Math.random() * 0xff0000);
                    colorAttribute.setXYZ(face.a, this.ca.getColor(colors, i), 0, 0);
                    colorAttribute.setXYZ(face.b, this.ca.getColor(colors, i), 0, 0);
                    colorAttribute.setXYZ(face.c, this.ca.getColor(colors, i), 0, 0);
                }
                colorAttribute.needsUpdate = true;

            }



        }

        window.addEventListener("mousedown", () => {
            const d = new Date();
            mousedownStart = d.getTime();
        }, false);
        window.addEventListener("click", onClick, false);

    }

    reset() {

        this.colors = [];
        let c = new THREE.Vector3();

        const count = this.g.attributes.position.count;

        this.ca = new CellularAutomata(this.implementation.n);
        
        let k = 0;
        for (let i = 0; i < count / 3; i++) {

            this.colors.push(0, 0, 0, 0, 0, 0, 0, 0, 0);


        }
        let col = new THREE.Color();
        this.implementation.init(this.ca, this.colors);
        this.g.setAttribute("color", new THREE.Float32BufferAttribute(this.colors, 3));

    }

    update() {

        let newColors = [];
        let impl = this.implementation;
        if (impl.before != undefined) {
            impl.before();
        }

        if (impl.loop != undefined) {
            impl.loop(this.ca, this.colors, newColors);
        }
        else {
            for (let i = 1; i <= this.ca.faceCount; i++) {
                impl.update(this.ca, this.colors, newColors, i);

            }
        }

        this.g.setAttribute("color", new THREE.Float32BufferAttribute(newColors, 3));
        this.m.needsUpdate = true;
        this.undos[this.undoPosition] = this.colors;
        this.undoPosition = (this.undoPosition + 1) % this.undoSize;
        this.undoMax++;
        //console.log(historyPosition, history);
        this.colors = newColors;

    }

    undo() {

        if (this.undoMax == 0) return;

        this.undoPosition = (this.undoMax + this.undoPosition - 1) % this.undoMax;
        this.colors = this.undos[this.undoPosition];
        //console.log("colors", colors);
        this.undoMax--;
        this.g.setAttribute("color", new THREE.Float32BufferAttribute(this.colors, 3));
        this.m.needsUpdate = true;
    }

}

