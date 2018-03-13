var CollisionManager = function() {
    this.colliders = [];
}

CollisionManager.prototype.AddCollider = function(colliderType) {
    this.colliders.push(colliderType);
}

CollisionManager.prototype.collidesWith = function(object) {
    return (this.colliders.indexOf(object) > -1);
}

CollisionManager.prototype.areTouching = function(o1, o2) {
    var closestPoint = o1.getClosestPoint(o2.point);
    return o2.isInteriorPoint(closestPoint);
}

CollisionManager.prototype.getConstraint = function(colliderType) {
    // todo add colliderType -> constraint map + way to add constraints
    // should return multiple constraints (maybe?)
}

CollisionManager.prototype.fireEvent = function(object, colliderType) {
    // todo add colliderType -> event map + way to add events
    // call event with object as parameter
}