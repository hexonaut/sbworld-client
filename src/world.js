World = function (tilesAtlas, mapData) {
	PIXI.DisplayObjectContainer.call(this);
	
	//Meta data
	var map = $($(mapData).get(2));
	var tw = Number(map.attr("tilewidth"));
	var th = Number(map.attr("tileheight"));
	var w = Number(map.attr("width"));
	var h = Number(map.attr("height"));
	var tilesetData = map.find("tileset");
	var imageData = tilesetData.find("img");
	var iw = Number(imageData.attr("width"));
	var scope = this;
	
	this.tw = tw;
	this.th = th;
	this.width = w*tw;
	this.height = h*th;
	
	//Tileset data
	this.tilesData = [];
	tilesetData.find("tile").each(function (i, t) {
		var tileData = $(t);
		var tileProps = {};
		tileData.find("properties").first().find("property").each(function (o, p) {
			var propData = $(p);
			tileProps[propData.attr("name")] = propData.attr("value");
		});
		scope.tilesData[tileData.attr("id")] = tileProps;
	});
	
	//Read tile data
	map.find("layer, objectgroup").each(function (i, l) {
		var layer = new PIXI.DisplayObjectContainer();
		layer.tiles = [];
		if (l.tagName.toLowerCase() == "layer") {
			//Tile Layer
			var layerData = window.atob($(l).find("data").first().text().trim());
			for (var o = 0; o < layerData.length; o += 4) {
				var tileid = ((layerData.charCodeAt(o + 3) << 24) | (layerData.charCodeAt(o + 2) << 16) | (layerData.charCodeAt(o + 1) <<  8) | layerData.charCodeAt(o) >>> 0) - 1;
				if (tileid != -1) {
					var tile = new PIXI.Sprite(new PIXI.Texture(tilesAtlas, {x:(tileid % (iw / tw))*tw, y:Math.floor(tileid / (iw / tw))*th, width:tw, height:th}));
					tile.position.x = ((o >> 2) % w) * tw;
					tile.position.y = Math.floor((o >> 2) / w) * th;
					tile.tileid = tileid;
					layer.addChild(tile);
					layer.tiles[o >> 2] = tile;
				}
			}
		} else {
			//Player layer
			scope.playerLayer = layer;
		}
		scope.addChild(layer);
	});
};

World.constructor = World;
World.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

World.prototype.addPlayer = function (player) {
	this.playerLayer.addChild(player);
	player.world = this;
};

World.prototype.removePlayer = function (player) {
	this.playerLayer.removeChild(player);
	player.world = null;
};