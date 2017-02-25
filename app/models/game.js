"use strict";
var map_1 = require('./map');
var player_1 = require('../models/player');
var socket_1 = require('../models/socket');
var Game = (function () {
    function Game(innerWidth, innerHeight) {
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
        var io = socket_1.Socket.getInstance();
        this.mainPlayer.moveTo(e.data.global.x, e.data.global.y);
    };
    Game.prototype.loadMainPlayer = function (item) {
        this.mainPlayer = new player_1.Player(item);
        this.stage.addChild(this.mainPlayer.getRenderableItem());
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