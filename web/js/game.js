var cDraw = {};

var cP1 = document.getElementById("battleship-canvas");
var ctxP1 = cP1.getContext("2d");

cDraw.init = function() {

    var water = new Image();
    water.src = 'img/battleship/water.png';
    water.onload = function() {
        var background = ctxP1.createPattern(this, 'repeat');
        ctxP1.fillStyle = background;
        ctxP1.fillRect(32, 32, 352, 352);
    };

    ctxP1.fillStyle = ('white');
    ctxP1.font = '32px Special Elite';
    // letter
    ctxP1.fillText('A', 39, 27);
    ctxP1.fillText('B', 69, 27);
    ctxP1.fillText('C', 101, 27);
    ctxP1.fillText('D', 133, 27);
    ctxP1.fillText('E', 165, 27);
    ctxP1.fillText('F', 197, 27);
    ctxP1.fillText('G', 229, 27);
    ctxP1.fillText('H', 262, 27);
    ctxP1.fillText('I', 293, 27);
    ctxP1.fillText('J', 325, 27);
    // number
    ctxP1.fillText('1', 7, 59);
    ctxP1.fillText('2', 7, 91);
    ctxP1.fillText('3', 7, 123);
    ctxP1.fillText('4', 7, 155);
    ctxP1.fillText('5', 7, 187);
    ctxP1.fillText('6', 7, 219);
    ctxP1.fillText('7', 7, 251);
    ctxP1.fillText('8', 7, 283);
    ctxP1.fillText('9', 7, 315);
    ctxP1.font = '28px Special Elite';
    ctxP1.fillText('10', 0, 345);
};

cDraw.clircleHit = function(posX, posY) {
    ctxP1.beginPath();
    ctxP1.fillStyle = 'red';
    ctxP1.arc(((posX + 1) * 32) - 16, ((posY + 1) * 32) - 16, 8, 0, 2 * Math.PI);
    ctxP1.fill();
};

cDraw.clircleMiss = function(posX, posY) {
    ctxP1.beginPath();
    ctxP1.fillStyle = 'white';
    ctxP1.arc(((posX + 1) * 32) - 16, ((posY + 1) * 32) - 16, 8, 0, 2 * Math.PI);
    ctxP1.fill();
};



cP1.onmousedown = function(e) {
    var x = getMousePos(cP1, e).x,
        y = getMousePos(cP1, e).y;

    if (x == 0 || y == 0)
        return;
        
    cDraw.clircleHit(x, y);
};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    function getSquare(pos) {
        if (pos >= 0 && pos <= 32) {
            return 0;
        }
        if (pos >= 32 && pos <= 64) {
            return 1;
        }
        if (pos > 64 && pos <= 96) {
            return 2;
        }
        if (pos > 96 && pos <= 128) {
            return 3;
        }
        if (pos > 128 && pos <= 160) {
            return 4;
        }
        if (pos > 160 && pos <= 192) {
            return 5;
        }
        if (pos > 192 && pos <= 224) {
            return 6;
        }
        if (pos > 224 && pos <= 256) {
            return 7;
        }
        if (pos > 256 && pos <= 288) {
            return 8;
        }
        if (pos > 288 && pos <= 320) {
            return 9;
        }
        if (pos > 320 && pos <= 352) {
            return 10;
        }
        else
            return 'error';
    }

    return {
        x: getSquare(evt.clientX - rect.left),
        y: getSquare(evt.clientY - rect.top)
    };
}
