export class Impl5 {
    constructor() {
        this.fps = 12;
        this.n = 200;

        this.ui = {
            name: "Rock Paper Scisor"
        }

        this.walls = [];
    }

    
    onClick(ca, i) {
        console.log("click", ca);
        let ind = this.walls.indexOf(i);
        if(ind >= 0) {
            ca.setColorRGB(i, 0, 0, 0);
            this.walls.splice(ind, 1);
        }
        else {
            let color = ca.getColorRGB(i);
            let ind = color.indexOf(1);
            if(ind == -1) {
                ca.setColorRGB(i, 1,0,0);
            }
            else if(ind == 0) {
                ca.setColorRGB(i, 0, 1, 0);
            }
            else if(ind == 1) {
                ca.setColorRGB(i, 0, 0, 1);
            }
            else if(ind == 2) {
                //ca.setColorRGB(i, 0, 0, 0);
                this.walls.push(i);
                ca.setColorRGB(i, 1,0,1);
            }
        }

    }

    init(ca) {
        
        for(let i = 1; i <= ca.faceCount; i++) {

            let val = Math.random() * 3;
            let r,g,b;
            if(val < 2.7) {
                
                    r = 1;
                    g = b = 0;
            }
            else if(val < 2.90) {
                g = 1;
                r = b = 0;
            }
            else {
                b = 1;
                r = g = 0;
            }

            ca.setColorRGB(i, r,g,b)

        }

    }
    update(ca, i) {

        let color = ca.getColorRGB(i);
        let newColor;

        if(this.walls.includes(i)) {
            ca.setColorRGB(i, 1,0,1);
            return;
        }
        else if(color[0] == color[1] == color[2] == 0) {
            
            let stop = false;
            let count = [0,0,0];
            ca.getNeigbors(i).forEach(el => {
                let rgb = ca.getColorRGB(el);
                
                if(rgb[0]) {
                    count[0]++;
                }
                else if(rgb[1]) {
                    count[1]++;
                }
                else if(rgb[2]) {
                    count[2]++;
                }
            });
            //console.log(count);
            if(count[0] > count[1] && count[0] > count[2]) {
                ca.setColorRGB(i, 1,0,0);
            }
            else if(count[1] > count[0] && count[1] > count[2]) {
                ca.setColorRGB(i, 0,1,0);
            }
            else if(count[2] > count[0] && count[2] > count[1]) {
                ca.setColorRGB(i, 0,0, 1);
            }
            else {
                ca.setColorRGB(i, 0,0, 0);
            }
            return;
        }
        

        let stop = false;
        ca.getNeigbors(i).forEach(el => {
            
            let rgb = ca.getColorRGB(el);
            if(stop) return;
            if(rgb[0] && color[1]) {
                ca.setColorRGB(i, 1,0,0);
                stop = true;
            }

            else if(rgb[1] && color[2]) {
                ca.setColorRGB(i, 0,1,0);
                stop = true;
            }

            else if(rgb[2] && color[0]) {
                ca.setColorRGB(i, 0,0,1);
                stop = true;
            }
            else {
                ca.setColorRGB(i, color[0], color[1], color[2]);
            }
            

        });
        

    }
}
