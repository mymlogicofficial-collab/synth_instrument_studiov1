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

const activeNotes = new Set();

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

startBtn.addEventListener("click", async () => {

    await Tone.start();

    synth = new Tone.PolySynth(Tone.Synth, {
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

function highlightKey(keyName) {

    const visualKey =
        document.querySelector(
            `[data-key="${keyName}"]`
        );

    if (visualKey) {
        visualKey.classList.add("active");
    }
}

function unhighlightKey(keyName) {

    const visualKey =
        document.querySelector(
            `[data-key="${keyName}"]`
        );

    if (visualKey) {
        visualKey.classList.remove("active");
    }
}

document.addEventListener("keydown", (event) => {

    if (!synth) return;

    const key = event.key.toLowerCase();
    const note = keyMap[key];

    if (!note) return;

    if (activeNotes.has(note)) return;

    activeNotes.add(note);

    synth.triggerAttack(note);

    highlightKey(key);

    console.log("DOWN", note);
});

document.addEventListener("keyup", (event) => {

    if (!synth) return;

    const key = event.key.toLowerCase();
    const note = keyMap[key];

    if (!note) return;

    activeNotes.delete(note);

    synth.triggerRelease(note);

    unhighlightKey(key);

    console.log("UP", note);
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

document.querySelectorAll("[data-key]").forEach(keyElement => {

    const physicalKey = keyElement.dataset.key;
    const note = keyMap[physicalKey];

    if (!note) return;

    keyElement.addEventListener("mousedown", () => {

        if (!synth) return;

        highlightKey(physicalKey);

        synth.triggerAttackRelease(
            note,
            Number(durationSlider.value)
        );
    });

    keyElement.addEventListener("mouseup", () => {
        unhighlightKey(physicalKey);
    });

    keyElement.addEventListener("mouseleave", () => {
        unhighlightKey(physicalKey);
    });

    keyElement.addEventListener("touchstart", (event) => {

        event.preventDefault();

        if (!synth) return;

        highlightKey(physicalKey);

        synth.triggerAttackRelease(
            note,
            Number(durationSlider.value)
        );
    });

    keyElement.addEventListener("touchend", () => {
        unhighlightKey(physicalKey);
    });

});