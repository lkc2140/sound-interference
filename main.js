const circle = document.getElementById('listener');
const x_pos = document.getElementById('x_pos');
const y_pos = document.getElementById('y_pos');
const speaker1 = document.getElementById('speaker1')
const speaker2 = document.getElementById('speaker2')
const speaker1_pos = document.getElementById('speaker1_pos')
const speaker2_pos = document.getElementById('speaker2_pos')
var d1 = speaker1_pos.value
var d2 = speaker2_pos.value

const room_len = 10 // room length in meters
const pix_per_m = 600 / room_len
const amp1 = document.getElementById('amp1')
const amp2 = document.getElementById('amp2')
var A1 = amp1.value / 100
var A2 = amp2.value / 100


function move_pos() {
    var x = x_pos.value;
    var y = y_pos.value;
    console.log(y)
    circle.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
}

function move_speaker_pos() {
    d1 = speaker1_pos.value
    d2 = speaker2_pos.value
    speaker1.style.transform = `translate(${0}px, ${-(280-d1)}px)`;
    speaker2.style.transform = `translate(${0}px, ${d2-320}px)`;
}



x_pos.addEventListener('input', move_pos);
y_pos.addEventListener('input', move_pos);

speaker1_pos.addEventListener('input', move_speaker_pos);
speaker2_pos.addEventListener('input', move_speaker_pos);


const playButton = document.querySelector('button');
playButton.addEventListener('click', async function () {

    audioCtx = new AudioContext()

    const speaker1 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    speaker1.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // phi_0 is 0 because r1=r2
    gainNode.gain.value = A1**2 + A2**2 + 2 * (A1 * A2 * Math.cos(0))

    speaker1.type = 'sine'; 
    speaker1.frequency.value = 439.74; 
    var lambda = 343 / speaker1.frequency.value 

    function adjust_gain() {
        var x = x_pos.value / pix_per_m
        var y = y_pos.value;
        var y1 = (y - d1) / pix_per_m
        var y2 = (d2 - y) / pix_per_m
        var r1 = Math.sqrt(x**2 + y1**2)
        var r2 = Math.sqrt(x**2 + y2**2)
        var d_r = Math.abs(r1 - r2)
        var phi = 2 * Math.PI * d_r / lambda
        A_eff = Math.sqrt( A1**2 + A2**2 + 2 * (A1 * A2 * Math.cos(phi)))
        console.log("A1")
        console.log(A1)
        console.log("A2")
        console.log(A2)
        console.log("A_eff")
        console.log(A_eff)

        var gainValue = A_eff ** 2;
        gainNode.gain.exponentialRampToValueAtTime(gainValue, audioCtx.currentTime + 0.2)
    }

    function change_amp() {
        A1 = amp1.value / 100
        A2 = amp2.value / 100
        adjust_gain()
    }

    x_pos.addEventListener('input', adjust_gain);
    y_pos.addEventListener('input', adjust_gain);
    amp1.addEventListener('input', change_amp);
    amp2.addEventListener('input', change_amp);

    speaker1.start();

});
