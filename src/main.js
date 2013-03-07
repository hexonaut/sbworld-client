//Keep canvas at full screen
$(window).resize(resize);
window.onorientationchange = resize;

var screenWidth = 800;
var screenHeight = 600;

function assetsLoaded (mapData) {
	//Init renderer
	renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight);
	stage = new PIXI.Stage;
	document.body.appendChild(renderer.view);
	
	//Game intializations
	world = new World(new PIXI.Texture.fromImage("magecity.png").baseTexture, mapData);
	stage.addChild(world);
	
	//Start render loop
	resize();
	requestAnimFrame(run);
}

function resize () {
	screenWidth = $(window).width();
	screenHeight = $(window).height();

	renderer.resize(screenWidth, screenHeight);
}

function run () {
	
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

/*$(function () {
	var offsetX = 0;
	var offsetY = 0;
	var isMouseDown = false;
	var stage = null;
	var players = [];
	var me = null;
	var tmx = null;
	var currMPF = 0;
	var deltaMPF = 0;
	var fps = null;
	var mouseX = 0;
	var mouseY = 0;
	var server = null;
	var deltaEcho = 0;
	var lastEchoX = 0;
	var lastEchoY = 0;
	var lastEchoTargetX = 0;
	var lastEchoTargetY = 0;
	var mapWidth = 1600;
	var mapHeight = 1280;
	var userObj = SPI.getQueryParameters();
	
	function run (delta) {
		currMPF = currMPF*0.9 + delta*0.1;
		deltaMPF += delta;
		deltaEcho += delta;
		
		var screenWidth = window.innerWidth;
		var screenHeight = window.innerHeight;
		
		if (me != null) {
			//Walk to mouse coords if mouse is down
			if (isMouseDown) me.walkTo(mouseX + offsetX, mouseY + offsetY);
			
			//Center screen on me
			offsetX = me.x - screenWidth/2;
			offsetY = me.y - screenHeight/2;
			
			//Clamp to the edges of the world
			if (offsetX < 0) offsetX = 0;
			if (offsetY < 0) offsetY = 0;
			if (offsetX > mapWidth - screenWidth) offsetX = mapWidth - screenWidth;
			if (offsetY > mapHeight - screenHeight) offsetY = mapHeight - screenHeight;
			
			//Adjust map position
			if (chesterGL.webglMode) {
				tmx.setPosition([-offsetX, -offsetY, 0]);
			} else {
				for (var i in tmx.children) {
					tmx.children[i].setPosition([-offsetX, -offsetY, 0]);
				}
			}
			
			if (server != null) {
				if (me.x != lastEchoX || me.y != lastEchoY || me.targetX != lastEchoTargetX || me.targetY != lastEchoTargetY) {
					//Send echo data once every 200ms
					if (deltaEcho >= 200) {
						server.send("echo\n" + me.x + "\n" + me.y + "\n" + me.targetX + "\n" + me.targetY);
						deltaEcho -= 200;
					}
					lastEchoX = me.x;
					lastEchoY = me.y;
					lastEchoTargetX = me.targetX;
					lastEchoTargetY = me.targetY;
				} else {
					//Nothing has changed so slow the timer down to once every 2 seconds
					if (deltaEcho >= 2000) {
						server.send("echo\n" + me.x + "\n" + me.y + "\n" + me.targetX + "\n" + me.targetY);
						deltaEcho -= 2000;
					}
				}
			}
		}
		
		//Update FPS once every second
		if (fps != null) {
			fps.setPosition([60, 20, 0]);
			if (deltaMPF >= 1000) {
				fps.setText(Math.round(1000 / currMPF) + " FPS", true);
				deltaMPF -= 1000;
			}
		}
	}
	
	function mousedown (e) {
		isMouseDown = true;
		mouseX = e.pageX;
		mouseY = window.innerHeight - e.pageY;
		
		e.preventDefault();
	}
	
	function mouseup (e) {
		isMouseDown = false;
		
		e.preventDefault();
	}
	
	function mousemove (e) {
		mouseX = e.pageX;
		mouseY = window.innerHeight - e.pageY;
		
		e.preventDefault();
	}
	
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
			players[id] = new Player(id, data[2], data[3] == "1");
			players[id].add(tmx.children[3]);
		} else if (data[0] == "userleave") {
			var id = Number(data[1]);
			players[id].remove(tmx.children[3]);
			delete players[id];
		} else if (data[0] == "echo") {
			var id = Number(data[1]);
			var x = Number(data[2]);
			var y = Number(data[3]);
			var targetX = Number(data[4]);
			var targetY = Number(data[5]);
			var user = players[id];
			var dx = x - user.x;
			var dy = y - user.y;
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
		players[id] = new Player(id, name, male);
		players[id].add(tmx.children[3]);
		if (isMe) {
			//This is me
			me = players[id];
			while (true) {
				var x = Math.random() * mapWidth;
				var y = Math.random() * mapHeight;
				if (!me.checkBodyCollision(x, y)) {
					me.move(x, y, true);
					break;
				}
			}
		}
	}
	
	//This will auto resize the canvas to fit the screen always
	function resizeCanvasToScreen () {
		var canvas = document.getElementById("canvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		chesterGL.canvasResized();
		chesterGL.setupPerspective();
	}
	$(window).resize(resizeCanvasToScreen);
	
	//Init Renderer
	chesterGL.setup("canvas");
	chesterGL.loadAsset('texture', 'magecity.png');
	chesterGL.loadAsset('texture', 'hero.png');
	chesterGL.loadAsset('texture', 'heroine.png');
	chesterGL.TMXBlock.loadTMX("map.tmx");
	chesterGL.assetsLoaded("all", function () {
		chesterGL.setupPerspective();
		
		//Setup stage
		stage = new chesterGL.Block(null, chesterGL.Block.TYPE.SCENE);
		stage.setUpdate(run);
		chesterGL.setRunningScene(stage);
		
		//Setup world
		tmx = new chesterGL.TMXBlock('map.tmx');
		stage.addChild(tmx);
		
		//Add FPS text -- text only works in webGL mode right now
		if (chesterGL.settings.webglMode) {
			fps = new chesterGL.LabelBlock("60 FPS");
			stage.addChild(fps);
		}
		
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
		
		chesterGL.run();
	});
	resizeCanvasToScreen();
	
	//Listener and remove jquery mobile garbage
	$("body").live("vmousedown", mousedown).live("vmouseup", mouseup).live("vmousemove", mousemove);
	$(".ui-loader").remove();
});*/