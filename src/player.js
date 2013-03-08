Player = function (textures, id, name, male) {
	PIXI.MovieClip.call(this, textures);
	
	this.id = id;
	this.name = name;
	this.targetX = -1;
	this.targetY = -1;
	this.anchor.x = 0.5;
	this.anchor.y = 0.77;
	this.world = null;
	this.running = false;
	this.direction = 0;
	this.angle = 0;
	this.speed = 3;
	this.animationSpeed = 0.1666;
	this.play();
	
	//Setup name text
	this.nameDom = $(document.createElement("span")).css("position", "absolute").css("font-size", "18px").css("font-family", "'Lucida Sans Unicode', 'Lucida Grande', sans-serif").text(name);
	$("body").append(this.nameDom);
};

Player.constructor = Player;
Player.prototype = Object.create(PIXI.MovieClip.prototype);

Player.prototype.move = function (x, y, ignoreIndividualDimensions) {
	if (ignoreIndividualDimensions) {
		if (!this.checkBodyCollision(x, y)) {
			this.position.x = x;
			this.position.y = y;
		}
	} else {
		if (!this.checkBodyCollision(x, this.position.y)) {
			this.position.x = x;
		}
		if (!this.checkBodyCollision(this.position.x, y)) {
			this.position.y = y;
		}
	}
};

Player.prototype.checkBodyCollision = function (x, y) {
	return this.checkCollision(x - 13, y + 8) || this.checkCollision(x - 13, y - 23) || this.checkCollision(x + 13, y + 8) || this.checkCollision(x + 13, y - 23);
};

Player.prototype.checkCollision = function (x, y) {
	for (var i in this.world.children) {
		var blocks = this.world.children[i].tiles;
		var index = Math.floor(y / this.world.th)*(this.world.width/this.world.tw) + Math.floor(x / this.world.tw);
		if (blocks[index] != null) {
			var tileid = blocks[index].tileid;
			if (this.world.tilesData[tileid] != null) {
				return this.world.tilesData[tileid].c == "1";
			}
		}
	}
	return false;
};

Player.prototype.walkTo = function (x, y) {
	this.targetX = x;
	this.targetY = y;
};

Player.prototype.run = function (delta) {
	//Move player towards target if necessary
	var speedMult = delta / (1000/60);	//Target is 60 FPS so multiply speed by this
	if (this.targetX != -1 && this.targetY != -1 && (this.position.x != this.targetX || this.position.y != this.targetY)) {
		var dx = this.targetX - this.position.x;
		var dy = this.targetY - this.position.y;
		this.angle = Math.atan2(dy, dx);
		this.direction = Math.round(this.angle / 0.78539816339744830961566084581988 + 4) % 8;	//45 degrees
		this.running = true;
		
		if (Math.sqrt(dx*dx + dy*dy) > this.speed*speedMult) {
			this.move(this.position.x + Math.cos(this.angle)*this.speed*speedMult, this.position.y + Math.sin(this.angle)*this.speed*speedMult, false);
		} else {
			this.move(this.targetX, this.targetY, false);
		}
	} else if (this.running) {
		this.running = false;
	}
	
	//Update frame if we have reached a barrier
	if (this.currentFrame + 1 < this.direction*12 + (this.running ? 4 : 0) || this.currentFrame + 1 >= this.direction*12 + (this.running ? 12 : 4)) {
		this.currentFrame = this.direction*12 + (this.running ? 4 : 0);
	}
	
	//Reposition the dom names
	this.nameDom.css("left", (this.position.x + this.world.position.x - this.nameDom.width()/2) + "px").css("top", (this.position.y + this.world.position.y - 80) + "px")
};