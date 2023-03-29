const zoneMap = {
    1: [5, 2, 7], // left, right, bottom
    2: [1, 3, 6],
    3: [2, 4, 10],
    4: [3, 5, 9],
    5: [4, 1, 8],
    6: [2, 20, 16],
    7: [1, 16, 17],
    8: [5, 17, 18],
    9: [4, 18, 19],
    10: [3, 19, 20],
    11: [15, 12, 16],
    12: [11, 13, 17],
    13: [12, 14, 18],
    14: [13, 15, 19],
    15: [14, 11, 20],
    16: [11, 7, 6],
    17: [12, 8, 7],
    18: [13, 9, 8],
    19: [14, 10, 9],
    20: [15, 6, 10]
}
export class CellularAutomata {
    constructor(n) {
        this.setN(n);
    }

    setN(n) {
        this.n = n;
        this.facePerZone = (n + 1) * (n + 1);
        this.faceCount = this.facePerZone * 20;
        this.baseSize = 1 + 2 * n;
        this.zoneHeight = 0;
        let diff = this.facePerZone;
        let rowSize = this.baseSize;
        while (diff > 0) {
            this.zoneHeight++;
            diff = diff - rowSize;
            rowSize = rowSize - 2;
        }
        console.log("height", this.zoneHeight);
        this.generateNeigbors();
    }

    isInRegularZone(zone) {
        // zone 1 to 5 and 11 to 15 are called regular because they are adjacent to a pole
        return this.zone <= 5 || (this.zone > 10 && this.zone <= 15);
    }

    getNeigborCount(colors, i) {
        let neighbor = 0;
        this.getNeigbors(i).forEach(el => {
            neighbor += this.getColor(colors, el);
        });

        return neighbor;

    }


    getNeigbors(i) {
        return this.neighbors[i];
    }

    generateNeigbors() {

        this.neighbors = [];

        for (let i = 1; i <= this.faceCount; i++) {
            //console.log('check2',i, leftNeighbor);
            //console.log(i, leftNeighbor, rightNeighbor, bottomNeighbor);
            //console.log(i, leftNeighbor, rightNeighbor, bottomNeighbor);
            this.neighbors[i] = this.computeNeigbors(i);
        }
    }

    computeNeigbors(i) {
        this.zone = Math.floor((i - 1) / this.facePerZone) + 1;
        this.subIndex = i - (this.zone - 1) * this.facePerZone;
        let diff = this.subIndex;
        this.levelSize = this.baseSize;
        this.level = 0;
        this.levelIndex = this.subIndex;
        while (diff > 0) {
            this.level++;
            diff -= this.levelSize;
            if (this.levelIndex - this.levelSize > 0) {
                this.levelIndex = this.levelIndex - this.levelSize;
                this.levelSize -= 2;
            }



        }
        let neighbors = [];
        let isOnLeft = null;
        let isOnRight = null;
        let isOnBottom = null;
        if (this.levelIndex == 1) {
            isOnLeft = true;
        }
        else {
            isOnLeft = false;
        }

        if (this.level == 1 && this.subIndex % 2 == 1) {
            isOnBottom = true;
        }
        else {
            isOnBottom = false;
        }

        if (this.levelSize == this.levelIndex) {
            isOnRight = true;
        }
        else {
            isOnRight = false;
        }
       //console.log('position', i,'l', isOnLeft,'r', isOnRight, 'b', isOnBottom, this.level);

        let leftNeighbor = 0;
        let rightNeighbor = null;
        let bottomNeighbor = null;

        // we will solve the ones on the left border, then right border, then bottom border
        // the for the one inside
        //console.log(i, 'zone', this.zone);
        if (isOnRight) {

            // bottom
            //console.log("right", i, this.zone);

            let target = zoneMap[this.zone][2];
            if (this.isInRegularZone(this.zone)) {
                bottomNeighbor = (target - 1) * this.facePerZone + (this.baseSize - 2 * this.level + 2);
            }
            else {



                bottomNeighbor = (target - 1) * this.facePerZone;
                // get the inverse level i.e. level 1 will be top level
                let targetLevel = this.zoneHeight - this.level + 1;
                //console.log("tl", i, target, bottomNeighbor, targetLevel);
                let s = this.baseSize;
                for (let j = 0; j < targetLevel; j++) {
                    bottomNeighbor += s;
                    s = s - 2;
                }

            }
            //console.log("bottom", bottomNeighbor);

            // left
            if (!isOnBottom) {
                
                leftNeighbor = i - this.levelSize - 1;
                //console.log("not bottom, left", leftNeighbor);

            }
            else {

                let target = zoneMap[this.zone][0];
                if (this.isInRegularZone(this.zone)) {

                    leftNeighbor = target * this.facePerZone;

                }
                else {
                    leftNeighbor = (target - 1) * this.facePerZone + this.baseSize;
                }

                //console.log("bottom, left", leftNeighbor);

            }

            //console.log('check1', i, leftNeighbor);

            // right

            if (this.level != this.zoneHeight) {
                rightNeighbor = i - 1;
            }
            else {
                
                let target = zoneMap[this.zone][1];
                //.log('is on top, target', target);
                if (this.isInRegularZone(this.zone)) {
                    rightNeighbor = (target - 1) * this.facePerZone + this.baseSize;
                }
                else {
                    rightNeighbor = (target - 1) * this.facePerZone + 1;
                }
            }


        }

        else if (isOnLeft) {
            // calculate the bottom neighbor
            if (!isOnBottom) {

                //console.log('test', i, this.levelSize);
                bottomNeighbor = i - (this.levelSize + 2) + 1;

            }
            else {
                let target = zoneMap[this.zone][0];

                if (this.isInRegularZone(this.zone)) {

                    bottomNeighbor = (target - 1) * this.facePerZone + 1;
                }
                else {

                    bottomNeighbor = target * this.facePerZone;
                }



            }

            // calculation of right neighbor (done)
            if (this.level < this.zoneHeight) {
                rightNeighbor = i + 1;
            }
            else {
                if (this.isInRegularZone(this.zone)) {
                    rightNeighbor = (zoneMap[this.zone][2] - 1) * this.facePerZone + 1;
                }
                else {
                    rightNeighbor = (zoneMap[this.zone][2] - 1) * this.facePerZone + this.baseSize;
                }


                //console.log(this.zone, i, rightNeighbor);
            }


            // calculation of left neighbor (done)
            let target = zoneMap[this.zone][1];
            if (this.isInRegularZone(this.zone)) {
                leftNeighbor = (target - 1) * this.facePerZone + 1 + 2 * (this.level - 1);

            }
            else {

                leftNeighbor = (target - 1) * this.facePerZone + 1;
                let targetLevel = this.zoneHeight - this.level;
                let facePerRow = this.baseSize;
                for (let j = 0; j < targetLevel; j++) {
                    leftNeighbor += facePerRow;
                    facePerRow -= 2;
                }

            }

        }
        else if (isOnBottom) {


            let target = zoneMap[this.zone][0];

            if (this.isInRegularZone(this.zone)) {
                //console.log("here");
                bottomNeighbor = (target - 1) * this.facePerZone + 1;
                let targetLevel = (this.subIndex - 1) / 2;
                let s = this.baseSize;
                for (let j = 1; j <= targetLevel; j++) {
                    bottomNeighbor += s;
                    s = s - 2;
                }



            }
            else {

                //console.log('zone', this.zone);
                let targetLevel;
                if (!this.isInRegularZone(this.zone)) {
                    targetLevel = (this.baseSize - this.subIndex) / 2 + 1;
                    //console.log('tl', targetLevel);

                    bottomNeighbor = (target - 1) * this.facePerZone;
                    let s = this.baseSize;
                    for(let j = 1; j <= targetLevel; j++) {
                        bottomNeighbor += s;
                        s -= 2;
                    }

                }
                else {
                    targetLevel = this.zoneHeight - this.level + 1;
                    //.log('f', this.zoneHeight, this.level);
                    bottomNeighbor = (target - 1) * this.facePerZone;
                    //console.log('tl', targetLevel, target);
                    let s = this.baseSize;
                    //console.log("b", bottomNeighbor, targetLevel, s);
                    for (let j = 1; j < targetLevel; j++) {
                        bottomNeighbor += s;
                        s -= 2;
                        //console.log("it", bottomNeighbor, s);
                    }

                }


            }

            // if not on left or right
            leftNeighbor = i - 1;
            rightNeighbor = i + 1;

        }
        else {

            // not in left or right or bottom
            // left and right are always the direct neighbors
            leftNeighbor = i - 1;
            rightNeighbor = i + 1;


            // if the first element of the zone is odd then:
            // - odd element on odd row has bottom element on bottom
            // - even element on odd row has bottom element on top
            // - odd element on even row has bttom element on top
            // - even element on even row has bottom element on bottom
            // if the first element of the zone is even then:
            // - odd element on odd row has bottom element on top
            // - even element on odd row has bottom element on bottom
            // - odd element on even row has bttom element on bottom
            // - even element on even row has bottom element on top
            let isOnTop;
            let localFirst = i - (i % this.facePerZone) + 1;
            let localFirstIsEven = localFirst % 2 == 0;
            let onEvenLevel = this.level % 2 == 0;
            let onEvenIndex = i % 2 == 0;
            // we first assume it's on odd zone

            // then we assume it's on odd level
            if (!onEvenIndex) {
                isOnTop = false;
            }
            else {
                isOnTop = true;
            }
            // if on even level we take the opposite
            if (onEvenLevel) {
                isOnTop = !isOnTop;
            }
            // and if on even zone, we take the opposite again
            if (localFirstIsEven) {
                isOnTop = !isOnTop;
            }

            if (!isOnTop) {
                //console.log(i, 'bot');
                bottomNeighbor = i - 2 * (this.zoneHeight - this.level + 1);

            }
            else {

                bottomNeighbor = i + this.levelSize - 1;

            }

            /*console.log(i, {
                localFirst: localFirst,
                localFirstIsEven: localFirstIsEven, 
                onEvenLevel: onEvenLevel, 
                onEvenIndex: onEvenIndex,
                isOnTop: isOnTop,
                neighbors: [leftNeighbor, rightNeighbor, bottomNeighbor],
                subIndex: this.subIndex
            });*/

        }

        const ret = [leftNeighbor, rightNeighbor, bottomNeighbor];

        return ret;
    }





    isInLeftBorder(i) {

    }

    getColor(colors, i) {
        let ind = (i - 1) * 9;
        return colors[ind];
    }

    setColor(colors, i, color) {


        return this.setColorRGB(colors, i, color, 0, 0);

        //let linear = color.convertSRGBToLinear ();
        //console.log("setting", color.toArray());
        let ind = (i - 1) * 9;
        colors[ind + 0] = color;
        colors[ind + 1] = 0;
        colors[ind + 2] = 0;
        colors[ind + 3] = color;
        colors[ind + 4] = 0;
        colors[ind + 5] = 0;
        colors[ind + 6] = color;
        colors[ind + 7] = 0;
        colors[ind + 8] = 0;

    }

    setColorRGB(colors, i, red, green, blue) {
        let ind = (i - 1) * 9;
        colors[ind + 0] = red;
        colors[ind + 1] = green;
        colors[ind + 2] = blue;
        colors[ind + 3] = red;
        colors[ind + 4] = green;
        colors[ind + 5] = blue;
        colors[ind + 6] = red;
        colors[ind + 7] = green;
        colors[ind + 8] = blue;
    }

    printNeigbors() {

        for (let i = 1; i <= this.faceCount; i++) {

            let nei = this.getNeigbors(i);
            console.log(i, nei);

        }
    }

    test() {
        let tmp = this.n;
        this.setN(2);
        // testing for n = 2;

        let expected = [
            [1, 10, 2, 37],
            [2, 1, 3, 6],
            [3, 2, 4, 42],
            [4, 3, 5, 8],
            [5, 45, 4, 59],
            [6, 12, 7, 2],
            [7, 6, 8, 9],
            [8, 4, 7, 57],
            [9, 7, 14, 55],
            [10, 19, 11, 1],
            [11, 10, 12, 15],
            [12, 11, 13, 6],
            [13, 12, 14, 17],
            [14, 9, 13, 50],
            [15, 21, 16, 11],
            [16, 15, 17, 18],
            [17, 13, 16, 48],
            [18, 16, 23, 46],
            [19, 28, 20, 10],
            [20, 19, 21, 24],
            [21, 20, 22, 15],
            [22, 21, 23, 26],
            [23, 18, 22, 86],
            [24, 30, 25, 20],
            [25, 24, 26, 27],
            [26, 22, 25, 84],
            [27, 25, 32, 82],
            [28, 37, 29, 19],
            [29, 28, 30, 33],
            [30, 29, 31, 24],
            [31, 30, 32, 35],
            [32, 27, 31, 77],
            [33, 39, 34, 29],
            [34, 33, 35, 36],
            [35, 31, 34, 75],
            [36, 34, 41, 73],
            [37, 1, 38, 28],
            [38, 37, 39, 42],
            [39, 38, 40, 33],
            [40, 39, 41, 44],
            [41, 36, 40, 68],
            [42, 3, 43, 38],
            [43, 42, 44, 45],
            [44, 40, 43, 66],
            [45, 43, 5, 64],
            [46, 180, 47, 18],
            [47, 46, 48, 51],
            [48, 47, 49, 17],
            [49, 48, 50, 53],
            [50, 14, 49, 144],
            [51, 177, 52, 47],
            [52, 51, 53, 54],
            [53, 49, 52, 143],
            [54, 52, 172, 140],
            [55, 144, 56, 9],
            [56, 55, 57, 60],
            [57, 56, 58, 8],
            [58, 57, 59, 62],
            [59, 5, 58, 153],
            [60, 141, 61, 56],
            [61, 60, 62, 63],
            [62, 58, 61, 152],
            [63, 61, 136, 149],
            [64, 153, 65, 45],
            [65, 64, 66, 69],
            [66, 65, 67, 44],
            [67, 66, 68, 71],
            [68, 41, 67, 162],
            [69, 150, 70, 65],
            [70, 69, 71, 72],
            [71, 67, 70, 161],
            [72, 70, 145, 158],
            [73, 162, 74, 36],
            [74, 73, 75, 78],
            [75, 74, 76, 35],
            [76, 75, 77, 80],
            [77, 32, 76, 171],
            [78, 159, 79, 74],
            [79, 78, 80, 81],
            [80, 76, 79, 170],
            [81, 79, 154, 167],
            [82, 171, 83, 27],
            [83, 82, 84, 87],
            [84, 83, 85, 26],
            [85, 84, 86, 89],
            [86, 23, 85, 180],
            [87, 168, 88, 83],
            [88, 87, 89, 90],
            [89, 85, 88, 179],
            [90, 88, 163, 176],
            [91, 100, 92, 127],
            [92, 91, 93, 96],
            [93, 92, 94, 132],
            [94, 93, 95, 98],
            [95, 135, 94, 140],
            [96, 102, 97, 92],
            [97, 96, 98, 99],
            [98, 94, 97, 138],
            [99, 97, 104, 136],
            [100, 109, 101, 91],
            [101, 100, 102, 105],
            [102, 101, 103, 96],
            [103, 102, 104, 107],
            [104, 99, 103, 149],
            [105, 111, 106, 101],
            [106, 105, 107, 108],
            [107, 103, 106, 147],
            [108, 106, 113, 145],
            [109, 118, 110, 100],
            [110, 109, 111, 114],
            [111, 110, 112, 105],
            [112, 111, 113, 116],
            [113, 108, 112, 158],
            [114, 120, 115, 110],
            [115, 114, 116, 117],
            [116, 112, 115, 156],
            [117, 115, 122, 154],
            [118, 127, 119, 109],
            [119, 118, 120, 123],
            [120, 119, 121, 114],
            [121, 120, 122, 125],
            [122, 117, 121, 167],
            [123, 129, 124, 119],
            [124, 123, 125, 126],
            [125, 121, 124, 165],
            [126, 124, 131, 163],
            [127, 91, 128, 118],
            [128, 127, 129, 132],
            [129, 128, 130, 123],
            [130, 129, 131, 134],
            [131, 126, 130, 176],
            [132, 93, 133, 128],
            [133, 132, 134, 135],
            [134, 130, 133, 174],
            [135, 133, 95, 172],
            [136, 63, 137, 99],
            [137, 136, 138, 141],
            [138, 137, 139, 98],
            [139, 138, 140, 143],
            [140, 95, 139, 54],
            [141, 60, 142, 137],
            [142, 141, 143, 144],
            [143, 139, 142, 53],
            [144, 142, 55, 50],
            [145, 72, 146, 108],
            [146, 145, 147, 150],
            [147, 146, 148, 107],
            [148, 147, 149, 152],
            [149, 104, 148, 63],
            [150, 69, 151, 146],
            [151, 150, 152, 153],
            [152, 148, 151, 62],
            [153, 151, 64, 59],
            [154, 54, 155, 117],
            [155, 154, 156, 159],
            [156, 155, 157, 116],
            [157, 156, 158, 161],
            [158, 113, 157, 72],
            [159, 51, 160, 155],
            [160, 159, 161, 162],
            [161, 157, 160, 71],
            [162, 160, 46, 68],
            [163, 90, 164, 126],
            [164, 163, 165, 168],
            [165, 164, 166, 125],
            [166, 165, 167, 170],
            [167, 122, 166, 81],
            [168, 87, 169, 164],
            [169, 168, 170, 171],
            [170, 166, 169, 80],
            [171, 169, 82, 77],
            [172, 54, 173, 135],
            [173, 172, 174, 177],
            [174, 173, 175, 134],
            [175, 174, 176, 179],
            [176, 131, 175, 90],
            [177, 51, 178, 173],
            [178, 177, 179, 180],
            [179, 175, 178, 89],
            [180, 178, 46, 86]
        ];

        for (let i = 1; i <= this.faceCount; i++) {
            let nei = [i].concat(this.getNeigbors(i));

            if (JSON.stringify(nei) == JSON.stringify(expected[i - 1])) {
                console.log(i, 'ok');
            }
            else {
                console.log(i, 'error', expected[i - 1], 'got', nei);
                return;
            }
        }

        this.setN(tmp);

    }

}

