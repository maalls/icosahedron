export class Impl4 {
    constructor() {
        this.fps = 4;
        this.n = 10;

        this.ui = {
            name: "Debug"
        }
    }
    onClick(ca, i) {
        console.log(i, ca.getNeigbors(i));
    }

    init(ca) {
        this.current = 0;
        this.currentNeihbors = [];
        return;
    }

    
    loop(ca) {

        this.current++;
        console.log("current", this.current);
        for(let i = 1; i <= ca.faceCount; i++) {
            ca.setColor(i, 0);
        }
        

        ca.setColorRGB(this.current, 0, 1, 0);
        let neighbors = ca.getNeigbors(this.current);
        neighbors.forEach(element => {
            ca.setColor(element, 1);
        });
        
    }
    step(ca, i) {

        let neighbors = ca.getNeigbors(i);
        //console.log('check', i, this.current, neighbors);
        if(neighbors.includes(this.current)) {
            
            ca.setColor(i, 1);
        }
        else {
            ca.setColor(i, 0);
        }
    }
}