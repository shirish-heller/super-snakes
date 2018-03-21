var s;
var diffLevel = 20;
var foodPosition;
var gameOver =false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	s = new snake();
	pickLocForFood();
	frameRate(10);
}
//Draw function called every frame
function draw() {
	background('greenyellow');
	stroke('black');
	if(!gameOver) {
		s.update();
		s.show();
		fill (255, 0, 100);
		stroke('red');
		ellipse(foodPosition.x+10, foodPosition.y+10, s.sWidth, s.sHeight);
		// fill (255, 0, 100, 0.4);
		// rect(foodPosition.x, foodPosition.y, s.sWidth, s.sHeight);
		if(( abs(s.x-foodPosition.x) < s.sWidth/2) && ( abs(s.y-foodPosition.y) < s.sHeight/2)) {
			s.eat();
		}
	}
}

//function to pick a random food location on grid
function pickLocForFood() {
	var cols = floor(windowWidth/s.sWidth);
	var rows = floor(windowHeight/s.sHeight);
	foodPosition =createVector(floor (random(cols)), floor(random(rows)));
	foodPosition.x = constrain (foodPosition.x * s.sWidth, 20, windowWidth-s.sWidth-60);
	foodPosition.y = constrain (foodPosition.y * s.sHeight, 20, windowWidth-s.sHeight-20);
	console.log(foodPosition);
}
// controls snnakes direction when arrow keys are pressed
function keyPressed() {
	if(keyCode == UP_ARROW && (this.last_moving_direction!==DOWN_ARROW) ) {
		s.dir(0, -1);
		this.last_moving_direction = keyCode;
	} else if(keyCode == DOWN_ARROW && (this.last_moving_direction!==UP_ARROW)) {
		s.dir(0, 1);
		this.last_moving_direction = keyCode;
	}else if(keyCode == RIGHT_ARROW && (this.last_moving_direction!==LEFT_ARROW)) {
		s.dir(1, 0);
		this.last_moving_direction = keyCode;
	}else if(keyCode == LEFT_ARROW && (this.last_moving_direction!==RIGHT_ARROW)) {
		s.dir(-1, 0);
		this.last_moving_direction = keyCode;
	}
}