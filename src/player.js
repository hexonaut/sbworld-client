Player = function (textures, id, name, male) {
	PIXI.MovieClip.call(this, textures);
	
	this.id = id;
	this.name = name;
	this.targetX = -1;
	this.targetY = -1;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	/*var state = 0;	//0 = standing, 1 = running
	var frame = 0;
	var direction = 0;
	var speed = 3;
	var frameDur = 100;
	var currFrameDur = 0;
	var scope = this;
	var graphic = new chesterGL.Block([0, 0, 128, 128]);
	var nameGraphic = chesterGL.settings.webglMode ? new chesterGL.LabelBlock(name, "14pt sans-serif") : null;
	if (nameGraphic != null) {
		nameGraphic.setPosition([0, 25, 0]);
		graphic.addChild(nameGraphic);
	}*/
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
	return this.checkCollision(x - 13, y - 8) || this.checkCollision(x - 13, y + 23) || this.checkCollision(x + 13, y - 8) || this.checkCollision(x + 13, y + 23);
};

Player.prototype.checkCollision = function (x, y) {
	for (var i in chesterGL.TMXBlock.maps["map.tmx"]["layers"]) {
		var blocks = chesterGL.TMXBlock.maps["map.tmx"]["layers"][i].hashBlocks;
		var index = Math.floor((1280 - y) / 32)*50 + Math.floor(x / 32);
		if (blocks[index] != null && blocks[index].props != null && blocks[index].props.c == "1") return true;
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
	if (scope.targetX != -1 && scope.targetY != -1 && (scope.x != scope.targetX || scope.y != scope.targetY)) {
		var dx = scope.targetX - scope.x;
		var dy = scope.targetY - scope.y;
		scope.angle = Math.atan2(dy, dx);
		direction = Math.round(scope.angle / 0.78539816339744830961566084581988 + 3) % 8;	//45 degrees
		if (direction < 0) direction += 8;
		state = 1;
		
		if (Math.sqrt(dx*dx + dy*dy) > speed*speedMult) {
			scope.move(scope.x + Math.cos(scope.angle)*speed*speedMult, scope.y + Math.sin(scope.angle)*speed*speedMult, false);
		} else {
			scope.move(scope.targetX, scope.targetY, false);
		}
	} else if (state == 1) {
		state = 0;
		frame = 0;
	}
	
	//Do animation
	graphic.setPosition([scope.x, scope.y + 35, 0]);
	currFrameDur += delta;
	while (currFrameDur >= frameDur) {
		var actualFrame = state == 1 ? frame + 4 : frame;
		graphic.setFrame([actualFrame*128, direction*128, 128, 128]);
		frame++;
		if (state == 1) {
			if (frame >= 8) frame = 0;
		} else {
			if (frame >= 4) frame = 0;
		}
		
		currFrameDur -= frameDur;
	}
};