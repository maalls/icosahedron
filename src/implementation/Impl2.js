export class Impl2 {
    constructor() {
        this.fps = 2;
        this.n = 100;

        this.ui = {
            name: "Game of life"
        }
    }
    onClick(ca, i) {
        ca.setColor( i, ca.getColor(i) ? 0 : 1);
    }
    init(ca) {
        return;
        
    }
    update(ca, i) {

        let color = ca.getColor(i);
        let neighbor = ca.getNeigborCount(i);
        
        if (neighbor == 0 || neighbor == 3) {

            ca.setColor(i, 0);

        }
        else if (neighbor == 2) {

            ca.setColor(i, 1);

        }
        else {
            ca.setColor(i, color);
        }

    }
}