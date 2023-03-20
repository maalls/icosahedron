const zoneMap = {
    1: [5,2,7], // left, right, bottom
    2: [1,3,6],
    3: [2,4,10],
    4: [3,5,9],
    5: [4,1,8],
    6: [2,20, 16],
    7: [1, 16, 17],
    8: [5,17,18],
    9: [4,18,19],
    10: [3, 19, 20],
    11: [15,12,16],
    12: [11,13,17],
    13: [12,14,18],
    14: [13,15,19],
    15: [14,11,20],
    16: [11,7,6],
    17: [12,8,7],
    18: [13,6,8],
    19: [14,10,9],
    20: [15,6,10]
}
export class CellularAutomata {
    constructor(n) {
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

    }
    isInRegularZone(zone) {
        // zone 1 to 5 and 11 to 15 are called regular because they are adjacent to a pole
        return this.zone <= 5 || (this.zone > 10 && this.zone <=15);
    }

    getNeigbors(i) {
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

        let leftNeighbor = 0;
        let rightNeighbor = null;
        let bottomNeighbor = null;

        // we will solve the ones on the left border, then right border, then bottom border
        // the for the one inside

        if(isOnRight) {

            // bottom
            let target = zoneMap[this.zone][2];
            if(this.isInRegularZone(this.zone)) {
                bottomNeighbor = (target - 1) * this.facePerZone + (this.baseSize - 2*this.level + 2);
            }
            else {
                bottomNeighbor = (target - 1) * this.facePerZone;
                // get the inverse level i.e. level 1 will be top level
                let targetLevel = this.zoneHeight - this.level + 1;
                //console.log("tl", i, targetLevel);
                let s = this.baseSize;
                for(let j = 0; j < targetLevel; j++) {
                    bottomNeighbor += s;
                    s = s - 2;
                }

            }
            
            // left
            if(!isOnBottom) {

                leftNeighbor = i - this.levelSize - 1;
                
            }
            else {

                let target = zoneMap[this.zone][0];
                if(this.isInRegularZone(this.zone)) {

                    leftNeighbor = target * this.facePerZone;

                }
                else {
                    leftNeighbor = (target - 1) * this.facePerZone + this.baseSize;
                }

            }

            //console.log('check1', i, leftNeighbor);

            // right

            if(this.level != this.zoneHeight) {
                rightNeighbor = i - 1;
            }
            else {
                let target = zoneMap[this.zone][1];
                if(this.isInRegularZone(this.zone)) {
                    rightNeighbor = (target - 1) * this.facePerZone + this.baseSize;
                }
                else {
                    rightNeighbor = (target - 1) * this.facePerZone + 1;
                }
            }
            

        }

        else if (isOnLeft) {
            // calculate the bottom neighbor
            if(!isOnBottom) {

                //console.log('test', i, this.levelSize);
                bottomNeighbor = i - (this.levelSize + 2) + 1;

            }
            else {
                let target = zoneMap[this.zone][0];

                if(this.isInRegularZone(this.zone)) {
                    
                    bottomNeighbor = (target - 1) * this.facePerZone + 1;
                }
                else {
                    
                    bottomNeighbor = target  * this.facePerZone;
                }

                

            }

            // calculation of right neighbor (done)
            if(this.level < this.zoneHeight) {
                rightNeighbor = i + 1;
            }
            else {
                if(this.isInRegularZone(this.zone)) {
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
        else if(isOnBottom) {


            let target = zoneMap[this.zone][0];

            if(this.isInRegularZone(this.zone)) {

                bottomNeighbor = (target - 1) * this.facePerZone + 1;
                let targetLevel = (this.subIndex - 1) / 2;
                let s = this.baseSize;
                for(let j = 1; j <= targetLevel; j++) {
                    bottomNeighbor += s;
                    s = s - 2;
                }

                

            }
            else {
                let targetLevel = this.zoneHeight - this.level + 1;
                bottomNeighbor = (target - 1) * this.facePerZone;
                let s = this.baseSize;
                for(let j =1; j < targetLevel; j++) {
                    bottomNeighbor += s;
                    s -= 2;
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

            // if  local index even the bottom is on the previous level
            
            if(this.level % 2 == 0) {
                if(this.subIndex % 2 == 0) {
                    bottomNeighbor = this.subIndex - 2*(this.zoneHeight - this.level + 1);
                    
                }
                else {
                    bottomNeighbor = this.subIndex + this.levelSize - 1;
                    //console.log('b', i, bottomNeighbor, leftNeighbor, rightNeighbor);
                }
            }
            else {
                if(this.subIndex % 2 == 0) {
                    bottomNeighbor = this.subIndex + this.levelSize - 1;
                    
                    
                }
                else {
                    
                    bottomNeighbor = this.subIndex - 2*(this.zoneHeight - this.level + 1);
                }
                //console.log('b', i, bottomNeighbor, leftNeighbor, rightNeighbor);
            }

        }

        //console.log('check2',i, leftNeighbor);
        //console.log(i, leftNeighbor, rightNeighbor, bottomNeighbor);
        //console.log(i, leftNeighbor, rightNeighbor, bottomNeighbor);
        return [leftNeighbor, rightNeighbor, bottomNeighbor];
    }

    

    isInLeftBorder(i) {

    }

    getColor(colors, i) {
        let ind = (i - 1)*9;
        return colors[ind];
    }

    setColor(colors, i, color) {

        

        //let linear = color.convertSRGBToLinear ();
        //console.log("setting", color.toArray());
        let ind = (i - 1)*9;
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

}