import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const zoneMap = {
    1: [5,2,7], // left, right, bottom
    2: [1,3,6],
    3: [2,4,10],
    4: [3,5,9],
    5: [4,1,8],
    6: [2,20, 16],
    7: [1, 16, 17],
    8: [5,17,18],
    9: [4,18,19],
    10: [3, 19, 20],
    11: [15,12,16],
    12: [11,13,17],
    13: [12,14,18],
    14: [13,15,19],
    15: [14,11,20],
    16: [11,7,6],
    17: [12,8,7],
    18: [13,6,8],
    19: [14,10,9],
    20: [15,6,10]
}

class CellularAutomata {
    constructor(n) {
        this.facePerZone = (n + 1) * (n + 1);
        this.faceCount = this.facePerZone * this.facePerZone;
        this.baseSize = 1 + 2 * n;
        this.zoneHeight = 0;
        let diff = this.facePerZone;
        let rowSize = this.baseSize;
        while (diff > 0) {
            this.zoneHeight++;
            diff = diff - rowSize;
            rowSize = rowSize - 2;
        }
        console.log("height", this.zoneHeight);

    }
    isInRegularZone(zone) {
        // zone 1 to 5 and 11 to 15 are called regular because they are adjacent to a pole
        return this.zone <= 5 || (this.zone > 10 && this.zone <=15);
    }

    getNeigbors(i) {
        this.zone = Math.floor((i - 1) / this.facePerZone) + 1;
        this.subIndex = i - (this.zone - 1) * this.facePerZone;
        let diff = this.subIndex;
        this.levelSize = this.baseSize;
        this.level = 0;
        this.levelIndex = this.subIndex;
        while (diff > 0) {
            this.level++;
            diff -= this.levelSize;
            if (this.levelIndex - this.levelSize > 0) {
                this.levelIndex = this.levelIndex - this.levelSize;
                this.levelSize -= 2;
            }



        }
        let neighbors = [];
        let isOnLeft = null;
        let isOnRight = null;
        let isOnBottom = null;
        if (this.levelIndex == 1) {
            isOnLeft = true;
        }
        else {
            isOnLeft = false;
        }

        if (this.level == 1) {
            isOnBottom = true;
        }
        else {
            isOnBottom = false;
        }

        if (this.levelSize == this.levelIndex) {
            isOnRight = true;
        }
        else {
            isOnRight = false;
        }

        let leftNeighbor = 0;
        let rightNeighbor = null;
        let bottomNeighbor = null;

        // we will solve the ones on the left border, then right border, then bottom border
        // the for the one inside

        if(isOnRight) {

            // bottom
            let target = zoneMap[this.zone][2];
            if(this.isInRegularZone(this.zone)) {
                bottomNeighbor = (target - 1) * this.facePerZone + (this.baseSize - 2*this.level + 2);
            }
            else {
                bottomNeighbor = (target - 1) * this.facePerZone;
                // get the inverse level i.e. level 1 will be top level
                let targetLevel = this.zoneHeight - this.level + 1;
                console.log("tl", i, targetLevel);
                let s = this.baseSize;
                for(let j = 0; j < targetLevel; j++) {
                    bottomNeighbor += s;
                    s = s - 2;
                }

            }
            console.log('t', this.zone, i, bottomNeighbor);
        }
        else if (isOnLeft) {
            // calculate the bottom neighbor
            if(!isOnBottom) {

                //console.log('test', i, this.levelSize);
                bottomNeighbor = i - (this.levelSize + 2) + 1;

            }
            else {
                let target = zoneMap[this.zone][0];

                if(this.isInRegularZone(this.zone)) {
                    
                    bottomNeighbor = (target - 1) * this.facePerZone + 1;
                }
                else {
                    
                    bottomNeighbor = target  * this.facePerZone;
                }

                

            }

            // calculation of right neighbor (done)
            if(this.level < this.zoneHeight) {
                rightNeighbor = i + 1;
            }
            else {
                if(this.isInRegularZone(this.zone)) {
                    rightNeighbor = (zoneMap[this.zone][2] - 1) * this.facePerZone + 1;
                }
                else {
                    rightNeighbor = (zoneMap[this.zone][2] - 1) * this.facePerZone + this.baseSize;
                }
                
                
                //console.log(this.zone, i, rightNeighbor);
            }

            
            // calculation of left neighbor (done)
            let target = zoneMap[this.zone][1];
            if (this.isInRegularZone(this.zone)) {
                leftNeighbor = (target - 1) * this.facePerZone + 1 + 2 * (this.level - 1);

            }
            else {
                
                leftNeighbor = (target - 1) * this.facePerZone + 1;
                let targetLevel = this.zoneHeight - this.level;
                let facePerRow = this.baseSize;
                for (let j = 0; j < targetLevel; j++) {
                    leftNeighbor += facePerRow;
                    facePerRow -= 2;
                }
                
            }

        }
        else {
            leftNeighbor = i - 1;
        }


        //console.log(i, leftNeighbor, rightNeighbor, bottomNeighbor);
        //console.log(i, this.zone, this.subIndex, this.level, this.levelSize, this.levelIndex, isOnBottom, isOnLeft, isOnRight, leftNeighbor);
    }

    

    isInLeftBorder(i) {

    }

}


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
/*

0 -> 1
1 -> 4 2x2

3
1

2 -> 9 3x3

5
3
1

3 -> 16 4x4

7
5
3
1

4 -> 25 5x5

9
7
5
3
1

5 -> 36

11
9
7
5
3
1

number of triangles per triangle
n -> (n+1)^2



0 -> 20
1 -> 80

total number of triangle
n -> 20 * (n+1)^2

*/
const n = 2;
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
    ca.getNeigbors(i + 1);
}

for (let i = 0; i < count; i++) {
    if (i % ca.facePerZone + 1 == 1) {
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

let m = new THREE.MeshBasicMaterial({  vertexColors: true, map: makeNumbers() });
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
    let step = 8192 / max;
    let start = step * 0.5;

    for (let i = 0; i < count; i++) {
        //console.log("processing ", i);
        ctx.fillText(i + 1, start + step * i, 32);
    }

    return new THREE.CanvasTexture(c);
}




