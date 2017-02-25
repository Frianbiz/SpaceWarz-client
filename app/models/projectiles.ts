import { Socket } from './socket';
import { Position } from './position';
import { Renderable } from './../interfaces/renderable';

export class Projectiles implements Renderable {

    public id: String;
    public position: Position;
    public angle: Number;
    public velocity: Number;
    public damage: Number;
    public width: Number = 5;
    public height: Number = 5;

    public item: any;

    public onMoved: Function;

    public constructor(id: String, position: Position, angle: Number, velocity: Number, damage: Number) {
        this.id = id;
        this.position = position;
        this.angle = angle;
        this.velocity = velocity;
        this.damage = damage;
    }

    public getRenderableItem(): any {
        if (this.item === undefined) {
            this.constructItem();
        }

        return this.item;
    }

    public constructItem(): void {
        let item: any = PIXI.Sprite.fromImage('/img/projectilles.png');
        item.position.x = this.position.x;
        item.position.y = this.position.y;
        item.scale.x = 1;
        item.scale.y = 1;
        item.id = this.id;

        this.item = item;
    }

    public onMove(data: any): void {
        this.position.x = data.position.x;
        this.position.y = data.position.y;
        this.angle = data.angle;
        this.item.anchor.set(0.5);
        this.item.x = this.position.x;
        this.item.y = this.position.y;
        this.item.rotation = this.angle;
    }
}