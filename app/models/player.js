"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var position_1 = require("./position");
var socket_1 = require("./socket");
var Player = (function () {
    function Player(data) {
        console.log('Constructed', data.id);
        this.id = data.id;
        this.position = new position_1.Position(data.position.x, data.position.y);
        this.angle = data.angle;
        this.name = data.name;
        socket_1.Socket.getInstance().on('player.' + this.id + '.moved', function (data) {
            //this.onMove(data);
        });
    }
    Player.prototype.getRenderableItem = function () {
        if (this.item === undefined) {
            this.constructItem();
        }
        return this.item;
    };
    Player.prototype.constructItem = function () {
        var item = PIXI.Sprite.fromImage('/img/ship.png');
        item.position.x = this.position.x;
        item.position.y = this.position.y;
        item.scale.x = 1;
        item.scale.y = 1;
        item.id = this.id;
        this.item = item;
    };
    Player.prototype.moveTo = function (x, y) {
        socket_1.Socket.getInstance().emit('move', { x: x, y: y });
    };
    Player.prototype.onMove = function (data) {
        this.position.x = data.position.x;
        this.position.y = data.position.y;
        this.item.x = this.position.x;
        this.item.y = this.position.y;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map