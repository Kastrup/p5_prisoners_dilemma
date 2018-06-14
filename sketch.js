// Main file in the prisoners dilemma template

let scorematrix = [[-2, 0], [-1, 3]]; // Score matrix of the prisoners dilemma

let rounds = 10;

class player {
    constructor(name, strategi) {
        this.name = name;
        this.score = 0;
        this.strategi = strategi;
    }
    
    answer(){
        return this.strategi;
    }
}

let player1 = new player("Henrik", 0);
let player2 = new player("Computer", 1);




function setup() {
    createCanvas(200,200);
    
}

function mousePressed() {
    game(player1, player2);
    
}

function draw() {
    for(var i = 0; i < rounds; i++) {
    game(player1, player2);
  }
    console.log(playerA.score);
    console.log(playerB.score);
    noLoop();
}



function game(playerA, playerB) {
    playerA.score += scorematrix[playerA.answer()][playerB.answer()];
    playerB.score += scorematrix[playerB.answer()][playerA.answer()];
}