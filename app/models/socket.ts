declare var io: any;

export class Socket {

    public static instance: Socket;
    public socket: any;

    public static getInstance(): Socket {
        if (this.instance === undefined) {
            this.instance = new Socket();
        }

        return this.instance;
    }

    public constructor() {
        this.socket = io.connect('http://192.168.1.76:8080');
        PIXI.loader.add('/img/char.json').load();
    }

    public onWorldReady(callback: (data: any) => void) {
        this.socket.on('world', function (data: any) {
            callback(data.world);
        });
    }

    public onPlayerReady(callback: (data: any) => void) {
        this.socket.on('connected', function (data: any) {
            callback(data);
        });
    }

    public onNewPlayerReady(callback: (data: any) => void) {
        this.socket.on('newPlayerConnected', function (data: any) {
            callback(data);
        });
    }

    public onProjectileEmitted(callback: (data: any) => void) {
        this.socket.on('projectileEmitted', function (data: any) {
            callback(data);
        });
    }

    public onProjectileMoved(id: String, callback: (data: any) => void) {
        this.socket.on('projectile.' + id + '.moved', function (data: any) {
            callback(data);
        });
    }

    public on(event: string, callback: (data: any) => void): void {
        console.log('Subscribed to socket event', event);
        this.socket.on(event, callback);
    }

    public emit(event: string, data: any = undefined) {
        console.log('Emited event', event, data);
        this.socket.emit(event, data);
    }

}
