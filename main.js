const circle = document.getElementById('circle');
const x_pos = document.getElementById('x_pos');
const y_pos = document.getElementById('y_pos');

const room_len = 20 // room length in meters
const pix_per_m = 600 / room_len
const top1 = 250
const top2 = 350
const A = 0.45

function move_pos() {
    var x = x_pos.value;
    var y = y_pos.value;
    circle.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
}

x_pos.addEventListener('input', move_pos);
y_pos.addEventListener('input', move_pos);

const playButton = document.querySelector('button');



playButton.addEventListener('click', async function () {

    audioCtx = new AudioContext()

    const speaker1 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    speaker1.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // phi_0 is 0 because r1 = r2
    gainNode.gain.value = 2 * A * Math.cos(0)

    speaker1.type = 'sine'; 
    speaker1.frequency.value = 440; 
    var lambda = 343 / speaker1.frequency.value 
    console.log(lambda)

    function adjust_gain() {
        var x = x_pos.value / pix_per_m
        console.log(x)
        var y = y_pos.value;
        console.log(y)
        var y1 = (y - top1) / pix_per_m
        console.log(y1)
        var y2 = (top2 - y) / pix_per_m
        console.log(y2)
        var r1 = Math.sqrt(x**2 + y1**2)
        console.log(r1)
        var r2 = Math.sqrt(x**2 + y2**2)
        console.log(r2)
        var d_r = Math.abs(r1 - r2)
        console.log(d_r)
        var phi = 2 * Math.PI * d_r / lambda
        console.log(phi)
        A_eff = 2 * A * Math.cos(phi / 2)
        console.log(A_eff)

        var gainValue = A_eff ** 2;
        console.log(gainValue)
        gainNode.gain.value.exponentialRampToValueAtTime(gainValue, audioCtx.currentTime + 0.2)

    }

    x_pos.addEventListener('input', adjust_gain);
    y_pos.addEventListener('input', adjust_gain);

    speaker1.start();

});
