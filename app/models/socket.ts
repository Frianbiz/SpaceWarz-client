declare var io: any;

export class Socket  {

    public static instance: Socket;
    public socket: any;

    public static getInstance(): Socket {
        if (this.instance === undefined)
        {
            this.instance = new Socket();
        }

        return this.instance;
    }

    public constructor() {
        this.socket = io.connect('localhost:25565');
    }

    public onWorldReady(callback: (data: any) => void) {
        this.socket.on('world', function(data: any) {
            callback(data.world);
        });
    }

    public onPlayerReady(callback: (data: any) => void) {
        this.socket.on('player', function(data: any) {
            PIXI.loader.add('/img/char.json').load();
            callback(data);
        });
    }


    public on(event: string, callback: (data: any) => void): void {
        console.log('Subscribed to socket event', event);
        this.socket.on(event, callback);
    }

    public emit(event: string, data: any) {
        console.log('Emited event', event, data);
        this.socket.emit(event, data);
    }

}
