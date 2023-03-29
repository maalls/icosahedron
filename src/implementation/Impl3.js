export class Impl3 {
    constructor() {
        this.fps = 10;
        this.n = 100;
    }
    onClick(ca, colors, i) {
        console.log("click", i);
        ca.setColor(colors, i, !ca.getColor(colors, i));
        return;
        ca.setColorRGB(colors, i, 1, 1, 0);
        let neighbors = ca.getNeigbors(i);
        neighbors.forEach(element => {
            ca.setColorRGB(colors, element, 0, 0, 1);
        });

    }

    getUiSetting() {
        return [
            {
                type: 'select',
                options: [0, 10, 20, 30]
            }
        ];
    }
    init(ca, colors) {
        return;
        let pop = 0; //Math.floor(ca.faceCount / 1.2);
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
            ca.setColor(newColors, i, 1);
        }

    }
}