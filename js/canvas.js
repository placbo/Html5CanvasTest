const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
let c = canvas.getContext("2d");

function generateRandomColorString() {
    return 'rgb(' +
        (Math.floor(Math.random() * 255)) +
        ', ' +
        (Math.floor(Math.random() * 255)) +
        ', ' +
        (Math.floor(Math.random() * 255)) +
        ')';
}

function Circle(_x, _y) {

    let radius = Math.random() * 4;
    let x = _x;
    let old_x;
    let y = _y;
    let old_y;
    let dx = (Math.random() * 2 - 1) * 6;
    let dy = (Math.random() * 2 - 1) * 6;
    let color = '#ffffff';
    let countera = 0;

    let draw = () => {
        //c.fillRect(old_x, old_y, radius, radius);
        c.fillStyle = color;
        //c.fillRect(x, y, radius, radius);
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.fill();
    };

    this.update = () => {
        countera++;
        old_x = x;
        old_y = y;
        color = 'rgb(255,255,255,' + (100 - countera) * 0.01 + ')';
        if (x < radius || x > innerWidth - radius) {
            dx = -dx;
            color = generateRandomColorString();
        }
        if (y < radius || y > innerHeight - radius) {
            dy = -dy;
            color = generateRandomColorString();
        }
        x += dx;
        y += dy;
        draw();
    };
}

let circles = [];
stopp = false;

function startAnimation(startx, starty) {
    c = canvas.getContext("2d");
    stopp = false;
    circles = [];
    for (let i = 0; i < 100; i++) {
        circles.push(new Circle(startx, starty));
    }
    animate();
}

function animate() {
    console.log("animate");
    if (stopp) {
        console.log("stopping");
        return;
    }
    requestAnimationFrame(animate);
    c.fillStyle = 'rgb(0, 0, 0, 0.15)';
    c.fillRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }


}

canvas.addEventListener('mousedown', function (event) {
    stopp = true;
    console.log(stopp);
    const rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    startAnimation(x, y);
});

