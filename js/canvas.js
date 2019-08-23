const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
let c; //context

let elements = [];
let stopped = true;


function generateRandomColorString() {
    return (Math.floor(Math.random() * 200) + 50) +
        ', ' +
        (Math.floor(Math.random() * 255) + 0) +
        ', ' +
        (Math.floor(Math.random() * 200) + 50);
}

function Circle(_x, _y) {
    let radius = Math.random() * 4;
    let x = _x;
    let old_x;
    let y = _y;
    let old_y;
    let dx = (Math.random() * 2 - 1) * 6;
    let dy = (Math.random() * 2 - 1) * 6;
    let colorString = generateRandomColorString();
    let color;
    let internalCounter = 0;

    let draw = () => {
        //c.fillRect(old_x, old_y, radius, radius);
        c.fillStyle = color;
        //c.fillRect(x, y, radius, radius);
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.fill();
    };

    this.update = () => {
        internalCounter++;
        old_x = x;
        old_y = y;
        color = 'rgb(' + colorString + (100 - internalCounter/2) * 0.01 + ')';
        // if (x < radius || x > innerWidth - radius) {
        //     dx = -dx;
        //     color = generateRandomColorString();
        // }
        // if (y < radius || y > innerHeight - radius) {
        //     dy = -dy;
        //     color = generateRandomColorString();
        // }
        x += dx;
        y += dy;
        draw();
    };
}

function animate() {
    if (stopped) {
        c.clearRect(0, 0, innerWidth, innerHeight);
        return;
    }
    requestAnimationFrame(animate);
    c.fillStyle = 'rgb(0, 0, 0, 0.15)';
    c.fillRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < elements.length; i++) {
        elements[i].update();
    }
}

canvas.addEventListener('mouseup', function (event) {
    if (stopped) {
        stopped = false;
        const rect = canvas.getBoundingClientRect();
        let startX = event.clientX - rect.left;
        let startY = event.clientY - rect.top;
        console.log("x: " + startX + " y: " + startY);
        c = canvas.getContext("2d");
        elements = [];
        for (let i = 0; i < 100; i++) {
            elements.push(new Circle(startX, startY));
        }
        animate();
        console.log("Started");
    } else {
        stopped = true;
        console.log("Stopped");
    }
});

