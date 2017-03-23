function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 1;
	this.tail = [];

	this.update = function(){
		for(var i = 0; i < this.tail.length - 1; i++){
			this.tail[i] = this.tail[i+1];
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x += this.xspeed*gridScale;
		this.y += this.yspeed*gridScale;

		this.x = constrain(this.x, 0, width - gridScale);
		this.y = constrain(this.y, 0, height - gridScale);
	}

	this.show = function(){
		fill(255);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, gridScale, gridScale);
		}
		rect(this.x, this.y, gridScale, gridScale);
	}

	this.dir = function(x, y){
		this.xspeed = x;
		this.yspeed = y;
	}

	this.ateFood = function(pos){
		d = dist(this.x, this.y, pos.x, pos.y)
		if(d < 1){
			this.total++;
			return true;
		}
		else{
			return false;
		}
	}

	this.isDead = function(){
		for(var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if(d < 1){
				gameState = 'end';
			}
		}

		var hit_wall = (this.x + gridScale > width || this.x + gridScale < 0) || ((this.y + gridScale > height || this.y + gridScale < 0));
		// var hit_wall = (this.x > width || this.x < 0) || ((this.y > height || this.y < 0));
		// console.log(this.x);
		// console.log(width);
		// console.log(hit_wall);

		if(hit_wall){
			gameState = 'end';
		}
	}
}
