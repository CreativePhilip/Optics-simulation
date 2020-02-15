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

        this.ctx.canvas.width = window.innerWidth * 0.9;
        this.ctx.canvas.height = window.innerHeight * 0.6;

        this.x = this.c.scrollWidth / 2;
        this.y = this.c.scrollHeight / 2;

        this.gradient = this.ctx.createLinearGradient(0, 0, 170, 0);
        this.gradient.addColorStop("0", "magenta");
        this.gradient.addColorStop("0.5" ,"blue");
        this.gradient.addColorStop("1.0", "red");

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
        this.ctx.lineWidth = 3;
        this.drawReflection();

        this.ctx.strokeStyle = "#000000";
        this.setupMirror();
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
    drawArrow() {
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(this.point1.x + this.x, this.y - this.point1.y);
        this.ctx.lineTo(this.point2.x + this.x, this.y - this.point2.y);
    }
    drawReflection(){
        let p1 = this.reflectPoint(this.point1);
        let p2 = this.reflectPoint(this.point2);

        this.ctx.moveTo(this.x + p1.x, this.y - p1.y);
        this.ctx.lineTo(this.x + p2.x, this.y - p2.y);
        this.ctx.stroke();
    }
    reflectPoint(p) {
        return new Point(-1 * p.x, p.y);
    }
}

class Convex{
    setup(){
        this.point1 = new Point(100, 0);
        this.point2 = new Point(100, 100);

        this.c = document.getElementById("convex-canvas");
        this.ctx = this.c.getContext("2d");
        this.slider = document.getElementById("convex-arcCenterSlider");
        this.ctx.canvas.width = window.innerWidth * 0.9;
        this.ctx.canvas.height = window.innerHeight * 0.6;

        this.x = this.c.scrollWidth / 2;
        this.y = this.c.scrollHeight / 2;

        this.p1xInput = document.getElementById("convex-pointOneX");
        this.p1yInput = document.getElementById("convex-pointOneY");
        this.p2xInput = document.getElementById("convex-pointTwoX");
        this.p2yInput = document.getElementById("convex-pointTwoY");

        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.c.scrollWidth, this.c.scrollHeight);
        this.drawArrow();
        this.drawReflection();
        this.setupMirror();
        this.drawFocal();
    }
    drawArrow() {
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(this.point1.x + this.x, this.y - this.point1.y);
        this.ctx.lineTo(this.point2.x + this.x, this.y - this.point2.y);
    }
    setupMirror() {
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(0.1 * this.c.scrollWidth, this.c.scrollHeight / 2);
        this.ctx.lineTo(0.9 * this.c.scrollWidth, this.c.scrollHeight / 2);

        this.ctx.moveTo(this.x, 50);
        this.ctx.lineTo(this.x, this.c.scrollHeight - 50);

        // for(let i = 50; i <(this.c.scrollHeight - 50); i += 50)
        // {
        //     this.ctx.moveTo(this.x, i + 30);
        //     this.ctx.lineTo(this.x - 20, i + 10);
        // }

        this.ctx.stroke();
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

        this.ctx.stroke();
    }
    drawReflection(){
        let p1 = this.reflectPoint(this.point1);
        let p2 = this.reflectPoint(this.point2);
        console.log(p1, p2);
        this.ctx.moveTo(this.x + p1.x, this.y - p1.y);
        this.ctx.lineTo(this.x + p2.x, this.y - p2.y);
        this.ctx.stroke();
    }
    reflectPoint(p){
        let x = ((this.slider.value / 2) * p.x) / (p.x - (this.slider.value / 2));
        let m = (x / p.x) * -1;
        return new Point(x * -1, m * p.y);
    }
}

var flatMirror = new FlatMirror();
var convex = new Convex();

document.addEventListener("DOMContentLoaded", (evt) => {
    setup()
});

function setup() {
     flatMirror.setup();
     convex.setup();
}

function focalSliderChanged() {
    document.getElementById("convex-arcCenterSliderLabel").innerText = "Arc length: " + convex.slider.value.toString().padStart(3, "0");
    convex.draw();
}

// Flat mirror event handlers
function p1xLabelChangedFlat(lbl) { flatMirror.point1.x = parseInt(lbl.value); flatMirror.draw(); }
function p1yLabelChangedFlat(lbl) { flatMirror.point1.y = parseInt(lbl.value); flatMirror.draw(); }
function p2xLabelChangedFlat(lbl) { flatMirror.point2.x = parseInt(lbl.value); flatMirror.draw(); }
function p2yLabelChangedFlat(lbl) { flatMirror.point2.y = parseInt(lbl.value); flatMirror.draw(); }

function p1xButtonClickedFlat(btt) {
    if(btt.innerHTML === "+") { flatMirror.point1.x += 1; }
    else { flatMirror.point1.x -= 1; }
    flatMirror.p1xInput.value = flatMirror.point1.x;
    flatMirror.draw();
}
function p1yButtonClickedFlat(btt) {
    if(btt.innerHTML === "+") { flatMirror.point1.y += 1; }
    else { flatMirror.point1.y -= 1; }
    flatMirror.p1yInput.value = flatMirror.point1.y;
    flatMirror.draw();
}
function p2xButtonClickedFlat(btt) {
    if(btt.innerHTML === "+") { flatMirror.point2.x += 1; }
    else { flatMirror.point2.x -= 1; }
    flatMirror.p2xInput.value = flatMirror.point2.x;
    flatMirror.draw();
}
function p2yButtonClickedFlat(btt) {
    if(btt.innerHTML === "+") { flatMirror.point2.y += 1; }
    else { flatMirror.point2.y -= 1; }
    flatMirror.p2yInput.value = flatMirror.point2.y;
    flatMirror.draw();
}


// Convex lens event handlers
function p1xLabelChangedConvex(lbl) { convex.point1.x = parseInt(lbl.value); convex.draw(); }
function p1yLabelChangedConvex(lbl) { convex.point1.y = parseInt(lbl.value); convex.draw(); }
function p2xLabelChangedConvex(lbl) { convex.point2.x = parseInt(lbl.value); convex.draw(); }
function p2yLabelChangedConvex(lbl) { convex.point2.y = parseInt(lbl.value); convex.draw(); }

function p1xButtonClickedConvex(btt) {
    if(btt.innerHTML === "+") { convex.point1.x += 1; }
    else { convex.point1.x -= 1; }
    convex.p1xInput.value = convex.point1.x;
    convex.draw();
}
function p1yButtonClickedConvex(btt) {
    if(btt.innerHTML === "+") { convex.point1.y += 1; }
    else { convex.point1.y -= 1; }
    convex.p1yInput.value = convex.point1.y;
    convex.draw();
}
function p2xButtonClickedConvex(btt) {
    if(btt.innerHTML === "+") { convex.point2.x += 1; }
    else { convex.point2.x -= 1; }
    convex.p2xInput.value = convex.point2.x;
    convex.draw();
}
function p2yButtonClickedConvex(btt) {
    if(btt.innerHTML === "+") { convex.point2.y += 1; }
    else { convex.point2.y -= 1; }
    convex.p2yInput.value = convex.point2.y;
    convex.draw();
}

