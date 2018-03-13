var Circle = function(color, size, point, movement) {
    this.color = color;
    this.size = size;
    this.point = point;
    this.movement = movement;
}

Circle.prototype.getTypeName = function() {
    return "circle";
}

Circle.prototype.draw = function(gameContext) {
    gameContext.beginPath();
    gameContext.arc(this.point.x, this.point.y, this.size, 0, 2 * Math.PI, false);
    gameContext.fillStyle = this.color;
    gameContext.fill();
}

Circle.prototype.update = function() {
    this.point = this.movement.update(this.point);
}

Circle.prototype.getClosestPoint = function(otherPoint) {
    var angle = this.point.angle(otherPoint);
    var x = Math.cos(angle) * this.size;
    var y = Math.sin(angle) * this.size;
    
    return new Point(x, y);
}

Circle.prototype.isInteriorPoint = function(point) {
    return this.point.distanceFrom(point) <= this.size;
}
