// Main file in the prisoners dilemma template

let scorematrix = [[3, 1], [4, 2]]; // Score matrix of the prisoners dilemma
let rounds = 100; // how many rounds in each game
players = []; // Array to keep the players
num_players = 4 // Number of players


class player {
    constructor(name, strategi) {
        this.name = name;
        this.score = 0;
        this.strategi = strategi;
        this.moves = [];
        this.countermoves = [];
        
    }
        
    answer(last){
    	var move;
    	if (this.strategi == 0){ // Allways answer 0
    		move = 0; }
    	else if (this.strategi == 1){ // Allways answer 1
    		move = 1;}
    	else if (this.strategi == 2) {  // 50% random 0 or 1
     		move = (int(random(0, 2)));}
     	else if (this.strategi == 3) {  // 30/70 random 0 or 1
     		var x = int(random(0, 11));
     		if (x < 10) { move = 0; }
     			else {move = 1; }
    		}
    		
    	else if (this.strategi == 4) { // Tit for Tat
    		move = 0;
    		if (this.countermoves.length > 1) {
    			move = this.countermoves[this.countermoves.length - 2];
    		}
		}
   			
    		
    	else if (this.strategi == 5) { // Tit for Tat with last defect
       		move = 0;
    		if (this.countermoves.length > 1) {
    			move = this.countermoves[this.countermoves.length - 2];
    		}
		if (last) { move = 1; }
    		}	
    		
    	this.moves.push(move);
    	return move;	
    	
    }
}


function setup() {
    createCanvas(200,200);
    players.push(new player("Allways_Cooperate", 0));
    players.push(new player("Allways_Reject", 1));
    players.push(new player("Random_50_50", 2));
    players.push(new player("Random_70_30", 3));
    players.push(new player("Tit4Tat",4));
    players.push(new player("Tit4Tat_defect_last",5));
  }



function draw() {
    
    for(var i = 0; i < players.length; i++) {
    	for(var j = i; j < players.length; j++) {
	    	players[i].moves = [];
    		players[i].countermoves = [];
		players[j].moves = [];
    		players[j].countermoves = [];
    	    		
    		for(var k = 0; k < rounds; k++) {
    			var last = 'false';
    			if (i != j) {
    				if (k + 1 == rounds) { 
    					last = 'true'; 
    					}
    	    			game(players[i], players[j], last);
    	    			//console.log(players[i].name + " " +  players[j].name); 
    	    			}
    	    	}
    	    }
  }
    for(var n = 0; n < players.length; n++) {
        console.log(players[n].name + " " + players[n].score);
	}
    noLoop();
}



function game(playerA, playerB, last) {
    a = playerA.answer(last);
    playerB.countermoves.push(a);
    b = playerB.answer(last);
    playerA.countermoves.push(b);
    playerA.score += scorematrix[a][b];
    playerB.score += scorematrix[b][a];
}