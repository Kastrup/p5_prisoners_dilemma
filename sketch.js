// Main file in the prisoners dilemma template







function setup() {
    let player1 = new player("Henrik", 0);
}

function draw() {
    noLoop();
}

class player {
    constructor(name, strategi) {
        this.name = name;
        this.score = 0;
        this.strategi = strategi;
    }
    
    
}