# sound-interference

This interactive is meant to simulate constructive/destructive interference due to two speakers. Interference is a result of the adding of two off-phase waves, causing the troughs and peaks of the waves to 'cancel' or 'multiply'.

<img width="625" alt="Screenshot 2023-12-16 215030" src="https://github.com/lkc2140/sound-interference/assets/123655927/c29da237-3ae1-450f-a027-5f2f0059f688">

Starting from the wave equations for two sound waves, we can determine how the total amplitude is affected by superposition and phase difference. Given two sine waves of amplitudes $A_1$ and $A_2$, the waves will have a phase shift which correspond to the difference in path, $\Delta r$ between them. If wave 1 travels a distance $r_1$ and wave 2 travels a distance $r_2$, the phase shift is:

$$\phi = 2\pi f \Delta t = 2 \pi \frac{\Delta v}{\lambda} \Delta t = 2 \pi \frac{\Delta r}{\lambda} =2 \pi \frac{r_2 - r_1}{\lambda}$$

Where $f$ is the frequency and $\lambda$ is the wavelength of the waves.

The figure illustrates $r_1$ and $r_2$ between two speakers and a listener. This path difference is what will cause the constructive/destructive interference heard.

<img width="629" alt="Screenshot 2023-12-16 215056" src="https://github.com/lkc2140/sound-interference/assets/123655927/dc462d5f-0c5b-458e-9a20-0ab51b4fee68">

I will represent a single sine wave as:
$\Psi = A\sin(\omega t + \phi)$.

Where $\omega$ is the angular speed, or the rate of oscillation.

From my review of literature, I believe it is reasonable to assume that when these two waves, of the same frequency, add together, they will form a resultant sine wave which will also have some phase shift, $\delta$ and amplitude, $A_{eff}$.
$A_1\sin(\omega t + \phi) + A_2\sin(\omega t) = A_{eff}sin(\omega t + \delta)$

We can now calculate the effective amplitude:

$A_1\sin(\omega t + \phi) + A_2\sin(\omega t) = A_{eff}sin(\omega t + \delta)$

$A_1e^{i(\omega t + \phi)} + A_2e^{i \omega t} = A_{eff}e^{i(\omega t + \delta)}$

$A_1e^{i\phi} + A_2 = A_{eff}e^{i\delta}$

Now, taking the complex ampitude and expanding the exponents:

$|A\cos\phi + Aisin\phi +B|^2 = |A_{eff} \cos\delta + iA_{eff}\sin\delta|^2$

$(A\cos\phi + B)^2 + (Asin\phi)^2 = (A_{eff} \cos\delta)^2  (A_{eff}\sin\delta|)^2$

$A^2 \cos^2\phi + 2AB\cos\phi + B^2 +A^2 \sin^2\phi = A_{eff}^2$

$A^2 + B^2 + 2 ABcos\phi = A_{eff}^2$
