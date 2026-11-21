const attackSlider = document.getElementById("attack");
const attackValue = document.getElementById("attackValue");

const decaySlider = document.getElementById("decay");
const decayValue = document.getElementById("decayValue");

const sustainSlider = document.getElementById("sustain");
const sustainValue = document.getElementById("sustainValue");

const releaseSlider = document.getElementById("release");
const releaseValue = document.getElementById("releaseValue");

const durationSlider = document.getElementById("duration");
const durationValue = document.getElementById("durationValue");

const startBtn = document.getElementById("startBtn");
const waveformSelect = document.getElementById("waveform");

let synth;

startBtn.addEventListener("click", async function () {

    await Tone.start();

    synth = new Tone.MonoSynth({
        oscillator: {
            type: waveformSelect.value
        },

        envelope: {
            attack: Number(attackSlider.value),
            decay: Number(decaySlider.value),
            sustain: Number(sustainSlider.value),
            release: Number(releaseSlider.value)
        }

    }).toDestination();

    console.log("Tone started");
});

const keyMap = {

    q: "C3",
    2: "C#3",

    w: "D3",
    3: "D#3",

    e: "E3",

    r: "F3",
    5: "F#3",

    t: "G3",
    6: "G#3",

    y: "A3",
    7: "A#3",

    u: "B3"

};

document.addEventListener("keydown", (event) => {

    if (!synth) return;

    const note = keyMap[event.key.toLowerCase()];

   if (note) {

    playNote(note);

    console.log(note);
}

    const visualKey = document.querySelector(
        `[data-key="${event.key.toLowerCase()}"]`
    );

    if (visualKey) {
        visualKey.classList.add("active");
    }

});

document.addEventListener("keyup", (event) => {

    const visualKey = document.querySelector(
        `[data-key="${event.key.toLowerCase()}"]`
    );

    if (visualKey) {
        visualKey.classList.remove("active");
    }

});

attackSlider.addEventListener("input", () => {
    attackValue.textContent = attackSlider.value;
});

decaySlider.addEventListener("input", () => {
    decayValue.textContent = decaySlider.value;
});

sustainSlider.addEventListener("input", () => {
    sustainValue.textContent = sustainSlider.value;
});

releaseSlider.addEventListener("input", () => {
    releaseValue.textContent = releaseSlider.value;
});

durationSlider.addEventListener("input", () => {
    durationValue.textContent = durationSlider.value;
});

function playNote(note) {

    if (!synth) return;

    synth.oscillator.type = waveformSelect.value;

    synth.triggerAttackRelease(
        note,
        Number(durationSlider.value)
    );
}

document.querySelectorAll("[data-key]").forEach(key => {

    const physicalKey = key.dataset.key;
    const note = keyMap[physicalKey];

    if (!note) return;

    key.addEventListener("mousedown", () => {

        key.classList.add("active");
        playNote(note);

    });

    key.addEventListener("mouseup", () => {

        key.classList.remove("active");

    });

    key.addEventListener("mouseleave", () => {

        key.classList.remove("active");

    });

    key.addEventListener("touchstart", (event) => {

        event.preventDefault();

        key.classList.add("active");
        playNote(note);

    });

    key.addEventListener("touchend", () => {

        key.classList.remove("active");

    });

});