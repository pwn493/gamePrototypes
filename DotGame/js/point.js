var Point = function (x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.distanceFrom = function(point) {
    var dx = this.x - point.x;
    var dy = this.y - point.y;
    return Math.sqrt(dx * dx + dy * dy);
}

Point.prototype.angle = function(point) {
    var dx = point.x - this.x;
    var dy = point.y - this.y;
    return Math.atan2(dy, dx);
}

Point.prototype.randomAngle = function () {
    var angle = Math.random() * 2 * Math.PI;
    return angle - Math.PI;
}