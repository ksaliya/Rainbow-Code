var s;
var gridScale = 20;
var food;
var gameState;
// var logo;

function setup() {
	createCanvas(500, 500);
	frameRate(10);
	// logo = loadImage('logo.png');
	gameState = 'init';

}

function pickLocation(){
	var cols = floor(width/gridScale);
	var rows = floor(height/gridScale);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(gridScale);
}

function initGame(){
	// image(logo, (width - logo.width)/2, (height - logo.height)/2);
	var name = 'Snake Game';
	nameWidht = textWidth(name);
	textSize(50);
	fill(255);
	text(name, (width - nameWidht)/2, height/2 - 40);
	startBtn = createButton('Start Game');
	startBtn.position(width/2 - startBtn.width/2, height/2);
	startBtn.mousePressed(startGame);
}

function startGame(){
	removeElements();
	gameState = 'play';
	s = new Snake;
	pickLocation();
}

function endGame(){
	var msg = 'Game Over';
		var score = 'Your Score is ' + (s.total - 1);
		msgWidht = textWidth(msg);
		scoreWidht = textWidth(score);
		textSize(32);
		fill(255);
		text(msg, (width - msgWidht)/2, height/2 - 40);
		text(score, (width - scoreWidht)/2, height/2);
		startBtn = createButton('Restart Game');
		startBtn.position(width/2 - startBtn.width/2, height/2 + 40);
		startBtn.mousePressed(startGame);
}

function draw() {
	background(50);
	if(gameState == 'init'){
		initGame();
	}
	else if(gameState == 'play'){
		s.isDead();
		s.update();
		s.show();

		if(s.ateFood(food)){
			pickLocation();
		}

		fill(255, 0 , 100);
		rect(food.x, food.y, gridScale, gridScale);
	}
	else if(gameState == 'end'){
		endGame();
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW && s.yspeed != 1){
		s.dir(0, -1);
	}
	else if(keyCode === DOWN_ARROW && s.yspeed != -1){
		s.dir(0, 1);
	}
	else if(keyCode === LEFT_ARROW && s.xspeed != 1){
		s.dir(-1, 0);
	}
	else if(keyCode === RIGHT_ARROW && s.xspeed != -1){
		s.dir(1, 0);
	}
}
