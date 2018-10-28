var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 20;
var colourArray = ["pink", "blue", "green", "brown", "black", "yellow", "orange", "red"];
var randColour = "lightblue";

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        //randColour = colourArray[getRandomInt(0, colourArray.length - 1)];
        randColour = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        //randColour = colourArray[getRandomInt(0, colourArray.length - 1)];
        randColour = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    }
}


setInterval(draw, 5);

