import { Projectiles } from './projectiles';
import { Socket } from './socket';
import { Key } from './../interaction/key';
import { Map } from './map';
import { Player } from '../models/player';

declare var PIXI: any;

export class Game {

    public fps: number;
    //
    public mainPlayer: Player;
    public otherPlayers: Player[] = [];
    public Projectiles: Projectiles[] = [];
    public stage: any;
    public renderer: any;
    public map: Map;
    public socket: Socket;

    public spaceKey: Key = new Key(32);
    public leftKey: Key = new Key(37);
    public rightKey: Key = new Key(39);
    public upKey: Key = new Key(38);
    public downKey: Key = new Key(40);

    public constructor(innerWidth: number, innerHeight: number) {
        this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, { antialias: true }, false);
        $('.gameWrapper').append(this.renderer.view);

        this.addStage();
        this.defineTicker();
        this.drawMap();
        this.spaceKey.press = this.shootEventEmitter;

        this.leftKey.press = () => {
            this.mainPlayer.moveToLeft();
        }

        this.upKey.press = () => {
            this.mainPlayer.moveForward();
        }

        this.downKey.press = () => {
            this.mainPlayer.moveBackward();
        }

        this.rightKey.press = () => {
            this.mainPlayer.moveRight();
        }

        Socket.getInstance().onProjectileEmitted((data: any) => {
            let proj: Projectiles = new Projectiles(data.id, data.position, data.angle, data.velocity, data.damage);
            this.stage.addChild(proj.getRenderableItem());
        })
    }

    private addStage(): void {
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
    }


    public loadMainPlayer(item: any): void {
        this.mainPlayer = new Player(item.myself);
        this.stage.addChild(this.mainPlayer.getRenderableItem());
    }

    public loadNewPlayer(item: any): void {
        let player: Player = new Player(item);
        this.otherPlayers.push(player);
        this.stage.addChild(player.getRenderableItem());
    }

    private drawMap(): void {
        this.map = new Map();
        this.stage.addChild(this.map.getRenderableItem());
    }

    private defineTicker(): void {
        let ticker = PIXI.ticker.shared;
        let _self = this;
        ticker.autoStart = false;
        ticker.add(function (time: number) {
            _self.renderer.render(_self.stage);
        });
    }

    private shootEventEmitter(): void {
        Socket.getInstance().emit('shoot', {});
    };
}
