let synth;

const startBtn = document.getElementById("startBtn");
const waveformSelect = document.getElementById("waveform");

startBtn.addEventListener("click", async function () {

    await Tone.start();

    synth = new Tone.Synth({
        oscillator: {
            type: waveformSelect.value
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