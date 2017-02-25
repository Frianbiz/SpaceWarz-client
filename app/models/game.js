"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("./map");
var player_1 = require("../models/player");
var Game = (function () {
    function Game(innerWidth, innerHeight) {
        this.otherPlayers = [];
        this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, { antialias: true }, false);
        $('.gameWrapper').append(this.renderer.view);
        this.onStageClick.bind(this);
        this.addStage();
        this.defineTicker();
        this.drawMap();
    }
    Game.prototype.addStage = function () {
        var _this = this;
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.on('click', function (e) {
            _this.onStageClick(e);
        });
        this.stage.on('tap', function (e) {
            _this.onStageClick(e);
        });
    };
    Game.prototype.onStageClick = function (e) {
        this.mainPlayer.moveTo(e.data.global.x, e.data.global.y);
    };
    Game.prototype.loadMainPlayer = function (item) {
        this.mainPlayer = new player_1.Player(item);
        this.stage.addChild(this.mainPlayer.getRenderableItem());
    };
    Game.prototype.loadNewPlayer = function (item) {
        var player = new player_1.Player(item);
        this.otherPlayers.push(player);
        this.stage.addChild(player.getRenderableItem());
    };
    Game.prototype.drawMap = function () {
        this.map = new map_1.Map();
        this.stage.addChild(this.map.getRenderableItem());
    };
    Game.prototype.defineTicker = function () {
        var ticker = PIXI.ticker.shared;
        var _self = this;
        ticker.autoStart = false;
        ticker.add(function (time) {
            _self.renderer.render(_self.stage);
        });
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map