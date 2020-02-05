/* ****  global variables **** */

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Line
{
    constructor(p1, p2)
    {
        this.p1 = p1;
        this.p2 = p2;

        this.calculate();
    }

    calculate()
    {
        this.a = this.p1.y - this.p2.y;
        this.b = this.p2.x - this.p1.x;
        this.c = ((this.p1.x * this.p2.y) - (this.p2.x * this.p1.y));
    }

    intercepts(line)
    {
        let W  = (this.a * line.b) - (line.a * this.b);
        let Wx = -1 * ((this.c * line.b) - (line.c * this.b));
        let Wy = -1 * ((this.a * line.c) - (this.c * line.a));

        if(W !== 0)
        {
            return new Point(Wx / W, Wy / W);
        }
        return 0;

    }
}

class FlatMirror {
    setup() {
        this.point1 = new Point(100, 0);
        this.point2 = new Point(100, 100);

        this.c = document.getElementById("flat-mirror-canvas");
        this.ctx = this.c.getContext("2d");
        this.slider = document.getElementById("arcCenterSlider");

        this.ctx.canvas.width = window.innerWidth * 0.9;
        this.ctx.canvas.height = window.innerHeight * 0.6;

        this.x = this.c.scrollWidth / 2;
        this.y = this.c.scrollHeight / 2;

        // this.slider.max = screen.width * 0.30;

        this.p1xInput = document.getElementById("pointOneX");
        this.p1yInput = document.getElementById("pointOneY");
        this.p2xInput = document.getElementById("pointTwoX");
        this.p2yInput = document.getElementById("pointTwoY");

        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.c.scrollWidth, this.c.scrollHeight);

        this.drawArrow();
        this.ctx.stroke();

        this.setupMirror();
        // this.drawFocal();
        this.ctx.stroke();

        let p1 = this.reflectPoint(this.point1);
        let p2 = this.reflectPoint(this.point2);

        this.ctx.moveTo(this.x + p1.x, this.y - p1.y);
        this.ctx.lineTo(this.x + p2.x, this.y - p2.y);

        this.ctx.stroke();
    }
    setupMirror() {
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(0.1 * this.c.scrollWidth, this.c.scrollHeight / 2);
        this.ctx.lineTo(0.9 * this.c.scrollWidth, this.c.scrollHeight / 2);

        this.ctx.moveTo(this.x, 50);
        this.ctx.lineTo(this.x, this.c.scrollHeight - 50);


        for(let i = 50; i <(this.c.scrollHeight - 50); i += 50)
        {
            this.ctx.moveTo(this.x, i + 30);
            this.ctx.lineTo(this.x - 20, i + 10);
        }
    }
    drawFocal() {
        this.ctx.moveTo(this.x + parseInt(this.slider.value, 10), this.y - 15);
        this.ctx.lineTo(this.x + parseInt(this.slider.value, 10), this.y + 15);

        this.ctx.moveTo(this.x + (parseInt(this.slider.value, 10) / 2), this.y - 15);
        this.ctx.lineTo(this.x + (parseInt(this.slider.value, 10) / 2), this.y + 15);

        this.ctx.font = "20px Verdana";
        this.ctx.fillText("C", this.x-20, this.y+ 20);
        this.ctx.fillText("F", this.x + (parseInt(this.slider.value, 10) / 2) - 20, this.y +20);
        this.ctx.fillText("O", this.x + parseInt(this.slider.value, 10) - 20, this.y+ 20);
    }
    drawArrow() {
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(this.point1.x + this.x, this.y - this.point1.y);
        this.ctx.lineTo(this.point2.x + this.x, this.y - this.point2.y);
    }

    reflectPoint(p) {
        this.ctx.lineWidth = 1;
        let p11 = new Point(this.x, this.y - p.y - 30);
        let p11r = new Point(this.x + p.x, this.y - p.y - 60);

        let p12 = new Point(this.x, this.y - p.y + 30);
        let p12r = new Point(this.x + p.x, this.y - p.y + 60);

        let line1 = new Line(new Point(0, p.y + 30), new Point(p.x,p.y + 60));
        let line2 = new Line(new Point(0, p.y - 30), new Point(p.x, p.y - 60));

        let intercept = line1.intercepts(line2);
        console.log(line1);
        console.log(line2);
        console.log(intercept);

        this.ctx.moveTo(p11.x,  p11.y);
        // this.ctx.lineTo()

        // this.ctx.moveTo(this.x + p.x, this.y - p.y);
        // this.ctx.lineTo(p11.x, p11.y);

        // this.ctx.moveTo(p11.x,  p11.y);
        // this.ctx.lineTo(p11r.x, p11r.y);

        // this.ctx.moveTo(this.x + p.x, this.y - p.y);
        // this.ctx.lineTo(p12.x, p12.y);

        // this.ctx.moveTo(p12.x, p12.y);
        // this.ctx.lineTo(p12r.x, p12r.y);

        return intercept;
    }
}


var flatMirror = new FlatMirror();

document.addEventListener("DOMContentLoaded", (evt) => {
    setup()
});

function setup() {
     flatMirror.setup();
}


function focalSliderChanged() {
    document.getElementById("arcCenterSliderLabel").innerText = "Focal length: " + flatMirror.slider.value.toString().padStart(3, "0");
    flatMirror.draw();
}

function p1xLabelChanged(lbl) { flatMirror.point1.x = parseInt(lbl.value); flatMirror.draw(); }
function p1yLabelChanged(lbl) { flatMirror.point1.y = parseInt(lbl.value); flatMirror.draw(); }
function p2xLabelChanged(lbl) { flatMirror.point2.x = parseInt(lbl.value); flatMirror.draw(); }
function p2yLabelChanged(lbl) { flatMirror.point2.y = parseInt(lbl.value); flatMirror.draw(); }

function p1xButtonClicked(btt) {
    if(btt.innerHTML === "+") { flatMirror.point1.x += 1; }
    else { flatMirror.point1.x -= 1; }
    flatMirror.p1xInput.value = flatMirror.point1.x;
    flatMirror.draw();
}
function p1yButtonClicked(btt) {
    if(btt.innerHTML === "+") { flatMirror.point1.y += 1; }
    else { flatMirror.point1.y -= 1; }
    flatMirror.p1yInput.value = flatMirror.point1.y;
    flatMirror.draw();
}
function p2xButtonClicked(btt) {
    if(btt.innerHTML === "+") { flatMirror.point2.x += 1; }
    else { flatMirror.point2.x -= 1; }
    flatMirror.p2xInput.value = flatMirror.point2.x;
    flatMirror.draw();
}
function p2yButtonClicked(btt) {
    if(btt.innerHTML === "+") { flatMirror.point2.y += 1; }
    else { flatMirror.point2.y -= 1; }
    flatMirror.p2yInput.value = flatMirror.point2.y;
    flatMirror.draw();
}

function concaveReflectPoint(p)
{
    if(p.y === 0)
    {
        return new Point(-1 * p.x, 0);
    }
    else
    {
        if(p.x > 0 && p.x < slider.value / 2)
        {
            // center -> focal point
        }
        else if(p.x === slider.value / 2)
        {
            // focal point
        }
        else if(p.x > slider.value / 2 && p.x < slider.value)
        {
            // focal point -> arc length
        }
        else if(p.x === slider.value)
        {
            // arc length
        }
        else if(p.x > slider.value)
        {
            // arc -> infinity
        }
    }
}