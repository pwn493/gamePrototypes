var game_loop;

var canvasManager;

$(document).ready(function() {
    canvasManager = new CanvasManager();

    var obstacle = new Obstacle("gray", new Point(200, 150), new Point(220, 170));
    
    canvasManager.addObject(obstacle);
    var mainCircle = new Circle("blue", 7, new Point(250, 200), new PlayerMovement(3, new Point(7,7), new Point(gameCanvas.width - 7, gameCanvas.height - 7)));
    
    for(var i = 0; i < 100; i++) {
        var point = new Point(Math.random() * (gameCanvas.width - 14) + 7, Math.random() * (gameCanvas.height - 14) + 7);
        var circle = new Circle("red", 7, point, new RandomAvoiderMovement(4, mainCircle, 10, 30, new Point(250, 200), 300));
        canvasManager.addObject(circle);
    }
    
    canvasManager.addObject(mainCircle);
    
    canvasManager.draw();
    game_loop = setInterval(main, 30);
});

function main() {
    canvasManager.update();
    canvasManager.clear();
    canvasManager.draw();
}