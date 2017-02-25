"use strict";
var socket_1 = require('./socket');
var Player = (function () {
    function Player(data) {
        var _this = this;
        console.log('Constructed', data.id);
        this.id = data.id;
        this.x = data.position.x;
        this.y = data.position.y;
        this.name = data.name;
        socket_1.Socket.getInstance().on('player.' + this.id + '.moved', function (data) {
            _this.onMove(data);
        });
    }
    Player.prototype.getRenderableItem = function () {
        if (this.item === undefined) {
            this.constructItem();
        }
        return this.item;
    };
    Player.prototype.constructItem = function () {
        var item = PIXI.Sprite.fromImage('/img/player.png');
        item.position.x = this.x;
        item.position.y = this.y;
        item.scale.x = 1;
        item.scale.y = 1;
        item.id = this.id;
        this.item = item;
    };
    Player.prototype.moveTo = function (x, y) {
        socket_1.Socket.getInstance().emit('moveTo', { x: x, y: y });
    };
    Player.prototype.onMove = function (data) {
        this.x = data.position.x;
        this.y = data.position.y;
        this.item.x = this.x;
        this.item.y = this.y;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map