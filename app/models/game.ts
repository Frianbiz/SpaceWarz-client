import { Map } from './map';
import { Resource } from '../models/resource';
import { Player } from '../models/player';
import { Socket } from '../models/socket';

declare var PIXI: any;

export class Game {

    public fps: number;
    //
    public mainPlayer: Player;
    public stage: any;
    public renderer: any;
    public map: Map;
    public socket: any;

    public constructor(innerWidth: number, innerHeight: number) {
        this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, { antialias: true }, false);
        $('.gameWrapper').append(this.renderer.view);

        this.onStageClick.bind(this);

        this.addStage();
        this.defineTicker();
        this.drawMap();
    }

    private addStage(): void {
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.on('click', (e: any) => {
            this.onStageClick(e);
        });
        this.stage.on('tap', (e: any) => {
            this.onStageClick(e);
        });
    }

    public onStageClick(e: any): void {
        let io = Socket.getInstance();
        this.mainPlayer.moveTo(e.data.global.x, e.data.global.y);
    }


    public loadMainPlayer(item: any): void {
        this.mainPlayer = new Player(item);
        this.stage.addChild(this.mainPlayer.getRenderableItem());
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
}
