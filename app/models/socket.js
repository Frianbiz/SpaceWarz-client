"use strict";
var Socket = (function () {
    function Socket() {
        this.socket = io.connect('localhost:25565');
    }
    Socket.getInstance = function () {
        if (this.instance === undefined) {
            this.instance = new Socket();
        }
        return this.instance;
    };
    Socket.prototype.onWorldReady = function (callback) {
        this.socket.on('world', function (data) {
            callback(data.world);
        });
    };
    Socket.prototype.onPlayerReady = function (callback) {
        this.socket.on('player', function (data) {
            PIXI.loader.add('/img/char.json').load();
            callback(data);
        });
    };
    Socket.prototype.on = function (event, callback) {
        console.log('Subscribed to socket event', event);
        this.socket.on(event, callback);
    };
    Socket.prototype.emit = function (event, data) {
        console.log('Emited event', event, data);
        this.socket.emit(event, data);
    };
    return Socket;
}());
exports.Socket = Socket;
//# sourceMappingURL=socket.js.map