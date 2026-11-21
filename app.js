const attackSlider = document.getElementById("attack");
const attackValue = document.getElementById("attackValue");

let synth;

const startBtn = document.getElementById("startBtn");
const waveformSelect = document.getElementById("waveform");

const decaySlider = document.getElementById("decay");
const decayValue = document.getElementById("decayValue");

const sustainSlider = document.getElementById("sustain");
const sustainValue = document.getElementById("sustainValue");

const releaseSlider = document.getElementById("release");
const releaseValue = document.getElementById("releaseValue");

const durationSlider = document.getElementById("duration");
const durationValue = document.getElementById("durationValue");

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

const notes = {
    a: "C4",
    s: "D4",
    d: "E4",
    f: "F4",
    g: "G4",
    h: "A4",
    j: "B4",
    k: "C5"
};

document.addEventListener("keydown", (event) => {

    if (!synth) return;

    const note = notes[event.key.toLowerCase()];

    if (note) {
        synth.oscillator.type = waveformSelect.value;
        synth.triggerAttackRelease(
    note,
    Number(durationSlider.value)
);
        console.log(note);
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