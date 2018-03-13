var CanvasManager = function() {
    this.objects = [];
    var gameCanvas = document.getElementById("gameCanvas");
    this.gameContext = gameCanvas.getContext("2d");
}

CanvasManager.prototype.draw = function() {
    var object;
    for (object of this.objects) {
        object.draw(this.gameContext);
    }
}

CanvasManager.prototype.update = function () {
    var object;
    for (object of this.objects) {
        object.update();
    }
}

CanvasManager.prototype.updateCollisions = function () {
    var object;
    for(object of this.objects) {
        var collisionManager = object.collisionManager;
        var movement = object.movement;
        
        var otherObject;
        for (otherObject of this.objects) {
            if (object !== otherObject && collisionManager.collidesWith(otherObject.getTypeName())) {
                if (collisionManager.areTouching(object, otherObject)) {
                    collisionManager.fireEvent(object, otherObject.getTypeName());
                    otherObject.movement.addConstraint(collisionManager.getConstraint(otherObject.getTypeName()));
                }
            }
        }
    }
}

CanvasManager.prototype.clear = function() {
    this.gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height );
}

CanvasManager.prototype.addObject = function(drawObject) {
    this.objects.push(drawObject);
}

CanvasManager.prototype.removeObject = function(drawObject) {
    var index = this.objects.indexOf(drawObject);
    this.objects.slice(index, 1);
}