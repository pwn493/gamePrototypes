var MovementConstraint = function (minConstrainPoint, maxConstrainPoint) {
    this.minConstrainPoint = minConstrainPoint;
    this.maxConstrainPoint = maxConstrainPoint;
}

MovementConstraint.prototype.constrainPoint = function(oldPoint, newPoint) {
    if (isConstrained(newPoint.x, this.minConstrainPoint.x, this.maxConstrainPoint.x)) {
        newPoint.x = oldPoint.x;
    }
    if (isConstrained(newPoint.y, this.minConstrainPoint.y, this.maxConstrainPoint.y)) {
        newPoint.y = oldPoint.y;
    }
}

function isConstrained(xin, xmin, xmax) {
    return (xin > xmin && xin < xmax);
}