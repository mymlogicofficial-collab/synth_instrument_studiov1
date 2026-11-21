const attackSlider = document.getElementById("attack");
const attackValue = document.getElementById("attackValue");

let synth;

const startBtn = document.getElementById("startBtn");
const waveformSelect = document.getElementById("waveform");

const decaySlider = document.getElementById("decay");
const decayValue = document.getElementById("decayValue");

startBtn.addEventListener("click", async function () {

    await Tone.start();

    synth = new Tone.MonoSynth({
    oscillator: {
        type: waveformSelect.value
    },
    envelope: {
        attack: Number(attackSlider.value),
        decay: Number(decaySlider.value),
        sustain: 0.6,
        release: 1
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
        synth.triggerAttackRelease(note, "8n");
        console.log(note);
    }
});

attackSlider.addEventListener("input", () => {
    attackValue.textContent = attackSlider.value;
});

decaySlider.addEventListener("input", () => {
    decayValue.textContent = decaySlider.value;
});