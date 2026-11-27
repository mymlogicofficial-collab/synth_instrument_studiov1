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
const loadBtn = document.getElementById("loadBtn");

const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");

const saveBtn = document.getElementById("saveBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

const ribbon = document.getElementById("ribbon");

let isRecording = false;
let isPlaying = false;
let recordingStart = 0;
let recordingData = [];
let playbackTimeouts = [];
let regionCount = 4;
let ribbonNotes = [];
let ribbonCell = {
    id: "ribbon-cell-1",
    start: 0,
    duration: 25,
    selected: true
};

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

const noteToKeyMap = Object.fromEntries(
    Object.entries(keyMap).map(([k, v]) => [v, k])
);

const playhead = (() => {
    let rafId = null;
    let startPerf = 0;
    let pausedAtMs = 0;
    let totalDurationMs = 0;
    let rangeStartPct = 0;
    let rangeWidthPct = 100;
    let running = false;

    function ensureEl() {
        if (!ribbon) return null;
        let el = ribbon.querySelector("#ribbon-playhead");
        if (!el) {
            el = document.createElement("div");
            el.id = "ribbon-playhead";
            ribbon.appendChild(el);
        }
        return el;
    }

    function setPosition(ms) {
        const el = ensureEl();
        if (!el) return;
        const progress = totalDurationMs > 0
            ? Math.min(Math.max(ms / totalDurationMs, 0), 1)
            : 0;
        const pct = rangeStartPct + progress * rangeWidthPct;
        el.style.left = `${pct}%`;
    }

    function getMaxRecordingTime() {
        if (!Array.isArray(recordingData) || recordingData.length === 0) return 0;
        return Math.max(...recordingData.map(e => e.time || 0));
    }

    function tick(now) {
        if (!running) return;
        const elapsed = pausedAtMs + (now - startPerf);
        setPosition(elapsed);

        if (totalDurationMs > 0 && elapsed >= totalDurationMs) {
            stop(true);
            return;
        }
        rafId = requestAnimationFrame(tick);
    }

    function start(durationMs) {
        totalDurationMs = durationMs || getMaxRecordingTime();
        if (totalDurationMs <= 0) return;
        pausedAtMs = 0;
        running = true;
        startPerf = performance.now();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
    }

    function setRange(startPct, widthPct) {
        rangeStartPct = startPct;
        rangeWidthPct = widthPct;
        setPosition(pausedAtMs);
    }

    function pause() {
        if (!running) return;
        running = false;
        cancelAnimationFrame(rafId);
        pausedAtMs += performance.now() - startPerf;
    }

    function stop(snapToEnd = false) {
        running = false;
        cancelAnimationFrame(rafId);
        pausedAtMs = 0;
        setPosition(snapToEnd ? totalDurationMs : 0);
    }

    function reset() {
        running = false;
        cancelAnimationFrame(rafId);
        pausedAtMs = 0;
        totalDurationMs = getMaxRecordingTime();
        setPosition(0);
    }

    return { start, pause, stop, reset, setRange, ensureEl };
})();

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
        description: projectDescription?.value || "",
        waveform: waveformSelect.value,
        attack: Number(attackSlider.value),
        decay: Number(decaySlider.value),
        sustain: Number(sustainSlider.value),
        release: Number(releaseSlider.value),
        duration: durationSlider ? Number(durationSlider.value) : 1,
        regionCount: regionCount,
        recordingData: recordingData,
        ribbonCell: ribbonCell
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

    console.log(recordingData);
}

function loadProject(data) {
    projectName.value = data.name || "";
    projectDescription.value = data.description || "";
    waveformSelect.value = data.waveform || "sine";

    attackSlider.value = data.attack ?? 0.05;
    decaySlider.value = data.decay ?? 0.2;
    sustainSlider.value = data.sustain ?? 0.6;
    releaseSlider.value = data.release ?? 1;
    if (durationSlider) durationSlider.value = data.duration ?? 1;

    attackValue.textContent = attackSlider.value;
    decayValue.textContent = decaySlider.value;
    sustainValue.textContent = sustainSlider.value;
    releaseValue.textContent = releaseSlider.value;
    if (durationValue) durationValue.textContent = durationSlider?.value ?? "1";

    regionCount = Math.max(1, Number(data.regionCount) || 4);
    recordingData = data.recordingData || [];
    ribbonCell = data.ribbonCell
        ? {
            id: "ribbon-cell-1",
            start: Number(data.ribbonCell.start) || 0,
            duration: Math.max(1, Number(data.ribbonCell.duration) || 25),
            selected: data.ribbonCell.selected !== false
        }
        : { id: "ribbon-cell-1", start: 0, duration: 25, selected: true };

    waveformSelect.dispatchEvent(new Event("change"));
    updateEnvelope();
    renderRibbon();

    console.log("PROJECT LOADED", data.name);
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
    if (!activeNotes.has(note)) return;

    activeNotes.delete(note);
    recordEvent("noteOff", note);
    synth.triggerRelease(note);
}

document.addEventListener("keydown", (event) => {
    if (event.repeat) return;

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

function stopPlayback() {
    playbackTimeouts.forEach(id => clearTimeout(id));
    playbackTimeouts = [];
    isPlaying = false;
    playhead.stop(false);

    if (synth) {
        synth.releaseAll();
    }
    activeNotes.clear();
    document.querySelectorAll("[data-key]").forEach(el => el.classList.remove("active"));
}

function getRegionName(index) {
    let label = "";
    let n = index;
    do {
        label = String.fromCharCode(65 + (n % 26)) + label;
        n = Math.floor(n / 26) - 1;
    } while (n >= 0);
    return label;
}

function renderRibbonCell() {
    if (!ribbon) return null;

    const cell = document.createElement("div");
    cell.className = "ribbon-cell";
    cell.dataset.cellId = ribbonCell.id;
    cell.title = "Empty ribbon cell";
    cell.tabIndex = 0;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", "Empty ribbon cell");

    cell.style.left = `${ribbonCell.start}%`;
    cell.style.width = `${ribbonCell.duration}%`;
    if (ribbonCell.selected) cell.classList.add("selected");

    const selectCell = () => {
        ribbonCell.selected = true;
        document.querySelectorAll(".ribbon-cell").forEach(el => el.classList.remove("selected"));
        document.querySelectorAll(".ribbon-block").forEach(el => el.classList.remove("selected"));
        cell.classList.add("selected");
    };

    cell.addEventListener("click", selectCell);
    cell.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectCell();
        }
    });

    ribbon.appendChild(cell);
    return cell;
}

function renderRegions(count = regionCount) {
    if (!ribbon) return;
    const safeCount = Math.max(1, Number(count) || 1);
    const widthPct = 100 / safeCount;

    for (let i = 0; i < safeCount; i++) {
        const seg = document.createElement("div");
        seg.className = "ribbon-region";
        seg.dataset.regionIndex = String(i);
        seg.dataset.regionName = getRegionName(i);
        seg.style.left = `${i * widthPct}%`;
        seg.style.width = `${widthPct}%`;

        const tag = document.createElement("span");
        tag.className = "ribbon-region-label";
        tag.textContent = getRegionName(i);

        seg.appendChild(tag);
        ribbon.appendChild(seg);
    }
}

function renderRibbon() {
    if (!ribbon) return;

    ribbon.innerHTML = "";
    renderRegions(regionCount);
    playhead.ensureEl();
    const cell = renderRibbonCell();
    playhead.setRange(ribbonCell.start, ribbonCell.duration);

    if (recordingData.length === 0) {
        playhead.reset();
        return;
    }

    ribbonNotes = buildRibbonNotes();
    if (ribbonNotes.length === 0) {
        playhead.reset();
        return;
    }

    const timelineDuration = getRibbonTimelineDuration(ribbonNotes);

    ribbonNotes.forEach(note => {
        const block = document.createElement("div");
        block.className = "ribbon-block";
        block.dataset.note = note.note;
        block.dataset.start = String(note.start);
        block.dataset.duration = String(note.duration);
        block.title = `${note.note} - Start: ${note.start.toFixed(0)} ms - Duration: ${note.duration.toFixed(0)} ms`;
        block.setAttribute(
            "aria-label",
            `${note.note} note, starts at ${note.start.toFixed(0)} milliseconds, duration ${note.duration.toFixed(0)} milliseconds`
        );
        block.setAttribute("role", "img");

        block.classList.add("inside-cell");

        const left = Math.min(100, Math.max(0, (note.start / timelineDuration) * 100));
        const remainingWidth = 100 - left;
        const durationWidth = (note.duration / timelineDuration) * 100;
        const width = Math.min(
            remainingWidth,
            Math.max(durationWidth + 6, Math.min(8, remainingWidth))
        );
        block.style.left = `${left}%`;
        block.style.width = `${width}%`;
        if (width * cell.clientWidth / 100 >= 24) {
            block.textContent = note.note;
        }

        cell.appendChild(block);
    });

    playhead.reset();
}

function buildRibbonNotes() {
    const notes = [];
    const active = {};

    recordingData.forEach(event => {
        if (event.type === "noteOn") {
            active[event.note] = event.time;
        }

        if (event.type === "noteOff" && active[event.note] !== undefined) {
            notes.push({
                id: crypto.randomUUID(),
                note: event.note,
                start: active[event.note],
                duration: event.time - active[event.note]
            });

            delete active[event.note];
        }
    });

    return notes;
}

function getRibbonTimelineDuration(notes = buildRibbonNotes()) {
    return Math.max(1, ...notes.map(note => note.start + note.duration));
}

recordBtn.addEventListener("click", () => {
    stopPlayback();
    recordingData = [];
    ribbonNotes = [];
    renderRibbon();
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

    console.log("PROJECT SAVED", data.name);
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
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${data.name || "sis-project"}.json`;
    a.click();

    URL.revokeObjectURL(url);

    console.log("PROJECT DOWNLOADED", data.name);
});

copyBtn?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(JSON.stringify(ribbonCell, null, 2));
    console.log("RIBBON CELL COPIED", ribbonCell.id);
});

pauseBtn.addEventListener("click", () => {
    isRecording = false;
    playhead.pause();
    console.log("PAUSE");
});

stopBtn.addEventListener("click", () => {
    if (isRecording) {
        activeNotes.forEach(note => recordEvent("noteOff", note));
        isRecording = false;
    }
    stopPlayback();
    renderRibbon();
    console.log("STOP");
});

loadBtn?.addEventListener("click", () => {
    const saved = localStorage.getItem("sis-project");

    if (!saved) {
        console.log("NO SAVED PROJECT");
        return;
    }

    loadProject(JSON.parse(saved));
});

playBtn.addEventListener("click", () => {
    if (!synth || recordingData.length === 0 || isPlaying) return;

    isRecording = false;
    isPlaying = true;
    console.log("PLAY");

    const timelineDuration = getRibbonTimelineDuration();
    const cellPlaybackDuration = timelineDuration * (ribbonCell.duration / 100);
    playhead.setRange(ribbonCell.start, ribbonCell.duration);
    playhead.start(cellPlaybackDuration);

    const playbackEvents = recordingData
        .map(event => ({
            event,
            time: Math.min(
                cellPlaybackDuration,
                Math.max(0, (event.time / timelineDuration) * cellPlaybackDuration)
            )
        }))
        .sort((a, b) => a.time - b.time);

    playbackEvents.forEach(({ event, time }, index) => {
        const timeoutId = setTimeout(() => {
            const keyName = noteToKeyMap[event.note];

            if (event.type === "noteOn") {
                synth.triggerAttack(event.note);
                if (keyName) highlightKey(keyName);
            } else if (event.type === "noteOff") {
                synth.triggerRelease(event.note);
                if (keyName) unhighlightKey(keyName);
            }

            if (index === playbackEvents.length - 1) {
                isPlaying = false;
                playhead.stop(true);
            }
        }, time);

        playbackTimeouts.push(timeoutId);
    });
});

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