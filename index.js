var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 15;
var colourArray = ["pink", "blue", "green", "brown", "black", "yellow", "orange", "red"];
var randColour = "lightblue";
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var score = 0;
var speed = 10;
var lives = 3;

var brickRowCount = 1;
var brickColumnCount = 11;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = randColour;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("Next Round");
                        document.location.reload();
                        setInterval(draw, speed--);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = randColour;
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = randColour;
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = randColour;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = randColour;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    x += dx;
    y += dy;



    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        //randColour = colourArray[getRandomInt(0, colourArray.length - 1)];
        //randColour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        //randColour = colourArray[getRandomInt(0, colourArray.length - 1)];
        //randColour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            //randColour = colourArray[getRandomInt(0, colourArray.length - 1)];
            randColour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }

        }

    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 4;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 4;
    }


}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 32) {
        spacePressed = false;
    }
}

setInterval(draw, speed);



