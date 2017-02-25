import { Renderable } from './../interfaces/renderable';

export class Map implements Renderable {

    public item: any;

    public constructor() {
        let texture = PIXI.Texture.fromImage('/img/ground.png');
        this.item = new PIXI.extras.TilingSprite(texture, 4000, 4000);
    }

    public getRenderableItem(): any {
        return this.item;
    }

}
