export class Impl5 {
    constructor() {
        this.fps = 5;
        this.n = 100;

        this.ui = {
            name: "Rock Scisor paper"
        }
    }

    
    onClick(ca, colors, i) {
        let color = ca.getColorRGB(colors, i);

        let ind = color.indexOf(1);
        if(ind == -1) {
            ca.setColorRGB(colors, i, 1,0,0);
        }
        else if(ind == 0) {
            ca.setColorRGB(colors, i, 0, 1, 0);
        }
        else if(ind == 1) {
            ca.setColorRGB(colors, i, 0, 0, 1);
        }
        else if(ind == 2) {
            ca.setColorRGB(colors, i, 0, 0, 0);
        }

    }

    init(ca, colors) {
        
        for(let i = 0; i < ca.faceCount; i++) {

            let val = Math.random() * 3;
            let r,g,b;
            if(val < 2) {
                
                    r = 1;
                    g = b = 0;
            }
            else if(val < 2.05) {
                g = 1;
                r = b = 0;
            }
            else {
                b = 1;
                r = g = 0;
            }

            ca.setColorRGB(colors, i, r,g,b)

        }

    }
    update(ca, colors, newColors, i) {

        let color = ca.getColorRGB(colors, i);
        let newColor;

        if(color[0] == color[1] == color[2] == 0) {
            
            let stop = false;
            let count = [0,0,0];
            ca.getNeigbors(i).forEach(el => {
                let rgb = ca.getColorRGB(colors, el);
                
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
                ca.setColorRGB(newColors, i, 1,0,0);
            }
            else if(count[1] > count[0] && count[1] > count[2]) {
                ca.setColorRGB(newColors, i, 0,1,0);
            }
            else if(count[2] > count[0] && count[2] > count[1]) {
                ca.setColorRGB(newColors, i, 0,0, 1);
            }
            else {
                ca.setColorRGB(newColors, i, 0,0, 0);
            }
            return;
        }
        

        let stop = false;
        ca.getNeigbors(i).forEach(el => {
            
            let rgb = ca.getColorRGB(colors, el);
            if(stop) return;
            if(rgb[0] && color[1]) {
                ca.setColorRGB(newColors, i, 1,0,0);
                stop = true;
            }

            else if(rgb[1] && color[2]) {
                ca.setColorRGB(newColors, i, 0,1,0);
                stop = true;
            }

            else if(rgb[2] && color[0]) {
                ca.setColorRGB(newColors, i, 0,0,1);
                stop = true;
            }
            else {
                ca.setColorRGB(newColors, i, color[0], color[1], color[2]);
            }

        });
        

    }
}
