function snake() {
	this.x = windowWidth/2;
	this.y = 20;
	this.sHeight = 20;
	this.sWidth = 20;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 0;
	this.last_moving_direction;
	this.tail = [];
	//update function running on each frame refresh...
	this.update = function() {
	for(var i=0; i< this.tail.length-1; i++) {
		this.tail[i] = this.tail[i+1];
	}

	for (var i=0; i< this.tail.length; i++) {
		if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
			this.gameOver();
		}
	}

	
	if( abs(this.x-windowWidth) <72 || abs(this.y-windowHeight) <this.sHeight+3 || this.x == 0 || this.y==0 ) {
		this.gameOver();
		return;
	}
	this.tail[this.total-1] = createVector(this.x, this.y, this.sWidth, this.sHeight);

		this.x += this.xspeed*diffLevel;
		this.x = constrain(this.x, 0, windowWidth-67);
		this.y += this.yspeed*diffLevel;
		this.y = constrain(this.y, 0, windowHeight-this.sHeight);
	}

	//code for what happens on death of snake

	this.gameOver = function() {
		fill(0, 102, 153);
		textSize(70);
		text('GAME OVER!!', windowWidth/15, windowHeight/2);
		fill(255, 0, 100);
		textSize(55);
		text('SCORE:- ' + this.total, windowWidth/15, windowHeight/1.5);
		if(window.localStorage.getItem('highscore') < this.total) {
			window.localStorage.setItem('highscore', this.total);
		}
		fill(255, 0, 100);
		textSize(55);
		text('HIGHSCORE:- ' + window.localStorage.getItem('highscore'), windowWidth/15, windowHeight/1.25);
		this.xspeed=0;
		this.yspeed=0;
	}
	//drawing of snake on canvas
	this.show = function() {
		fill('black');
		for(var i=0; i< this.total; i++) {
			rect(this.tail[i].x, this.tail[i].y, this.sWidth, this.sHeight);
		}
		rect(this.x, this.y, this.sWidth, this.sHeight);
	}
	//what happens when snake eats Food
	this.eat = function(){
		this.total++;
		pickLocForFood();
	}
	//function to change direction of snake on arrow press
    this.dir= function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
}