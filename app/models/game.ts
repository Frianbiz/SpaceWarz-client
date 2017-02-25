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
    public projectiles: Projectiles[] = [];
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
        this.leftKey.release = () => {
            this.mainPlayer.stopMoveAngle();
        }

        this.upKey.press = () => {
            this.mainPlayer.moveForward();
        }
        this.upKey.release = () => {
            this.mainPlayer.stopMoveVelocity();
        }

        this.downKey.press = () => {
            this.mainPlayer.moveBackward();
        }
        this.downKey.release = () => {
            this.mainPlayer.stopMoveVelocity();
        }

        this.rightKey.press = () => {
            this.mainPlayer.moveRight();
        }
        this.rightKey.release = () => {
            this.mainPlayer.stopMoveAngle();
        }


        Socket.getInstance().onProjectileEmitted((data: any) => {
            let proj: Projectiles = new Projectiles(data.id, data.position, data.angle, data.velocity, data.damage);
            this.projectiles.push(proj);

            this.stage.addChild(proj.getRenderableItem());
            Socket.getInstance().onProjectileMoved(proj.id, (data: any) => {
                proj.onMove(data);
                this.otherPlayers.forEach((player) => {
                    if (this.hitTestRectangle(proj, player)) {
                        proj.item = PIXI.Sprite.fromImage('/img/boum.png');
                        this.stage.addChild(proj.getRenderableItem());
                    }
                });
            });

            Socket.getInstance().onProjectileDead(proj.id, () => {
                this.stage.removeChild(proj.getRenderableItem());
                _.remove(this.projectiles, { id: proj.id });
            });
        });
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
        console.log(this.otherPlayers);
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

    private hitTestRectangle(projectile: any, ship: any) {
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        hit = false;
        projectile.centerX = projectile.position.x + projectile.width / 2;
        projectile.centerY = projectile.position.y + projectile.height / 2;
        ship.centerX = ship.position.x + ship.width / 2;
        ship.centerY = ship.position.y + ship.height / 2;
        projectile.halfWidth = projectile.width / 2;
        projectile.halfHeight = projectile.height / 2;
        ship.halfWidth = ship.width / 2;
        ship.halfHeight = ship.height / 2;
        vx = projectile.centerX - ship.centerX;
        vy = projectile.centerY - ship.centerY;
        combinedHalfWidths = projectile.halfWidth + ship.halfWidth;
        combinedHalfHeights = projectile.halfHeight + ship.halfHeight;
        if (Math.abs(vx) < combinedHalfWidths) {

            if (Math.abs(vy) < combinedHalfHeights) {

                hit = true;
            } else {

                hit = false;
            }
        } else {

            hit = false;
        }

        return hit;
    };

}

