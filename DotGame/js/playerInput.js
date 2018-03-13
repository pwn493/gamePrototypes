var PlayerInput = (function() {
  var right = 0;
  var left = 0;
  var up = 0;
  var down = 0;

  return { // public interface
    getRight: function () {
        return right;
    },
    setRight: function (value) {
        right = value;
    },
    getLeft: function () {
        return left;
    },
    setLeft: function (value) {
        left = value;
    },
    getUp: function () {
        return up;
    },
    setUp: function (value) {
        up = value;
    },
    getDown: function () {
        return down;
    },
    setDown: function (value) {
        down = value;
    },
  };
})();
    
$(document).keydown(function(e){
    if (isRight(e)) {
        PlayerInput.setRight(1);
    } else if (isLeft(e)) {
        PlayerInput.setLeft(1);
    } else if (isUp(e)) {
        PlayerInput.setUp(1);
    } else if (isDown(e)) {
        PlayerInput.setDown(1);
    }
});

$(document).keyup(function(e) {
    if (isRight(e)) {
        PlayerInput.setRight(0);
    } else if (isLeft(e)) {
        PlayerInput.setLeft(0);
    } else if (isUp(e)) {
        PlayerInput.setUp(0);
    } else if (isDown(e)) {
        PlayerInput.setDown(0);
    }
});

function isRight(e) {
    var key = e.which;
    return key == "39" || key == "69";
}

function isLeft(e) {
    var key = e.which;
    return key == "37" || key == "65";
}

function isUp(e) {
    var key = e.which;
    return key == "38" || key == "188";
}

function isDown(e) {
    var key = e.which;
    return key == "40" || key == "79";
}