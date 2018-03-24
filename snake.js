function snake() {
	this.x = windowWidth/2;
	this.y = 20;
	this.sHeight = 20;
	this.sWidth = 20;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 0;
	this.last_moving_direction;
	this.pellet_active = false;
	this.tail = [];
	this.ate_super = false;
	//update function running on each frame refresh...
	this.update = function() {
			for(var i=0; i< this.tail.length-1; i++) {
				this.tail[i] = this.tail[i+1];
			}

		//logic for death if snake bites itself
	for (var i=0; i< this.tail.length; i++) {
		if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
			if(!this.ate_super) {
				this.gameOver();
			}
		}
	}

	//checking wall collision	
	if( abs(this.x-windowWidth) <72 || abs(this.y-windowHeight) <this.sHeight+3 || this.x == 0 || this.y==0 ) {
		if(!this.ate_super) {
			this.gameOver();
			return;
		}
		
	}
		this.tail[this.total-1] = createVector(this.x, this.y, this.sWidth, this.sHeight);
	
		this.x += this.xspeed*diffLevel;
		this.x = constrain(this.x, 0, windowWidth-67);
		this.y += this.yspeed*diffLevel;
		this.y = constrain(this.y, 0, windowHeight-this.sHeight);

		//invoke super power pellet
		if(this.total%2 ==0 && !(pellet_flag_tracker.includes(this.total)) && this.total!==0 ) {
				//invoke super power peller
				pellet_flag_tracker.push(this.total);
				pickLocForPellet();
				this.pellet_active = true;
				setTimeout(function() {
					this.s.pellet_active = false;
					pelletPosition= undefined;
				}, 6000);
			}
		}

	//code for what happens on death of snake

	this.gameOver = function() {
		fill('white');
		textSize(70);
		text('GAME OVER!!', windowWidth/15, windowHeight/2);
		fill('white');
		textSize(25);
		text('Score: ' + this.total, windowWidth/15, windowHeight/1.5);
		if(window.localStorage.getItem('highscore') < this.total) {
			window.localStorage.setItem('highscore', this.total);
		}
		fill('white');
		textSize(25);
		text('Highscore ' + window.localStorage.getItem('highscore'), windowWidth/15, windowHeight/1.35);
		this.xspeed=0;
		this.yspeed=0;
	}
	//drawing of snake on canvas
	this.show = function() {
		if(!this.ate_super) {
			fill('#268bd2');
		}
		if(this.ate_super) {
			fill('#fff');
		}
		for(var i=0; i< this.total; i++) {
			ellipse(this.tail[i].x+10, this.tail[i].y+10, this.sWidth, this.sHeight);
		}
		
		//different snake shapes on going down and up
		if(this.yspeed !== 1) {
			beginShape();
			vertex(this.x+this.sWidth/2, this.y);
			vertex(this.x, this.y+this.sHeight);
			vertex(this.x+this.sWidth, this.y+this.sHeight);
			endShape();
			ellipse(this.x+this.sWidth/4, this.y, 3, 3);
			ellipse(this.x+(this.sWidth)*3/4, this.y, 3, 3);
		}
		if(this.yspeed == 1) {
			beginShape();
			vertex(this.x+this.sWidth/2, this.y+this.sHeight);
			vertex(this.x, this.y);
			vertex(this.x+this.sWidth, this.y);
			endShape();
			ellipse(this.x+this.sWidth/4, this.y+this.sHeight, 3, 3);
			ellipse(this.x+(this.sWidth)*3/4, this.y+this.sHeight, 3, 3);
		}
		
		
	}
	//what happens when snake eats Food
	this.eat = function(type){
		if(type == 'food') {
			this.total++;
			pickLocForFood();
		}
		if(type == 'super_pellet') {
			this.ate_super = true;
			setTimeout(function() {
			this.s.ate_super = false;
			}, 8000);
			pelletPosition= undefined;
		}
		

	}
	//function to change direction of snake on arrow press
    this.dir= function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
}