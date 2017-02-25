import { Component, AfterViewInit, Inject } from '@angular/core';
import { Game } from '../models/game';
import { Socket } from '../models/socket';

declare var PIXI: any;
declare var io: any;

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.html'
})
export class Home implements AfterViewInit {

    public innerWidth: number;
    public innerHeight: number;
    public game: Game;

    public constructor( @Inject('Window') window: Window) {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
    }

    public ngAfterViewInit() {
        this.game = new Game(this.innerWidth, this.innerHeight);

        let socket: Socket = Socket.getInstance();
        socket.onWorldReady((data: any) => {

        });
        socket.onPlayerReady((data: any) => {
            this.game.loadMainPlayer(data);
            this.game.mainPlayer.onPlayerMoved = (item: any) => {
                this.game.stage.position.x = - item.position.x + this.innerWidth / 2;
                this.game.stage.position.y = - item.position.y + this.innerHeight / 2;
            };
        });
        socket.onNewPlayerReady((data: any) => {
            this.game.loadNewPlayer(data);
        });
    }

}
