var PlayerMovement = function(speed, minBoundary, maxBoundary) {
    this.xMove = 0;
    this.yMove = 0;
    this.speed = speed;
    this.minBoundary = minBoundary;
    this.maxBoundary = maxBoundary;
    this.constraints = [];
    this.clearConstraints();
}

PlayerMovement.prototype.addConstraint = function(constraint) {
    this.constraints.push(constraint);
}

PlayerMovement.prototype.clearConstraints = function() {
    this.constraints = [];
    this.constraints.push(new MovementConstraint(new Point(-100, -1), new Point(this.minBoundary.x, -1))); //top
    this.constraints.push(new MovementConstraint(new Point(-1, -100), new Point(-1, this.minBoundary.y))); //left
    this.constraints.push(new MovementConstraint(new Point(this.maxBoundary.x, -1), new Point(this.maxBoundary.x + 100, -1))); //bottom
    this.constraints.push(new MovementConstraint(new Point(-1, this.maxBoundary.y), new Point(-1, this.maxBoundary.y + 100))); //right
}

PlayerMovement.prototype.update = function(point) {
    this.yMove = getYMove(this.yMove);
    this.xMove = getXMove(this.xMove);
    
    if (this.xMove === 0 && this.yMove === 0) {
        return point;
    }
    
    var angle = Math.atan2(this.yMove, this.xMove);
    var dx = Math.cos(angle) * this.speed;
    var dy = Math.sin(angle) * this.speed;
    
    var newPoint = new Point(point.x + dx, point.y + dy);

    var constraint;
    for (constraint of this.constraints) {
        constraint.constrainPoint(point, newPoint);
    }
    
    return newPoint;
}

function getXMove(currentDirection) {
    var xDirection = 0;
    
    if (PlayerInput.getRight() === 1 && PlayerInput.getLeft() === 0) {
        xDirection = 1;
    } else if (PlayerInput.getLeft() === 1 && PlayerInput.getRight() === 0) {
        xDirection = -1;
    } else if (PlayerInput.getRight() === 1 && PlayerInput.getLeft() === 1) {
        xDirection = currentDirection;
    }
    
    return xDirection;
}

function getYMove(currentDirection) {
    var yDirection = 0;
    
    if (PlayerInput.getDown() === 1 && PlayerInput.getUp() === 0) {
        yDirection = 1;
    } else if (PlayerInput.getUp() === 1 && PlayerInput.getDown() === 0) {
        yDirection = -1;
    } else if (PlayerInput.getUp() === 1 && PlayerInput.getDown() === 1) {
        yDirection = currentDirection;
    }
    
    return yDirection;
}