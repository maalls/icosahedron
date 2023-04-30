export class Impl1 {
    constructor() {
        this.fps = 20;
        this.n = 100;

        this.ui = {
            name: "Heat diffusion"
        }
    }

    


    init(ca) {
        ca.setColor(1, 100);
    }
    update(ca, i) {

        let color = ca.getColor(i);
        let neighbor = ca.getNeigborCount(i);

        //console.log('col',ca.faceCount, i, color);
        // get the color value, divide by 4
        let newColor = color / 10 * 7;

        ca.getNeigbors(i).forEach(el => {
            newColor += ca.getColor(el) / 10;
        });
        ca.setColor(i, newColor);

    }
}
