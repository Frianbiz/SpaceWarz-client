"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var game_1 = require('../models/game');
var socket_1 = require('../models/socket');
var Home = (function () {
    function Home(window) {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
    }
    Home.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.game = new game_1.Game(this.innerWidth, this.innerHeight);
        var socket = socket_1.Socket.getInstance();
        socket.onWorldReady(function (data) {
        });
        socket.onPlayerReady(function (data) {
            _this.game.loadMainPlayer(data);
        });
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/home/home.html'
        }),
        __param(0, core_1.Inject('Window')), 
        __metadata('design:paramtypes', [Window])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map