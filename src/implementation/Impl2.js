export class Impl2 {
    constructor() {
        this.fps = 2;
        this.n = 100;
    }
    init(ca, colors) {
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
    }
    update(ca, colors, newColors, i) {

        let color = ca.getColor(colors, i);
        let neighbor = ca.getNeigborCount(colors, i);
        
        if (neighbor == 0 || neighbor == 3) {

            ca.setColor(newColors, i, 0);

        }
        else if (neighbor == 2) {

            ca.setColor(newColors, i, 1);

        }
        else {
            ca.setColor(newColors, i, color);
        }

    }
}