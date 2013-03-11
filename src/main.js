//Keep canvas at full screen
$(window).resize(resize);
window.onorientationchange = resize;

var offsetX = 0;
var offsetY = 0;
var screenWidth = 800;
var screenHeight = 600;
var world;
var stage;
var renderer;
var server;
var players = [];
var lastTime = 0;
var me;
var currMPF = 0;
var deltaMPF = 0;
var mouseX = 0;
var mouseY = 0;
var deltaEcho = 0;
var lastEchoX = 0;
var lastEchoY = 0;
var lastEchoTargetX = 0;
var lastEchoTargetY = 0;
var isMouseDown = false;
var userObj = SPI.getQueryParameters();
var maleTextures = [];
var femaleTextures = [];
var fps;

function onOpen (e) {
	console.log("Connected");
	server.send("login\n" + userObj.name + "\n" + (Math.random() >= 0.5 ? "1" : "0"));
}

function onClose (e) {
	console.log("Closed");
}

function onMessage (e) {
	var data = e.data.split("\n");
	if (data[0] != "echo") console.log("Message: " + e.data);
	if (data[0] == "users") {
		players = [];
		for (var i = 1; i < data.length; i += 3) {
			spawnPlayer(Number(data[i]), data[i + 1], data[i + 2] == "1", i == 1);
		}
	} else if (data[0] == "userjoin") {
		var id = Number(data[1]);
		spawnPlayer(id, data[2], data[3] == "1", false);
	} else if (data[0] == "userleave") {
		var id = Number(data[1]);
		world.removePlayer(players[id]);
		players[id].nameDom.remove();
		delete players[id];
	} else if (data[0] == "echo") {
		var id = Number(data[1]);
		var x = Number(data[2]);
		var y = Number(data[3]);
		var targetX = Number(data[4]);
		var targetY = Number(data[5]);
		var user = players[id];
		var dx = x - user.position.x;
		var dy = y - user.position.y;
		if (Math.sqrt(dx*dx + dy*dy) >= 250) user.move(x, y, true);
		user.walkTo(targetX, targetY);
	}
}

function onError (e) {
	console.log("Error: " + e);
	
	//Do local testing
	server = null;
	spawnPlayer(0, "Multiplayer Not Available", Math.random() >= 0.5, true);
}

function spawnPlayer (id, name, male, isMe) {
	players[id] = new Player(male ? maleTextures : femaleTextures, id, name, male);
	world.addPlayer(players[id]);
	if (isMe) {
		//This is me
		me = players[id];
		while (true) {
			var x = Math.random() * world.width;
			var y = Math.random() * world.height;
			if (!me.checkBodyCollision(x, y)) {
				me.move(x, y, true);
				break;
			}
		}
		$("body").live("vmousedown", mousedown).live("vmouseup", mouseup).live("vmousemove", mousemove);
	}
}

function mousedown (e) {
	isMouseDown = true;
	mouseX = e.pageX;
	mouseY = e.pageY;
	
	e.preventDefault();
}

function mouseup (e) {
	isMouseDown = false;
	
	e.preventDefault();
}

function mousemove (e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
	
	e.preventDefault();
}

function assetsLoaded (mapData) {
	//Init renderer
	renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight);
	stage = new PIXI.Stage;
	document.body.appendChild(renderer.view);
	
	//Game intializations
	var maleTextureAtlas = new PIXI.Texture.fromImage("hero.png").baseTexture;
	for (var i = 0; i < 8*12; i++) {
		maleTextures.push(new PIXI.Texture(maleTextureAtlas, {x:(i%12)*128, y:Math.floor(i/12)*128, width:128, height:128}));
	}
	var femaleTextureAtlas = new PIXI.Texture.fromImage("heroine.png").baseTexture;
	for (var i = 0; i < 8*12; i++) {
		femaleTextures.push(new PIXI.Texture(femaleTextureAtlas, {x:(i%12)*128, y:Math.floor(i/12)*128, width:128, height:128}));
	}
	
	world = new World(new PIXI.Texture.fromImage("magecity.png").baseTexture, mapData);
	stage.addChild(world);
	
	//Setup fps text
	fps = $(document.createElement("span")).css("position", "absolute").css("left", "8px").css("bottom", "3px").css("font-size", "30px").css("font-family", "'Lucida Sans Unicode', 'Lucida Grande', sans-serif").text("60 FPS");
	$("body").append(fps);
	
	//Connect to server
	try {
		server = new WebSocket("ws://world.sandboxd.com:9500/");
		if (server.protocol == undefined) throw "Android browser workaround.";
		server.onopen = onOpen;
		server.onclose = onClose;
		server.onmessage = onMessage;
		server.onerror = onError;
	} catch (e) {
		//No websocket -- just do local test
		server = null;
		spawnPlayer(0, "Multiplayer Not Available", Math.random() >= 0.5, true);
	}
	
	//Get rid of jquery-mobile garbage
	$("div").remove();
	
	//Start render loop
	resize();
	lastTime = new Date().getTime();
	requestAnimFrame(run);
}

function resize () {
	if (screenWidth != $(window).width() || screenHeight != $(window).height()) {
		screenWidth = $(window).width();
		screenHeight = $(window).height();
	
		renderer.resize(screenWidth, screenHeight);
	}
}

function run () {
	var currTime = new Date().getTime();
	var delta = currTime - lastTime;
	lastTime = currTime;

	//Update all players
	for (var i in players) {
		players[i].run(delta);
	}

	currMPF = currMPF*0.9 + delta*0.1;
	deltaMPF += delta;
	deltaEcho += delta;

	if (me != null) {
		//Walk to mouse coords if mouse is down
		if (isMouseDown) me.walkTo(mouseX + offsetX, mouseY + offsetY);

		//Center screen on me
		offsetX = me.position.x - screenWidth/2;
		offsetY = me.position.y - screenHeight/2;

		//Clamp to the edges of the world
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		if (offsetX > world.width - screenWidth) offsetX = world.width - screenWidth;
		if (offsetY > world.height - screenHeight) offsetY = world.height - screenHeight;

		//Adjust map position
		world.position.x = -offsetX;
		world.position.y = -offsetY;

		if (server != null) {
			if (me.position.x != lastEchoX || me.position.y != lastEchoY || me.targetX != lastEchoTargetX || me.targetY != lastEchoTargetY) {
				//Send echo data once every 200ms
				if (deltaEcho >= 200) {
					server.send("echo\n" + me.position.x + "\n" + me.position.y + "\n" + me.targetX + "\n" + me.targetY);
					deltaEcho -= 200;
				}
				lastEchoX = me.position.x;
				lastEchoY = me.position.y;
				lastEchoTargetX = me.targetX;
				lastEchoTargetY = me.targetY;
			} else {
				//Nothing has changed so slow the timer down to once every 2 seconds
				if (deltaEcho >= 2000) {
					server.send("echo\n" + me.position.x + "\n" + me.position.y + "\n" + me.targetX + "\n" + me.targetY);
					deltaEcho -= 2000;
				}
			}
		}
	}
	
	//Update FPS once every second
	if (deltaMPF >= 1000) {
		fps.text(Math.round(1000 / currMPF) + " FPS");
		deltaMPF -= 1000;
	}
	
	//Render the scene
	renderer.render(stage);
	requestAnimFrame(run);
}

$(function () {
	//Load the map data
	mapRequest = new AjaxRequest();
	mapRequest.onreadystatechange = function () {
		if (mapRequest.readyState == 4 && mapRequest.status == 200) {
			assetsLoaded(mapRequest.response);
		}
	};

	mapRequest.open("GET", "map.tmx", true);
	mapRequest.send();
});