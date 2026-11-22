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

const projectName =
    document.getElementById("projectName");

const projectDescription =
    document.getElementById("projectDescription");

const saveBtn =
    document.getElementById("saveBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const copyBtn =
    document.getElementById("copyBtn");

    const importBtn =
    document.getElementById("importBtn");

const importFile =
    document.getElementById("importFile");

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

function buildProjectData() {

    return {

        name: projectName?.value || "Untitled Project",

        description:
            projectDescription?.value || "",

        waveform: waveformSelect.value,

        attack: Number(attackSlider.value),
        decay: Number(decaySlider.value),
        sustain: Number(sustainSlider.value),
        release: Number(releaseSlider.value),

        duration: Number(durationSlider.value),

        recordingData: recordingData

    };
}

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

function loadProject(data) {

    projectName.value =
        data.name || "";

    projectDescription.value =
        data.description || "";

    waveformSelect.value =
        data.waveform || "sine";

    attackSlider.value =
        data.attack ?? 0.05;

    decaySlider.value =
        data.decay ?? 0.2;

    sustainSlider.value =
        data.sustain ?? 0.6;

    releaseSlider.value =
        data.release ?? 1;

    durationSlider.value =
        data.duration ?? 1;

    attackValue.textContent =
        attackSlider.value;

    decayValue.textContent =
        decaySlider.value;

    sustainValue.textContent =
        sustainSlider.value;

    releaseValue.textContent =
        releaseSlider.value;

    durationValue.textContent =
        durationSlider.value;

    recordingData =
        data.recordingData || [];

    waveformSelect.dispatchEvent(
        new Event("change")
    );

    updateEnvelope();

    console.log(
        "PROJECT LOADED",
        data.name
    );
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

saveBtn?.addEventListener("click", () => {

    const data = buildProjectData();

    localStorage.setItem(
        "sis-project",
        JSON.stringify(data)
    );

    console.log(
        "PROJECT SAVED",
        data.name
    );
});

importBtn.addEventListener("click", () => {

    importFile.click();

});

importFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            loadProject(data);
        } catch (error) {
            console.error("Error parsing imported project:", error);
        }
    };
    reader.readAsText(file);
});

downloadBtn?.addEventListener("click", () => {

    const data = buildProjectData();

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        `${data.name || "sis-project"}.json`;

    a.click();

    URL.revokeObjectURL(url);

    console.log(
        "PROJECT DOWNLOADED",
        data.name
    );
});

copyBtn?.addEventListener(
    "click",
    async () => {

        const data =
            buildProjectData();

        await navigator.clipboard.writeText(
            JSON.stringify(
                data,
                null,
                2
            )
        );

        console.log(
            "PROJECT COPIED",
            data.name
        );
    }
);

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

loadBtn?.addEventListener(
    "click",
    () => {

        const saved =
            localStorage.getItem(
                "sis-project"
            );

        if (!saved) {
            console.log(
                "NO SAVED PROJECT"
            );
            return;
        }

        loadProject(
            JSON.parse(saved)
        );

    }
);

importFile.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = (e) => {

            try {

                const data =
                    JSON.parse(
                        e.target.result
                    );

                loadProject(data);

                console.log(
                    "PROJECT IMPORTED",
                    data.name
                );

            }
            catch {

                console.log(
                    "INVALID PROJECT FILE"
                );
            }

        };

        reader.readAsText(file);

    }
);

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