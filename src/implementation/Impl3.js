export class Impl3 {
    constructor() {
        this.fps = 12;
        this.n = 100;

        this.ui = {
            name: "Game of life 2"
        }
    }
    onClick(ca, i) {
        console.log("click", i);
        ca.setColor(i, !ca.getColor(i));
        return;

    }

    getUiSetting() {
        return [
            {
                type: 'select',
                options: [0, 10, 20, 30]
            }
        ];
    }
    init(ca) {
        ca.setColor(1, 1);
        return;
        
    }
    step(ca, i) {

        let color = ca.getColor(i);
        let neighbor = ca.getNeigborCount(i);
        
        if (neighbor == 0 || neighbor == 3) {

            ca.setColor(i, 0);

        }
        else if (neighbor == 2) {

            ca.setColor(i, 1);

        }
        else {
            ca.setColor(i, 1);
        }

    }
}