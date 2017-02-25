export class Key {

    public code: Number;
    public isDown: boolean;
    public isUp: boolean;

    public press: Function;
    public release: Function;

    public constructor(code: Number) {
        this.code = code;
        window.addEventListener(
            "keydown", this.downHandler.bind(this), false
        );
        window.addEventListener(
            "keyup", this.upHandler.bind(this), false
        );
    }

    public upHandler(event: any): void {
        if (event.keyCode === this.code) {
            console.log("upHandler");
            console.log(event);
            if (this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    }

    public downHandler(event: any): void {
        console.log("downHandler");
        if (event.keyCode === this.code) {
            if (this.isDown && this.press) this.press();
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    }

}