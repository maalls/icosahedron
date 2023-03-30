export class Impl4 {
    constructor() {
        this.fps = 4;
        this.n = 10;

        this.ui = {
            name: "Debug"
        }
    }
    onClick(ca, colors, i) {
        console.log(i, ca.getNeigbors(i));
    }

    init(ca, colors) {
        this.current = 0;
        this.currentNeihbors = [];
        return;
    }

    
    loop(ca, colors, newColors) {

        this.current++;
        console.log("current", this.current);
        for(let i = 1; i <= ca.faceCount; i++) {
            ca.setColor(newColors, i, 0);
        }
        

        ca.setColorRGB(newColors, this.current, 0, 1, 0);
        let neighbors = ca.getNeigbors(this.current);
        neighbors.forEach(element => {
            ca.setColor(newColors, element, 1);
        });
        
    }
    update(ca, colors, newColors, i) {

        let neighbors = ca.getNeigbors(i);
        //console.log('check', i, this.current, neighbors);
        if(neighbors.includes(this.current)) {
            
            ca.setColor(newColors, i, 1);
        }
        else {
            ca.setColor(newColors, i, 0);
        }
    }
}