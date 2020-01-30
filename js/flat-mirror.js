

/* ****  global variables **** */
var c, ctx, slider, x, y;

document.addEventListener("DOMContentLoaded", (evt) => {
    setup()
});

function setup() {
     c = document.getElementById("flat-mirror-canvas");
     ctx = c.getContext("2d");
     slider = document.getElementById("arcCenterSlider");

     ctx.canvas.width = screen.width * 0.9;
     ctx.canvas.height = screen.height * 0.6;

     x = c.scrollWidth / 2;
     y = c.scrollHeight / 2;

     slider.max = screen.width * 0.35;

     draw();
}

function draw() {
    ctx.beginPath();
    ctx.clearRect(0, 0, c.scrollWidth, c.scrollHeight);

    setupMirror();
    drawFocal();

    ctx.stroke();
}

function setupMirror() {
    ctx.lineWidth = 2;
    ctx.moveTo(0.1 * c.scrollWidth, c.scrollHeight / 2);
    ctx.lineTo(0.9 * c.scrollWidth, c.scrollHeight / 2);

    ctx.moveTo(x, 50);
    ctx.lineTo(x, c.scrollHeight - 50);


    for(let i = 50; i <(c.scrollHeight - 50); i += 50)
    {
        ctx.moveTo(x, i + 30);
        ctx.lineTo(x - 20, i + 10);
    }
}

function drawFocal() {
    ctx.moveTo(x + parseInt(slider.value, 10), y - 15);
    ctx.lineTo(x + parseInt(slider.value, 10), y + 15);

    ctx.moveTo(x + (parseInt(slider.value, 10) / 2), y - 15);
    ctx.lineTo(x + (parseInt(slider.value, 10) / 2), y + 15);

    ctx.font = "20px Verdana";
    ctx.fillText("C", x-20, y+ 20);
    ctx.fillText("F", x + (parseInt(slider.value, 10) / 2) - 20, y +20);
    ctx.fillText("O", x + parseInt(slider.value, 10) - 20, y+ 20);
}