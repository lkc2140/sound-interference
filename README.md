# Interacting Sound Waves

Project is linked [here](https://lkc2140.github.io/sound-interference/main.html).

## Background

This interactive is meant to simulate constructive/destructive interference due to two speakers. Interference is a result of the adding of two off-phase waves, causing the troughs and peaks of the waves to 'cancel' or 'multiply'.

<img width="625" alt="Screenshot 2023-12-16 215030" src="https://github.com/lkc2140/sound-interference/assets/123655927/c29da237-3ae1-450f-a027-5f2f0059f688">

Starting from the wave equations for two sound waves, we can determine how the total amplitude is affected by superposition and phase difference. I am simplifying this problem by representing each speaker as a single sine wave. For more information on why sound waves can be represented by sine/cosine functions is included in the references. I will represent a single sound wave as:

$$\Psi = A\sin(\omega t + \phi)$$

Where $\omega$ is the angular speed, or the rate of oscillation. Given two sine waves of amplitudes $A_1$ and $A_2$, the waves will have a phase shift which correspond to the difference in path, $\Delta r$ between them. If wave 1 travels a distance $r_1$ and wave 2 travels a distance $r_2$, the phase shift is:

$$\phi = 2\pi f \Delta t = 2 \pi \frac{v}{\lambda} \Delta t = 2 \pi \frac{\Delta r}{\lambda} =2 \pi \frac{r_2 - r_1}{\lambda}$$

Where $v$ is the speed of propagation, in this case, the speed of sound (343 m/s). $f$ is the frequency and $\lambda$ is the wavelength of both waves.

The figure below illustrates $r_1$ and $r_2$ between two speakers and a listener. This path difference is what will cause the constructive/destructive interference heard.

<img width="629" alt="Screenshot 2023-12-16 215056" src="https://github.com/lkc2140/sound-interference/assets/123655927/dc462d5f-0c5b-458e-9a20-0ab51b4fee68">

From my review of literature, I believe it is reasonable to assume that when these two waves, of the same frequency, add together, they will form a resultant sine wave which will also have some phase shift, $\delta$ and amplitude, $A_{eff}$.

We can now calculate the effective amplitude:

$$A_1\sin(\omega t + \phi) + A_2\sin(\omega t) = A_{eff}sin(\omega t + \delta)$$

$$A_1e^{i(\omega t + \phi)} + A_2e^{i \omega t} = A_{eff}e^{i(\omega t + \delta)}$$

$$A_1e^{i\phi} + A_2 = A_{eff}e^{i\delta}$$

Now, taking the complex ampitude and expanding the exponents:

$$|A\cos\phi + Aisin\phi +B|^2 = |A_{eff} \cos\delta + iA_{eff}\sin\delta|^2$$

$$(A\cos\phi + B)^2 + (Asin\phi)^2 = (A_{eff} \cos\delta)^2  (A_{eff}\sin\delta|)^2$$

$$A^2 \cos^2\phi + 2AB\cos\phi + B^2 +A^2 \sin^2\phi = A_{eff}^2$$

$$A^2 + B^2 + 2 ABcos\phi = A_{eff}^2$$

Great, We have the amplitude! For this project, the amplitude, $A_{eff}$ is the only necessary information. The volume that we hear from a sound source is proportional to the intensity:

Volume $\propto I \propto A^2$.

One last thing to account for is the fact that as the orthogonal distance from each speakers increases, the volume, $V$, should naturally decrease (aside from any interference effects). Intensity is proportional to area, so for a circular wave propagating out from a speaker, as pictured above, this area should be $\pi r^2$. So, I have asserted that the volume should decrease with $1/r^2$, and therefore, the amplitude should decrease with $1/r$:

$$I \propto \frac{1}{r^2} \rightarrow A \propto \sqrt{I} \propto \sqrt{\frac{1}{r^2}} \propto \frac{1}{r}$$

I believe this assumption is a bit over-simplistic, and I hope to improve on this in the future.

## Web Audio implementation

Implementing this in Web Audio is not too complicated. The main functionality is shown here:

Certain values are hard-coded. The wavelength is related to the speed of sound and frequency, as mentioned previously. I also chose a room length of 9 meters, which is about the average size of a classroom. I chose a value of 600 pixels per meter, for the visual representation.
```
var lambda = 343 / speaker1.frequency.value 
const room_len = 9 // room length in meters
const pix_per_m = 600 / room_len
```
First, I intialize an oscilator, which represents the **combination** of both speakers. The oscillator is connected to a gain node, which is the mechanism for adjusting the volume.
```
const speaker = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

speaker.connect(gainNode);
gainNode.connect(audioCtx.destination);

// phi_0 is 0 because r1=r2
var x = x_pos.value / pix_per_m
A1_vol = A1 / x
A2_vol = A2 / x
gainNode.gain.value = A1_vol**2 + A2_vol**2 + 2 * (A1_vol * A2_vol * Math.cos(0))

speaker1.type = 'sine'; 
speaker1.frequency.value = 440; 
```
Every time the positition of the user is adjusted, the path difference $\Delta r$ is re-calculated. Then, the gain is adjusted to $A_{eff}^2$ using ```exponentialRampToValue()```.
```
function adjust_gain() {
        var x = x_pos.value / pix_per_m
        var y = y_pos.value;
        var y1 = (y - d1) / pix_per_m
        var y2 = (d2 - y) / pix_per_m
        var r1 = Math.sqrt(x**2 + y1**2)
        var r2 = Math.sqrt(x**2 + y2**2)
        var d_r = Math.abs(r1 - r2)
        var phi = 2 * Math.PI * d_r / lambda
        // acount for orthogonal distance from speaker
        A1_vol = A1 / r1
        A2_vol = A2 / r2
        A_eff = Math.sqrt( A1_vol**2 + A2_vol**2 + 2 * (A1_vol * A2_vol * Math.cos(phi)))

        var gainValue = A_eff ** 2;
        gainNode.gain.exponentialRampToValueAtTime(gainValue, audioCtx.currentTime + 0.2)
    }
```

## Next Steps

In the future, I hope to improve upon the volume-distance dampening effect, as I think it could be more accurate. I also would like to allow for the frequency to be adjustable.

Allowing each speakers' frequencies to vary from each other adds much more complexity, and I was stuck on the math for that case. This is also something I hope to be able to implement in the future. Even allowing a slight variance in frequency could allow to show very interesting phenomena, such as beats.

## References
[1] [Normal Modes of a Standing Sound Wave
](https://courses.lumenlearning.com/suny-osuniversityphysics/chapter/17-4-normal-modes-of-a-standing-sound-wave/#:~:text=If%20you%20walk%20around%20two,has%20various%20frequencies%20and%20wavelengths.)

[2] [Superposition and Interference](https://courses.lumenlearning.com/suny-physics/chapter/16-10-superposition-and-interference/)

[3] [Interference of Waves](https://courses.lumenlearning.com/suny-osuniversityphysics/chapter/16-5-interference-of-waves/)

[4] [Constructive and Destructive Interference](https://www.phys.uconn.edu/~gibson/Notes/Section5_2/Sec5_2.htm)

[5] [How to add sine functions of different amplitude and phase](https://scipp.ucsc.edu/~haber/ph5B/addsine.pdf)


