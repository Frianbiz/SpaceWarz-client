"use strict";
var Map = (function () {
    function Map() {
        var texture = PIXI.Texture.fromImage('/img/ground.png');
        this.item = new PIXI.extras.TilingSprite(texture, 4000, 4000);
    }
    Map.prototype.getRenderableItem = function () {
        return this.item;
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map