var Obstacle = function(color, upperLeftPoint, bottomRightPoint) {
    this.color = color;
    this.upperLeftPoint = upperLeftPoint;
    this.bottomRightPoint = bottomRightPoint;
}

Obstacle.prototype.width = function (){
    return this.bottomRightPoint.x - this.upperLeftPoint.x;
}

Obstacle.prototype.height = function () {
    return this.bottomRightPoint.y - this.upperLeftPoint.y;
}

Obstacle.prototype.upperRightPoint = function () {
    return new Point(this.bottomRightPoint.x, this.upperLeftPoint.y);
}

Obstacle.prototype.bottomLeftPoint = function () {
    return new Point(this.upperLeftPoint.x, this.bottomRightPoint.y);
}

Obstacle.prototype.getTypeName = function() {
    return "obstacle";
}

Obstacle.prototype.draw = function(gameContext) {
    gameContext.fillStyle = this.color;
    gameContext.fillRect(this.upperLeftPoint.x,this.upperLeftPoint.y,this.width(),this.height());
}

Obstacle.prototype.update = function() {
}

Obstacle.prototype.getClosestPoint = function(otherPoint) {
    var point1 = closestPointOnLine(this.upperLeftPoint, this.upperRightPoint());
    var point2 = closestPointOnLine(this.upperLeftPoint, this.bottomLeftPoint());
    var point3 = closestPointOnLine(this.upperRightPoint(), this.bottomRightPoint);
    var point4 = closestPointOnLine(this.bottomLeftPoint(), this.bottomRightPoint);
    
    var dist1 = point1.distanceFrom(otherPoint);
    var dist2 = point2.distanceFrom(otherPoint);
    var dist3 = point3.distanceFrom(otherPoint);
    var dist4 = point4.distanceFrom(otherPoint);
    
    var dists = [dist1, dist2, dist3, dist4];
    
    if (isSmallest(dist1, dists)) {
        return point1;
    }
    
    if (isSmallest(dist2, dists)) {
        return point2;
    }
    
    if (isSmallest(dist3, dists)) {
        return point3;
    }
    
    if (isSmallest(dist4, dists)) {
        return point4;
    }
    
    return null;
}

function isSmallest(value, items) {
    var i = 0;
    for (; i < items.length; i++) {
        if (value > items[i]) {
            return false;
        }
    }
    
    return true;
}

function closestPointOnLine(lineStart, lineEnd, otherPoint) {
    var x;
    var y;
    if (lineStart.x == lineEnd.x) { // horizontal
        x = lineStart.x;
        y = otherPoint.y;
    } else { // vertical
        x = otherPoint.x;
        y = lineStart.y;
    }
    
    return new Point(forceWithinRange(lineStart.x, lineEnd.x, x), forceWithinRange(lineStart.y, lineEnd.y, y));
}

function forceWithinRange(range1, range2, value) {
    var max,min;
    if (range1 > range2) {
        max = range1;
        min = range2;
    } else {
        max = range2;
        min = range1;
    }
    
    if (value > max) {
        return max;
    } else if (value < min) {
        return min;
    }
    
    return value;
}

function isWithinRange(range1, range2, value) {
    if (value == range1 || value == range2) {
        return true;
    }
    
    var temp = forceWithinRange(range1, range2, value);
    
    return value != range1 && value != range2;
}

Obstacle.prototype.isInteriorPoint = function(point) {
    return isWithinRange(this.upperLeftPoint.x, this.bottomRightPoint.x, point.x) && isWithinRange(this.upperLeftPoint.y, this.bottomRightPoint.y);
}
