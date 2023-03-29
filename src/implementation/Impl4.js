export class Impl4 {
    constructor() {
        this.fps = 1;
        this.n = 3;
    }
    onClick(ca, colors, i) {
        console.log(i, ca.getNeigbors(i));
    }

    init(ca, colors) {
        this.current = 0;
        this.currentNeihbors = [];
        return;
    }

    before() {
        this.current++;
        console.log('current', this.current);
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