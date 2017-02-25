import { Position } from './position';
import { Renderable } from './../interfaces/renderable';
import { Socket } from './socket';

export class Player implements Renderable {

    public id: string;
    public name: string;
    // position
    public position: Position;
    public angle: number;
    // drawable
    public item: any;

    public constructor(data: any) {
        console.log('Constructed', data.id);
        this.id = data.id;
        this.position = new Position(data.position.x, data.position.y);
        this.angle = data.angle;
        this.name = data.name;

        Socket.getInstance().on('player.' + this.id + '.moved', (data: any) => {
            this.onMove(data);
        });
    }

    public getRenderableItem(): any {
        if (this.item === undefined) {
            this.constructItem();
        }

        return this.item;
    }

    public constructItem(): void {
        let item: any = PIXI.Sprite.fromImage('/img/ship.png');
        item.position.x = this.position.x;
        item.position.y = this.position.y;
        item.scale.x = 1;
        item.scale.y = 1;
        item.id = this.id;

        this.item = item;
    }

    public moveTo(x: number, y: number): void {
        Socket.getInstance().emit('moveTo', { x: x, y: y });
    }

    public onMove(data: any): void {
        this.position.x = data.position.x;
        this.position.y = data.position.y;
        this.item.x = this.position.x;
        this.item.y = this.position.y;
    }
}
