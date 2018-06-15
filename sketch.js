// Main file in the prisoners dilemma template

let scorematrix = [[3, 1], 
		   [4, 2]]; // Score matrix of the prisoners dilemma
let rounds = 100; // how many rounds in each game
let tournaments = 1; // how many tournaments
players = []; // Array to keep the players
num_players = 6 // Number of players


class player {
    constructor(name, strategi) {
        this.name = name;
        this.score = 0;
        this.strategi = strategi;
        this.moves = [];
        this.countermoves = [];
        this.counterdefects = 0;
        
    }
                
    reset() {
    	
    	this.moves = [];
    	this.countermoves = [];
    	this.counterdefects = 0;
    }
    
    counterdefs() {
    	this.counterdefects = 0;
    	for(var a = 0; a < this.countermoves.length; a++) {
    		if (this.countermoves[a] == 1){ this.counterdefects += 1; 
		}
    	}
    }
    
    answer(last){
    	var move;
    	if (this.strategi == 0){ // Allways answer 0 (cooperate)
    		move = 0; }
    	else if (this.strategi == 1){ // Allways answer 1 (Defect)
    		move = 1;}
    	else if (this.strategi == 2) {  // 50% random 0 or 1
     		move = (int(random(0, 2)));}
     	else if (this.strategi == 3) {  // 30/70 random 0 or 1
     		var x = int(random(0, 11));
     		if (x < 8) { move = 0; }
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
    		
    	else if (this.strategi == 6) { // Tit for two Tats
    		move = 0;
    		if (this.countermoves.length > 2) {
    			if ((this.countermoves[this.countermoves.length - 2] == 1) && (this.countermoves[this.countermoves.length - 3] == 1)) {
    				move = 1;
    		}
		}	
		}
	
	else if (this.strategi == 7) { // Tit for two Tats last defect
    		move = 0;
    		if (this.countermoves.length > 2) {
    			if ((this.countermoves[this.countermoves.length - 2] == 1) && (this.countermoves[this.countermoves.length - 3] == 1)) {
    				move = 1;
    		}
		}	
		if (last) { move = 1; }
		}
    		
    	else if (this.strategi == 8) { // Tit for Tat with last defect and defect if other defect 5 times
       		move = 0;
    		if (this.countermoves.length > 1) {
    			move = this.countermoves[this.countermoves.length - 2];
    		}
    		this.counterdefs();
    		if (this.counterdefects > 4) { move = 1; }
		if (last) { move = 1; }
    		}	
    	this.moves.push(move);

    	return move;	
    	
    }
}


function setup() {
    createCanvas(200,200);
    for(var a = 0; a < num_players; a++) {
    	players.push(new player("name" + str(a), int(random(1, 9))));
    }

  }



function draw() {
	for(var h = 0; h < tournaments; h++) {
	    for(var i = 0; i < players.length; i++) {
	    	for(var j = i; j < players.length; j++) {
		    	players[i].reset();
	    		players[j].reset();
	    	    		
	    		for(var k = 0; k < rounds; k++) {
	    			var last = 'false';
	    			if (i != j) {
	    				if (k + 1 == rounds) { 
	    					last = 'true'; 
	    					}
	    	    			game(players[i], players[j], last);
	    	    		}
	    	    	}
	    	}
	    }
	}
	
	var results = [];
	for(var n = 0; n < players.length; n++) {
    		console.log(players[n].name + " " + players[n].score);
        	results.push({name: players[n].name, value: players[n].score, strategi: players[n].strategi})
	}
	results.sort(function (a, b) {
	return a.value - b.value;
	});
	for(m = results.length; m > 0; m--){
	console.log(results[m]);
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