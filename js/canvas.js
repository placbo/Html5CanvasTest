(function () {


    const canvas = document.getElementById("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let c = canvas.getContext("2d");
    let radius = 100;
    let x = 100;
    let y = 100;
    let dx = 15;
    let dy = 15;

    function draw() {
        let color = 'rgb('+
            (Math.floor(Math.random() * 50)+205) +
            ', ' +
            (Math.floor(Math.random() * 50)+205) +
            ', ' +
            (Math.floor(Math.random() * 50)+5) +
            ')';
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
        //c.stroke();
        if (x < radius || x > innerWidth - radius) {
            dx = -dx;
        }
        if (y < radius || y > innerHeight - radius) {
            dy = -dy;
        }
        x += Math.random() * dx;
        y += Math.random() * dy;
    }

    function animate() {
        requestAnimationFrame(animate);
        //c.clearRect(0, 0, innerWidth, innerHeight);
        draw();
    }

    animate();


})();
