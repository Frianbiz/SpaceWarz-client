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

    public width: Number = 85;
    public height: Number = 85;

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
        Socket.getInstance().emit('move', { x: x, y: y });
    }

    public moveToLeft(): void {
        Socket.getInstance().emit('moveLeft');
    }

    public moveForward(): void {
        Socket.getInstance().emit('moveForward');
    }

    public moveBackward(): void {
        Socket.getInstance().emit('moveBackward');
    }

    public moveRight(): void {
        Socket.getInstance().emit('moveRight');
    }

    public stopMoveAngle(): void {
        Socket.getInstance().emit('stopedMovedAngle');
    }

    public stopMoveVelocity(): void {
        Socket.getInstance().emit('stopedMovedVelocity');
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
