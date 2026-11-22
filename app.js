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

const recordBtn = document.getElementById("recordBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

let isRecording = false;
let isPlaying = false;
let recordingStart = 0;
let recordingData = [];
let playbackTimeouts = []; // Tracks scheduled playback events so Stop works

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

// Reverse map so playback can highlight the visual keys
const noteToKeyMap = Object.fromEntries(
    Object.entries(keyMap).map(([k, v]) => [v, k])
);

async function buildSynth() {
    if (synth) {
        synth.releaseAll();
        synth.dispose();
    }

    activeNotes.clear();

    synth = new Tone.PolySynth(Tone.Synth).toDestination();

    synth.set({
    oscillator: {
        type: waveformSelect.value
    },

    envelope: {
        attack: Number(attackSlider.value),
        decay: Number(decaySlider.value),
        sustain: Number(sustainSlider.value),
        release: Number(releaseSlider.value)
        }
    });
}

function updateEnvelope() {
    if (!synth) return;
    synth.set({
        envelope: {
            attack: Number(attackSlider.value),
            decay: Number(decaySlider.value),
            sustain: Number(sustainSlider.value),
            release: Number(releaseSlider.value)
        }
    });
}

startBtn.addEventListener("click", async () => {
    await Tone.start();
    await buildSynth();
    console.log("Tone started");
});

waveformSelect.addEventListener("change", () => {
    if (!synth) return;
    synth.set({
        oscillator: {
            type: waveformSelect.value
        }
    });
    console.log("WAVEFORM", waveformSelect.value);
});

function highlightKey(keyName) {
    const visualKey = document.querySelector(`[data-key="${keyName}"]`);
    if (visualKey) {
        visualKey.classList.add("active");
    }
}

function unhighlightKey(keyName) {
    const visualKey = document.querySelector(`[data-key="${keyName}"]`);
    if (visualKey) {
        visualKey.classList.remove("active");
    }
}

function recordEvent(type, note) {
    if (!isRecording) return;

    recordingData.push({
        type: type,
        note: note,
        time: performance.now() - recordingStart
    });
}

function noteOn(note) {
    if (!synth) return;
    if (activeNotes.has(note)) return;

    activeNotes.add(note);
    recordEvent("noteOn", note);
    synth.triggerAttack(note);
}

function noteOff(note) {
    if (!synth) return;
    if (!activeNotes.has(note)) return; // Prevents duplicate noteOff events

    activeNotes.delete(note);
    recordEvent("noteOff", note);
    synth.triggerRelease(note);
}

// Keyboard listeners
document.addEventListener("keydown", (event) => {
    if (event.repeat) return; // Ignore OS key-repeat events

    const key = event.key.toLowerCase();
    const note = keyMap[key];

    if (!note) return;

    noteOn(note);
    highlightKey(key);
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    const note = keyMap[key];

    if (!note) return;

    noteOff(note);
    unhighlightKey(key);
});

// ADSR & Duration Sliders (now update the synth in real time)
attackSlider.addEventListener("input", () => {
    attackValue.textContent = attackSlider.value;
    updateEnvelope();
});

decaySlider.addEventListener("input", () => {
    decayValue.textContent = decaySlider.value;
    updateEnvelope();
});

sustainSlider.addEventListener("input", () => {
    sustainValue.textContent = sustainSlider.value;
    updateEnvelope();
});

releaseSlider.addEventListener("input", () => {
    releaseValue.textContent = releaseSlider.value;
    updateEnvelope();
});

if (durationSlider && durationValue) {
    durationSlider.addEventListener("input", () => {
        durationValue.textContent = durationSlider.value;
    });
}

// Transport Controls
function stopPlayback() {
    playbackTimeouts.forEach(id => clearTimeout(id));
    playbackTimeouts = [];
    isPlaying = false;

    if (synth) {
        synth.releaseAll();
    }
    activeNotes.clear();
    document.querySelectorAll("[data-key]").forEach(el => el.classList.remove("active"));
}

recordBtn.addEventListener("click", () => {
    stopPlayback();
    recordingData = [];
    recordingStart = performance.now();
    isRecording = true;
    console.log("RECORD ON");
});

pauseBtn.addEventListener("click", () => {
    isRecording = false;
    console.log("PAUSE");
});

stopBtn.addEventListener("click", () => {
    // Close out any notes currently held down when stopping a recording
    if (isRecording) {
        activeNotes.forEach(note => recordEvent("noteOff", note));
        isRecording = false;
    }
    stopPlayback();
    console.log("STOP");
});

playBtn.addEventListener("click", () => {
    if (!synth || recordingData.length === 0 || isPlaying) return;

    isRecording = false;
    isPlaying = true;
    console.log("PLAY");

    recordingData.forEach((event, index) => {
        const timeoutId = setTimeout(() => {
            const keyName = noteToKeyMap[event.note];

            if (event.type === "noteOn") {
                synth.triggerAttack(event.note);
                if (keyName) highlightKey(keyName);
            } else if (event.type === "noteOff") {
                synth.triggerRelease(event.note);
                if (keyName) unhighlightKey(keyName);
            }

            // Reset playing state after the final event
            if (index === recordingData.length - 1) {
                isPlaying = false;
            }
        }, event.time);

        playbackTimeouts.push(timeoutId);
    });
});

// Mouse & Touch listeners for on-screen keys
document.querySelectorAll("[data-key]").forEach(keyElement => {
    const physicalKey = keyElement.dataset.key;
    const note = keyMap[physicalKey];

    if (!note) return;

    keyElement.addEventListener("mousedown", () => {
        noteOn(note);
        highlightKey(physicalKey);
    });

    keyElement.addEventListener("mouseup", () => {
        noteOff(note);
        unhighlightKey(physicalKey);
    });

    keyElement.addEventListener("mouseleave", () => {
        noteOff(note);
        unhighlightKey(physicalKey);
    });

    keyElement.addEventListener("touchstart", (event) => {
        event.preventDefault();
        noteOn(note);
        highlightKey(physicalKey);
    });

    keyElement.addEventListener("touchend", () => {
        noteOff(note);
        unhighlightKey(physicalKey);
    });
});