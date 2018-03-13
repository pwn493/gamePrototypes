var RandomAvoiderMovement = function(speed, avoidee, changeRate, proximity, centerPoint, pointDeviation) {
    this.speed = speed;
    this.avoidee = avoidee;
    this.direction = new Point(0,0).randomAngle();
    this.changeRate = changeRate;
    this.changeCounter = Math.random() * changeRate;
    this.proximity = proximity;
    this.centerPoint = centerPoint;
    this.pointDeviation = pointDeviation;
}

RandomAvoiderMovement.prototype.update = function(point) {
    if (point.distanceFrom(this.avoidee.point) <= this.proximity) {
        this.direction = this.avoidee.point.angle(point);
    }
    
    if (this.changeCounter <= 0) {
        this.changeCounter = this.changeRate;
        
        if (this.centerPoint.distanceFrom(point) > this.pointDeviation) {
            this.direction = point.angle(this.centerPoint);
        } else {
            this.direction = point.randomAngle();
        }
    }
    
    this.changeCounter = this.changeCounter - 1;
    
    return updatePosition(this.direction, point, this.speed);
}

function updatePosition(angle, point, speed) {
    var dx = Math.cos(angle);
    var dy = Math.sin(angle);
    
    return new Point(point.x + dx * speed, point.y + dy * speed);
}