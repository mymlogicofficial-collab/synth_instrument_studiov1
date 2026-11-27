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
const saveCellSelect = document.getElementById("saveCellSelect");
const cellSourceSelect = document.getElementById("cellSourceSelect");
const cellTargetSelect = document.getElementById("cellTargetSelect");
const saveSelectionBtn = document.getElementById("saveSelectionBtn");
const copyCellContentsBtn = document.getElementById("copyCellContentsBtn");
const pasteCellMemoryBtn = document.getElementById("pasteCellMemoryBtn");
const moveTimelineSelectionBtn = document.getElementById("moveTimelineSelectionBtn");
const deleteTimelineSelectionBtn = document.getElementById("deleteTimelineSelectionBtn");
const clearCellMemoryBtn = document.getElementById("clearCellMemoryBtn");
const renameCellInput = document.getElementById("renameCellInput");
const renameCellBtn = document.getElementById("renameCellBtn");
const repeatCellCountInput = document.getElementById("repeatCellCount");
const repeatCellBtn = document.getElementById("repeatCellBtn");
const cellActionStatus = document.getElementById("cellActionStatus");
const cellMemoryBank = document.getElementById("cellMemoryBank");
const timelineDestinationTickInput = document.getElementById("timelineDestinationTick");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

const ribbon = document.getElementById("ribbon");
const SIS_TICKS_PER_QUARTER = 960;
const DEFAULT_TEMPO_BPM = 120;
const DEFAULT_BEATS_PER_BAR = 4;
const DEFAULT_BEAT_UNIT = 4;
const DEFAULT_TRACK_ID = "track_1";
const DEFAULT_TRACK_NAME = "Track 1";
const ribbonPitchNames = [
    "C3", "C#3", "D3", "D#3", "E3", "F3",
    "F#3", "G3", "G#3", "A3", "A#3", "B3"
];
const ribbonPitchGutterWidth = 22;
const CELL_NAMES = ["A", "B", "C", "D"];

let isRecording = false;
let isPlaying = false;
let recordingStart = 0;
let recordingStartTick = 0;
let recordingData = [];
let playbackTimeouts = [];
let regionCount = 4;
let timelineDurationTicks = 0;
let ribbonNotes = [];
let tempoBpm = DEFAULT_TEMPO_BPM;
let beatsPerBar = DEFAULT_BEATS_PER_BAR;
let beatUnit = DEFAULT_BEAT_UNIT;
let tracks = createDefaultTracks();
let cellMemories = createEmptyCellMemories();
let selectedCellMemoryId = cellMemories[0].id;
let timelineSelectionIds = new Set();
let timelineSelectionAnchorTick = null;

let synth;
const activeNotes = new Set();
const activeRecordingNoteIds = new Map();

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
        return ticksToMilliseconds(getTimelineLengthTicks());
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
        timing: {
            tempoBpm: tempoBpm,
            beatsPerBar: beatsPerBar,
            beatUnit: beatUnit,
            ticksPerQuarter: SIS_TICKS_PER_QUARTER
        },
        timeline: {
            duration: ticksToMilliseconds(getTimelineLengthTicks()) / 1000,
            tracks: tracks.map(track => track.id)
        },
        tracks: tracks.map(track => ({ ...track, events: [...track.events] })),
        timelineEvents: recordingData.map(event => ({ ...event })),
        cellMemories: cellMemories.map(cell => ({
            ...cell,
            events: cell.events.map(event => ({ ...event }))
        })),
        selectedCellMemoryId: selectedCellMemoryId
    };
}

function getCellMemory(cellId) {
    return cellMemories.find(cell => cell.id === cellId);
}

function createDefaultTracks() {
    return [{
        id: DEFAULT_TRACK_ID,
        name: DEFAULT_TRACK_NAME,
        muted: false,
        solo: false,
        events: []
    }];
}

function createEmptyCellMemories() {
    return CELL_NAMES.map(name => ({
        id: name,
        name,
        createdAt: null,
        events: []
    }));
}

function secondsToTicks(seconds) {
    return Math.max(
        0,
        Math.round((Number(seconds) * tempoBpm * SIS_TICKS_PER_QUARTER) / 60)
    );
}

function getEventTick(event) {
    const storedTick = Number(event.startTick ?? event.tick);
    if (Number.isFinite(storedTick) && storedTick >= 0) {
        return Math.round(storedTick);
    }

    const startTimeSeconds = Number(event.startTime);
    if (Number.isFinite(startTimeSeconds) && startTimeSeconds >= 0) {
        return secondsToTicks(startTimeSeconds);
    }

    const legacyTimeMs = Number(event.time);
    return Number.isFinite(legacyTimeMs) && legacyTimeMs >= 0
        ? secondsToTicks(legacyTimeMs / 1000)
        : 0;
}

function getEventDurationTicks(event) {
    const storedTicks = Number(event.durationTicks);
    if (Number.isFinite(storedTicks) && storedTicks > 0) {
        return Math.round(storedTicks);
    }

    const duration = Number(event.duration);
    return Number.isFinite(duration) && duration > 0
        ? Math.max(1, secondsToTicks(duration))
        : 1;
}

function secondsForTicks(ticks) {
    return ticksToMilliseconds(ticks) / 1000;
}

function makeTimelineEvent(rawEvent, startTick, durationTicks) {
    const normalizedStartTick = Math.max(0, Math.round(startTick));
    const normalizedDurationTicks = Math.max(1, Math.round(durationTicks));
    return {
        id: String(rawEvent.id || rawEvent.eventId || crypto.randomUUID()),
        trackId: String(rawEvent.trackId || DEFAULT_TRACK_ID),
        note: String(rawEvent.note || ""),
        startTime: secondsForTicks(normalizedStartTick),
        duration: secondsForTicks(normalizedDurationTicks),
        startTick: normalizedStartTick,
        durationTicks: normalizedDurationTicks,
        velocity: Number.isFinite(Number(rawEvent.velocity))
            ? Number(rawEvent.velocity)
            : 1,
        waveform: String(rawEvent.waveform || waveformSelect.value),
        attack: Number.isFinite(Number(rawEvent.attack))
            ? Number(rawEvent.attack)
            : Number(attackSlider.value),
        decay: Number.isFinite(Number(rawEvent.decay))
            ? Number(rawEvent.decay)
            : Number(decaySlider.value),
        sustain: Number.isFinite(Number(rawEvent.sustain))
            ? Number(rawEvent.sustain)
            : Number(sustainSlider.value),
        release: Number.isFinite(Number(rawEvent.release))
            ? Number(rawEvent.release)
            : Number(releaseSlider.value)
    };
}

function normalizeCellEvent(rawEvent) {
    const startOffsetTicks = Number.isFinite(Number(rawEvent.startOffsetTicks))
        ? Math.max(0, Math.round(Number(rawEvent.startOffsetTicks)))
        : secondsToTicks(rawEvent.startOffset || 0);
    const durationTicks = Number.isFinite(Number(rawEvent.durationTicks))
        ? Math.max(1, Math.round(Number(rawEvent.durationTicks)))
        : Math.max(1, secondsToTicks(rawEvent.duration || 0));
    const event = makeTimelineEvent(rawEvent, startOffsetTicks, durationTicks);
    return {
        ...event,
        startOffset: secondsForTicks(startOffsetTicks),
        startOffsetTicks
    };
}

function normalizeCellMemories(savedMemories) {
    const defaults = createEmptyCellMemories();
    const savedByName = new Map();
    (Array.isArray(savedMemories) ? savedMemories : [])
        .filter(cell => cell && typeof cell === "object")
        .forEach(cell => {
            const id = String(cell.id || cell.name || "").replace(/^cell-memory-/, "");
            if (id) savedByName.set(id, cell);
            if (cell.name && !savedByName.has(String(cell.name))) {
                savedByName.set(String(cell.name), cell);
            }
        });

    return defaults.map(defaultCell => {
        const saved = savedByName.get(defaultCell.name);
        if (saved && !Array.isArray(saved.events)) {
            throw new TypeError(`Cell ${defaultCell.name} memory events must be an array.`);
        }
        const savedEvents = saved?.events || [];
        const hasLegacyPairs = savedEvents.some(event => (
            event && (event.type === "noteOn" || event.type === "noteOff")
        ));
        const normalizedSavedEvents = hasLegacyPairs
            ? normalizeTimelineEvents(savedEvents)
            : savedEvents.map(rawEvent => {
                if (!rawEvent || typeof rawEvent !== "object") {
                    throw new TypeError(`Cell ${defaultCell.name} contains an invalid memory event.`);
                }
                return normalizeCellEvent(rawEvent);
            });

        return {
            id: defaultCell.id,
            name: String(saved?.name || defaultCell.name),
            createdAt: saved?.createdAt != null && Number.isFinite(Number(saved.createdAt))
                ? Number(saved.createdAt)
                : null,
            events: normalizedSavedEvents.map(event => {
                const normalized = normalizeCellEvent(event.startOffset !== undefined
                    ? event
                    : {
                        ...event,
                        startOffsetTicks: getEventTick(event),
                        durationTicks: getEventDurationTicks(event)
                    });
                delete normalized.type;
                delete normalized.startTime;
                delete normalized.startTick;
                return normalized;
            })
        };
    });
}

function normalizeTimelineEvents(events) {
    if (!Array.isArray(events)) {
        throw new TypeError("Project timeline events must be an array.");
    }

    if (events.some(event => event && (event.type === "noteOn" || event.type === "noteOff"))) {
        const activeNotes = new Map();
        const notes = [];
        events.forEach(rawEvent => {
            if (!rawEvent || typeof rawEvent !== "object") {
                throw new TypeError("Project timeline contains an invalid event.");
            }
            const key = String(rawEvent.noteId || rawEvent.note);
            if (rawEvent.type === "noteOn") {
                activeNotes.set(key, rawEvent);
            } else if (rawEvent.type === "noteOff") {
                const noteOn = activeNotes.get(key);
                if (!noteOn) {
                    throw new TypeError(`Timeline note "${rawEvent.note}" has no matching note-on.`);
                }
                const startTick = getEventTick(noteOn);
                const endTick = getEventTick(rawEvent);
                if (endTick <= startTick) {
                    throw new TypeError(`Timeline note "${rawEvent.note}" has invalid duration.`);
                }
                notes.push(makeTimelineEvent({
                    ...noteOn,
                    id: noteOn.id || noteOn.eventId,
                    trackId: noteOn.trackId || rawEvent.trackId
                }, startTick, endTick - startTick));
                activeNotes.delete(key);
            } else {
                notes.push(makeTimelineEvent(
                    rawEvent,
                    getEventTick(rawEvent),
                    getEventDurationTicks(rawEvent)
                ));
            }
        });
        if (activeNotes.size > 0) {
            throw new TypeError("Project timeline contains note-on events without matching note-off events.");
        }
        return notes;
    }

    return events.map(rawEvent => {
        if (!rawEvent || typeof rawEvent !== "object") {
            throw new TypeError("Project timeline contains an invalid event.");
        }
        const startTick = getEventTick(rawEvent);
        const durationTicks = getEventDurationTicks(rawEvent);
        const normalized = makeTimelineEvent(rawEvent, startTick, durationTicks);
        if (rawEvent.startOffset !== undefined) {
            const startOffsetTicks = Number.isFinite(Number(rawEvent.startOffsetTicks))
                ? Math.max(0, Math.round(Number(rawEvent.startOffsetTicks)))
                : secondsToTicks(rawEvent.startOffset);
            normalized.startTime = secondsForTicks(startOffsetTicks);
            normalized.startTick = startOffsetTicks;
        }
        return normalized;
    });
}

function normalizeTracks(savedTracks, timelineEvents) {
    const knownTracks = new Map();
    if (Array.isArray(savedTracks)) {
        savedTracks.forEach(track => {
            const trackId = typeof track === "string" ? track : track?.id;
            if (!trackId) return;
            knownTracks.set(String(trackId), {
                id: String(trackId),
                name: String(typeof track === "string" ? track : track.name || trackId),
                muted: Boolean(typeof track === "string" ? false : track.muted),
                solo: Boolean(typeof track === "string" ? false : track.solo),
                events: []
            });
        });
    }
    if (!knownTracks.has(DEFAULT_TRACK_ID)) {
        knownTracks.set(DEFAULT_TRACK_ID, createDefaultTracks()[0]);
    }
    timelineEvents.forEach(event => {
        if (!knownTracks.has(event.trackId)) {
            knownTracks.set(event.trackId, {
                id: event.trackId,
                name: event.trackId,
                muted: false,
                solo: false,
                events: []
            });
        }
    });
    return [...knownTracks.values()];
}

function rebuildTrackEventRefs() {
    tracks.forEach(track => {
        track.events = recordingData
            .filter(event => event.trackId === track.id)
            .map(event => event.id);
    });
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

    if (type === "noteOn") {
        const elapsed = performance.now() - recordingStart;
        const startTick = recordingStartTick
            + Math.round((elapsed * tempoBpm * SIS_TICKS_PER_QUARTER) / 60000);
        activeRecordingNoteIds.set(note, {
            id: crypto.randomUUID(),
            trackId: DEFAULT_TRACK_ID,
            startTick,
            note,
            velocity: 1,
            waveform: waveformSelect.value,
            attack: Number(attackSlider.value),
            decay: Number(decaySlider.value),
            sustain: Number(sustainSlider.value),
            release: Number(releaseSlider.value)
        });
        return;
    }

    if (type === "noteOff") {
        const startedNote = activeRecordingNoteIds.get(note);
        if (!startedNote) return;
        activeRecordingNoteIds.delete(note);
        const elapsed = performance.now() - recordingStart;
        const endTick = recordingStartTick
            + Math.round((elapsed * tempoBpm * SIS_TICKS_PER_QUARTER) / 60000);
        recordingData.push(makeTimelineEvent(
            startedNote,
            startedNote.startTick,
            Math.max(1, endTick - startedNote.startTick)
        ));
        rebuildTrackEventRefs();
        renderRibbon();
    }
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

    const timing = data.timing || {};
    const loadedTempo = Number(timing.tempoBpm);
    const loadedBeatsPerBar = Number(timing.beatsPerBar);
    const loadedBeatUnit = Number(timing.beatUnit);
    tempoBpm = Number.isFinite(loadedTempo) && loadedTempo > 0
        ? loadedTempo
        : DEFAULT_TEMPO_BPM;
    beatsPerBar = Number.isInteger(loadedBeatsPerBar) && loadedBeatsPerBar > 0
        ? loadedBeatsPerBar
        : DEFAULT_BEATS_PER_BAR;
    beatUnit = Number.isInteger(loadedBeatUnit) && loadedBeatUnit > 0
        ? loadedBeatUnit
        : DEFAULT_BEAT_UNIT;

    regionCount = Math.max(1, Number(data.regionCount) || 4);
    const savedTimelineDuration = Number(data.timeline?.duration);
    timelineDurationTicks = Number.isFinite(savedTimelineDuration) && savedTimelineDuration > 0
        ? secondsToTicks(savedTimelineDuration)
        : 0;
    cellMemories = normalizeCellMemories(data.cellMemories);
    selectedCellMemoryId = cellMemories.some(cell => cell.id === data.selectedCellMemoryId)
        ? data.selectedCellMemoryId
        : cellMemories[0].id;
    recordingData = normalizeTimelineEvents(
        data.timelineEvents || data.events || data.recordingData || []
    );
    tracks = normalizeTracks(data.tracks || data.timeline?.tracks, recordingData);
    rebuildTrackEventRefs();

    waveformSelect.dispatchEvent(new Event("change"));
    updateEnvelope();
    updateCellTransferControls();
    renderCellMemoryBank();
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

function renderRegions(count = regionCount) {
    if (!ribbon) return;
    const safeCount = Math.max(1, Number(count) || 1);
    const widthPct = 100 / safeCount;

    for (let i = 0; i < safeCount; i++) {
        const seg = document.createElement("div");
        seg.className = "ribbon-region";
        seg.dataset.regionIndex = String(i);
        seg.dataset.regionName = String(i + 1);
        seg.style.left = `${i * widthPct}%`;
        seg.style.width = `${widthPct}%`;

        const tag = document.createElement("span");
        tag.className = "ribbon-region-label";
        tag.textContent = String(i + 1);

        seg.appendChild(tag);
        ribbon.appendChild(seg);
    }
}

function handleTimelineNoteSelection(note, event) {
    const noteId = note.id;
    if (event.shiftKey && timelineSelectionAnchorTick !== null) {
        const rangeStart = Math.min(timelineSelectionAnchorTick, note.startTick);
        const rangeEnd = Math.max(timelineSelectionAnchorTick, note.startTick);
        if (!event.ctrlKey && !event.metaKey) timelineSelectionIds.clear();
        ribbonNotes.forEach(candidate => {
            if (candidate.startTick >= rangeStart && candidate.startTick <= rangeEnd) {
                timelineSelectionIds.add(candidate.id);
            }
        });
    } else if (event.ctrlKey || event.metaKey) {
        if (timelineSelectionIds.has(noteId)) timelineSelectionIds.delete(noteId);
        else timelineSelectionIds.add(noteId);
        timelineSelectionAnchorTick = note.startTick;
    } else {
        timelineSelectionIds.clear();
        timelineSelectionIds.add(noteId);
        timelineSelectionAnchorTick = note.startTick;
    }

    updateTimelineSelectionAppearance();
    const count = timelineSelectionIds.size;
    setCellActionStatus(`${count} timeline event${count === 1 ? "" : "s"} selected.`);
}

function updateTimelineSelectionAppearance() {
    document.querySelectorAll(".ribbon-block").forEach(block => {
        const selected = timelineSelectionIds.has(block.dataset.noteId);
        block.classList.toggle("selected", selected);
        block.setAttribute("aria-pressed", String(selected));
    });
}

function getSelectedTimelineNotes() {
    return ribbonNotes.filter(note => timelineSelectionIds.has(note.id));
}

function renderRibbon() {
    if (!ribbon) return;

    ribbon.innerHTML = "";
    renderRegions(regionCount);
    playhead.ensureEl();
    const timelineLengthTicks = getTimelineLengthTicks();
    const plot = document.createElement("div");
    plot.className = "ribbon-note-plot timeline-note-plot";
    plot.style.left = `${ribbonPitchGutterWidth}px`;
    ribbon.appendChild(plot);

    const laneHeight = ribbon.clientHeight / ribbonPitchNames.length;
    [...ribbonPitchNames].reverse().forEach((pitch, row) => {
        const lane = document.createElement("div");
        lane.className = "ribbon-pitch-lane";
        if (pitch.includes("#")) lane.classList.add("sharp");
        lane.style.top = `${row * laneHeight}px`;
        lane.style.height = `${laneHeight}px`;

        const label = document.createElement("span");
        label.className = "ribbon-pitch-label";
        label.textContent = pitch;
        lane.appendChild(label);
        plot.appendChild(lane);
    });

    const sixteenthTicks = SIS_TICKS_PER_QUARTER / 4;
    for (let tick = sixteenthTicks; tick < timelineLengthTicks; tick += sixteenthTicks) {
        const tickElement = document.createElement("div");
        tickElement.className = "ribbon-time-tick";
        tickElement.style.left = `${(tick / timelineLengthTicks) * 100}%`;
        if (tick % SIS_TICKS_PER_QUARTER === 0) tickElement.classList.add("beat");
        plot.appendChild(tickElement);
    }

    ribbonNotes = buildRibbonNotes();

    ribbonNotes.forEach(note => {
        const block = document.createElement("div");
        block.className = "ribbon-block";
        if (note.note.includes("#")) block.classList.add("sharp");
        block.dataset.note = note.note;
        block.dataset.noteId = note.id;
        block.dataset.startTick = String(note.startTick);
        block.dataset.durationTicks = String(note.durationTicks);
        block.title = `${note.note} - Start: ${note.startTick} ticks - Duration: ${note.durationTicks} ticks`;
        block.setAttribute(
            "aria-label",
            `${note.note} note, starts at tick ${note.startTick}, duration ${note.durationTicks} ticks`
        );
        block.setAttribute("role", "button");
        block.tabIndex = 0;

        block.classList.add("timeline-event");

        const startRatio = note.startTick / timelineLengthTicks;
        const durationRatio = note.durationTicks / timelineLengthTicks;
        const pitchIndex = ribbonPitchNames.indexOf(note.note);
        const row = pitchIndex === -1
            ? 0
            : ribbonPitchNames.length - 1 - pitchIndex;

        block.style.left = `${startRatio * 100}%`;
        block.style.width = `${durationRatio * 100}%`;
        block.style.top = `${(row / ribbonPitchNames.length) * 100}%`;
        block.style.height = `${100 / ribbonPitchNames.length}%`;
        if (plot.clientWidth * durationRatio >= 24) {
            block.textContent = note.note;
        }
        block.addEventListener("click", event => handleTimelineNoteSelection(note, event));
        block.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleTimelineNoteSelection(note, event);
            }
        });

        plot.appendChild(block);
    });

    updateTimelineSelectionAppearance();
    playhead.setRange(0, 100);
    playhead.reset();
}

function buildRibbonNotes() {
    return recordingData.map(event => ({
        id: event.id,
        trackId: event.trackId,
        note: event.note,
        startTick: getEventTick(event),
        durationTicks: getEventDurationTicks(event)
    }));
}

function ticksToMilliseconds(ticks) {
    return (ticks * 60000) / (tempoBpm * SIS_TICKS_PER_QUARTER);
}

function getTimelineLengthTicks() {
    const barLengthTicks = (SIS_TICKS_PER_QUARTER * beatsPerBar * 4) / beatUnit;
    return Math.max(
        regionCount * barLengthTicks,
        timelineDurationTicks,
        ...recordingData.map(event => getEventTick(event) + getEventDurationTicks(event)),
        1
    );
}

function updateCellTransferControls() {
    const fillSelect = (select, preferredId, avoidId = "") => {
        if (!select) return;
        const previousId = select.value;
        select.replaceChildren();

        cellMemories.forEach(cell => {
            const option = document.createElement("option");
            option.value = cell.id;
            option.textContent = `Cell ${cell.name}`;
            select.appendChild(option);
        });

        const hasCell = id => cellMemories.some(cell => cell.id === id);
        const preferred = hasCell(previousId)
            ? previousId
            : hasCell(preferredId)
                ? preferredId
                : cellMemories[0]?.id || "";
        select.value = preferred === avoidId
            ? cellMemories.find(cell => cell.id !== avoidId)?.id || preferred
            : preferred;
    };

    fillSelect(saveCellSelect, selectedCellMemoryId);
    fillSelect(cellSourceSelect, selectedCellMemoryId);
    fillSelect(
        cellTargetSelect,
        cellMemories.find(cell => cell.id !== selectedCellMemoryId)?.id,
        cellSourceSelect?.value
    );
}

function renderCellMemoryBank() {
    if (!cellMemoryBank) return;
    cellMemoryBank.replaceChildren();

    cellMemories.forEach(cell => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "cell-memory-slot";
        button.classList.toggle("selected", cell.id === selectedCellMemoryId);
        button.setAttribute("aria-pressed", String(cell.id === selectedCellMemoryId));
        button.dataset.cellId = cell.id;

        const pairedNoteIds = new Set(
            cell.events
                .map(event => event.id)
        );
        button.textContent = `${cell.name}\n${pairedNoteIds.size ? `${pairedNoteIds.size} saved note${pairedNoteIds.size === 1 ? "" : "s"}` : "Empty"}`;
        button.addEventListener("click", () => {
            selectedCellMemoryId = cell.id;
            if (saveCellSelect) saveCellSelect.value = cell.id;
            if (cellSourceSelect) cellSourceSelect.value = cell.id;
            renderCellMemoryBank();
        });
        cellMemoryBank.appendChild(button);
    });

    const selectedCell = getCellMemory(selectedCellMemoryId);
    if (renameCellInput) renameCellInput.value = selectedCell?.name || "";
}

function getTimelineSelection() {
    const selectedNotes = getSelectedTimelineNotes();
    if (selectedNotes.length === 0) return null;

    const selectedIds = new Set(selectedNotes.map(note => note.id));
    const selectedEvents = recordingData.filter(event => selectedIds.has(event.id));
    const startTick = Math.min(...selectedEvents.map(getEventTick));
    const endTick = Math.max(...selectedEvents.map(
        event => getEventTick(event) + getEventDurationTicks(event)
    ));
    const trackIds = [...new Set(selectedEvents.map(event => event.trackId))];

    return {
        startTime: secondsForTicks(startTick),
        endTime: secondsForTicks(endTick),
        startTick,
        endTick,
        trackIds,
        eventIds: [...selectedIds]
    };
}

function getTimelineEventsInSelection(selection) {
    if (!selection || !Number.isFinite(Number(selection.startTime))
        || !Number.isFinite(Number(selection.endTime))
        || Number(selection.endTime) <= Number(selection.startTime)
        || !Array.isArray(selection.trackIds)) {
        throw new TypeError("Provide a valid timeline selection.");
    }

    if (Array.isArray(selection.eventIds)) {
        const selectedIds = new Set(selection.eventIds.map(String));
        return recordingData.filter(event => selectedIds.has(event.id));
    }

    const startTick = Number.isFinite(Number(selection.startTick))
        ? Number(selection.startTick)
        : secondsToTicks(selection.startTime);
    const endTick = Number.isFinite(Number(selection.endTick))
        ? Number(selection.endTick)
        : secondsToTicks(selection.endTime);
    const trackIds = new Set(selection.trackIds.map(String));
    return recordingData.filter(event => (
        trackIds.has(event.trackId)
        && getEventTick(event) >= startTick
        && getEventTick(event) < endTick
    ));
}

function getCellDurationTicks(cell) {
    return Math.max(
        0,
        ...cell.events.map(event => (
            Number(event.startOffsetTicks)
            + Number(event.durationTicks)
        ))
    );
}

function createCellEventCopy(event, startOffsetTicks = Number(event.startOffsetTicks)) {
    const copied = normalizeCellEvent({
        ...event,
        id: crypto.randomUUID(),
        startOffsetTicks,
        startOffset: secondsForTicks(startOffsetTicks)
    });
    delete copied.startTime;
    delete copied.startTick;
    return copied;
}

function saveSelectionToCell(selection, cellId) {
    const target = getCellMemory(cellId);
    if (!target) {
        setCellActionStatus("Choose a valid Cell memory slot.", true);
        return false;
    }

    let selectedEvents;
    try {
        selectedEvents = getTimelineEventsInSelection(selection);
    } catch (error) {
        setCellActionStatus(error.message, true);
        return false;
    }
    if (selectedEvents.length === 0) {
        setCellActionStatus("Select one or more timeline notes first.", true);
        return false;
    }

    if (target.events.length > 0 && !window.confirm(`Replace the saved contents of Cell ${target.name}?`)) {
        setCellActionStatus("Save cancelled; cell memory and timeline are unchanged.");
        return false;
    }

    const startTick = Math.min(...selectedEvents.map(getEventTick));
    target.events = selectedEvents.map(event => createCellEventCopy(
        event,
        getEventTick(event) - startTick
    ));
    target.createdAt = Date.now();
    selectedCellMemoryId = target.id;
    renderCellMemoryBank();
    setCellActionStatus(`Saved ${selectedEvents.length} selected note${selectedEvents.length === 1 ? "" : "s"} to Cell ${target.name}.`);
    return true;
}

function copyCell(sourceId, targetId) {
    const source = getCellMemory(sourceId);
    const target = getCellMemory(targetId);
    if (!source || !target) {
        setCellActionStatus("Choose valid source and destination Cell memory slots.", true);
        return false;
    }
    if (source.id === target.id) {
        setCellActionStatus("Choose two different Cell memory slots.", true);
        return false;
    }
    if (source.events.length === 0) {
        setCellActionStatus(`Cell ${source.name} is empty.`, true);
        return false;
    }
    if (target.events.length > 0 && !window.confirm(`Replace the saved contents of Cell ${target.name}?`)) {
        setCellActionStatus("Copy cancelled; cell memories are unchanged.");
        return false;
    }

    target.events = source.events.map(event => createCellEventCopy(event));
    target.createdAt = Date.now();
    renderCellMemoryBank();
    setCellActionStatus(`Copied Cell ${source.name} memory to Cell ${target.name}.`);
    return true;
}

function clearCell(cellId) {
    const cell = getCellMemory(cellId);
    if (!cell) {
        setCellActionStatus("Choose a valid Cell memory slot.", true);
        return false;
    }
    if (cell.events.length > 0 && !window.confirm(`Clear the saved contents of Cell ${cell.name}?`)) {
        setCellActionStatus("Clear cancelled; cell memory and timeline are unchanged.");
        return false;
    }
    cell.events = [];
    cell.createdAt = null;
    renderCellMemoryBank();
    setCellActionStatus(`Cleared Cell ${cell.name}. Timeline events were not changed.`);
    return true;
}

function renameCell(cellId, name) {
    const cell = getCellMemory(cellId);
    const nextName = String(name || "").trim();
    if (!cell || !nextName) {
        setCellActionStatus("Choose a valid Cell and enter a non-empty name.", true);
        return false;
    }
    cell.name = nextName;
    renderCellMemoryBank();
    updateCellTransferControls();
    setCellActionStatus(`Renamed Cell ${cell.id} to ${cell.name}.`);
    return true;
}

function getDestinationTick() {
    const destinationTick = Number(timelineDestinationTickInput?.value);
    if (!Number.isInteger(destinationTick) || destinationTick < 0) {
        setCellActionStatus("Destination start tick must be a non-negative whole number.", true);
        return null;
    }
    return destinationTick;
}

function pasteCell(cellId, trackId, pasteTime) {
    const source = getCellMemory(cellId);
    if (!source) {
        setCellActionStatus("Choose a valid Cell memory slot to paste.", true);
        return false;
    }
    if (source.events.length === 0) {
        setCellActionStatus(`Cell ${source.name} is empty.`, true);
        return false;
    }
    const targetTrack = tracks.find(track => track.id === String(trackId));
    const pasteTick = secondsToTicks(pasteTime);
    if (!targetTrack || !Number.isFinite(Number(pasteTime)) || Number(pasteTime) < 0) {
        setCellActionStatus("Choose a valid target track and non-negative paste time.", true);
        return false;
    }

    const pastedEvents = source.events.map(event => makeTimelineEvent({
        ...event,
        id: crypto.randomUUID(),
        trackId: targetTrack.id
    }, pasteTick + Number(event.startOffsetTicks), Number(event.durationTicks)));
    recordingData.push(...pastedEvents);
    rebuildTrackEventRefs();
    timelineSelectionIds = new Set(pastedEvents.map(event => event.id));
    timelineSelectionAnchorTick = pasteTick;
    renderRibbon();
    setCellActionStatus(`Pasted Cell ${source.name} to the timeline at tick ${pasteTick}.`);
    return true;
}

function repeatCell(cellId, trackId, startTime, count) {
    const source = getCellMemory(cellId);
    const targetTrack = tracks.find(track => track.id === String(trackId));
    const repeatCount = Number(count);
    const startTick = secondsToTicks(startTime);
    if (!source || source.events.length === 0 || !targetTrack
        || !Number.isFinite(Number(startTime)) || Number(startTime) < 0
        || !Number.isSafeInteger(repeatCount) || repeatCount < 1) {
        setCellActionStatus("Choose a non-empty Cell, valid target track, start time, and positive whole repeat count.", true);
        return false;
    }

    const cellDurationTicks = getCellDurationTicks(source);
    if (cellDurationTicks < 1) {
        setCellActionStatus(`Cell ${source.name} has no valid duration.`, true);
        return false;
    }

    const repeatedEvents = [];
    for (let iteration = 0; iteration < repeatCount; iteration += 1) {
        const iterationStartTick = startTick + iteration * cellDurationTicks;
        source.events.forEach(event => {
            repeatedEvents.push(makeTimelineEvent({
                ...event,
                id: crypto.randomUUID(),
                trackId: targetTrack.id
            }, iterationStartTick + Number(event.startOffsetTicks), Number(event.durationTicks)));
        });
    }
    recordingData.push(...repeatedEvents);
    rebuildTrackEventRefs();
    timelineSelectionIds = new Set(repeatedEvents.map(event => event.id));
    timelineSelectionAnchorTick = startTick;
    renderRibbon();
    setCellActionStatus(`Repeated Cell ${source.name} ${repeatCount} time${repeatCount === 1 ? "" : "s"} on the timeline.`);
    return true;
}

function moveTimelineRegion(selection, destinationTime) {
    let selectedEvents;
    try {
        selectedEvents = getTimelineEventsInSelection(selection);
    } catch (error) {
        setCellActionStatus(error.message, true);
        return false;
    }
    if (selectedEvents.length === 0 || !Number.isFinite(Number(destinationTime)) || Number(destinationTime) < 0) {
        setCellActionStatus("Select timeline events and enter a valid destination time.", true);
        return false;
    }
    const selectionStartTick = Number.isFinite(Number(selection.startTick))
        ? Number(selection.startTick)
        : secondsToTicks(selection.startTime);
    const destinationTick = secondsToTicks(destinationTime);
    const deltaTicks = destinationTick - selectionStartTick;
    const selectedIds = new Set(selectedEvents.map(event => event.id));

    recordingData = recordingData.map(event => {
        if (!selectedIds.has(event.id)) return event;
        return makeTimelineEvent(event, getEventTick(event) + deltaTicks, getEventDurationTicks(event));
    });
    rebuildTrackEventRefs();
    timelineSelectionAnchorTick = destinationTick;
    renderRibbon();
    setCellActionStatus(`Moved ${selectedEvents.length} selected timeline note${selectedEvents.length === 1 ? "" : "s"}. Cell memories were not changed.`);
    return true;
}

function deleteTimelineRegion(selection) {
    let selectedEvents;
    try {
        selectedEvents = getTimelineEventsInSelection(selection);
    } catch (error) {
        setCellActionStatus(error.message, true);
        return false;
    }
    if (selectedEvents.length === 0) {
        setCellActionStatus("Select one or more timeline notes to delete.", true);
        return false;
    }
    const selectedIds = new Set(selectedEvents.map(event => event.id));
    recordingData = recordingData.filter(event => !selectedIds.has(event.id));
    rebuildTrackEventRefs();
    timelineSelectionIds.clear();
    timelineSelectionAnchorTick = null;
    updateTimelineSelectionAppearance();
    renderRibbon();
    setCellActionStatus("Deleted the selected timeline events. Cell memories were not changed.");
    return true;
}

function clearSelectedCellMemory() {
    clearCell(selectedCellMemoryId);
}

function moveTimelineSelection() {
    const selection = getTimelineSelection();
    const destinationTick = getDestinationTick();
    if (!selection || destinationTick === null) {
        if (!selection) setCellActionStatus("Select one or more timeline notes to move.", true);
        return;
    }
    moveTimelineRegion(selection, secondsForTicks(destinationTick));
}

function deleteTimelineSelection() {
    const selection = getTimelineSelection();
    if (!selection) {
        setCellActionStatus("Select one or more timeline notes to delete.", true);
        return;
    }
    deleteTimelineRegion(selection);
}

function saveSelectedTimelineNotesToCell(cellId) {
    const selection = getTimelineSelection();
    if (!selection) {
        setCellActionStatus("Select one or more timeline notes first.", true);
        return;
    }
    saveSelectionToCell(selection, cellId);
}

function pasteSelectedCellToTimeline(cellId) {
    const destinationTick = getDestinationTick();
    if (destinationTick === null) return;
    pasteCell(cellId, DEFAULT_TRACK_ID, secondsForTicks(destinationTick));
}

function repeatSelectedCellOnTimeline() {
    const cellId = cellSourceSelect?.value;
    const destinationTick = getDestinationTick();
    if (destinationTick === null) return;
    repeatCell(cellId, DEFAULT_TRACK_ID, secondsForTicks(destinationTick), repeatCellCountInput?.value);
}

function setCellActionStatus(message, isError = false) {
    if (!cellActionStatus) return;
    cellActionStatus.textContent = message;
    cellActionStatus.classList.toggle("error", isError);
}

recordBtn.addEventListener("click", () => {
    stopPlayback();
    timelineSelectionIds.clear();
    timelineSelectionAnchorTick = null;
    updateTimelineSelectionAppearance();
    activeRecordingNoteIds.clear();
    recordingStartTick = recordingData.length === 0
        ? 0
        : Math.max(...recordingData.map(
            event => getEventTick(event) + getEventDurationTicks(event)
        ));
    recordingStart = performance.now();
    isRecording = true;
    setCellActionStatus(`Recording directly to the timeline at tick ${recordingStartTick}.`);
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
    const cell = getCellMemory(selectedCellMemoryId);
    if (!cell) {
        setCellActionStatus("Select a Cell memory slot first.", true);
        return;
    }
    await navigator.clipboard.writeText(JSON.stringify(cell, null, 2));
    setCellActionStatus(`Copied Cell ${cell.name} memory data to the clipboard.`);
});

saveSelectionBtn?.addEventListener("click", () => {
    saveSelectedTimelineNotesToCell(saveCellSelect?.value);
});

copyCellContentsBtn?.addEventListener("click", () => {
    copyCell(cellSourceSelect?.value, cellTargetSelect?.value);
});

pasteCellMemoryBtn?.addEventListener("click", () => {
    pasteSelectedCellToTimeline(cellSourceSelect?.value);
});

moveTimelineSelectionBtn?.addEventListener("click", () => {
    moveTimelineSelection();
});

deleteTimelineSelectionBtn?.addEventListener("click", () => {
    deleteTimelineSelection();
});

clearCellMemoryBtn?.addEventListener("click", () => {
    clearSelectedCellMemory();
});

renameCellBtn?.addEventListener("click", () => {
    renameCell(selectedCellMemoryId, renameCellInput?.value);
});

repeatCellBtn?.addEventListener("click", () => {
    repeatSelectedCellOnTimeline();
});

pauseBtn.addEventListener("click", () => {
    if (isRecording) {
        [...activeRecordingNoteIds.keys()].forEach(note => recordEvent("noteOff", note));
        activeRecordingNoteIds.clear();
    }
    isRecording = false;
    playhead.pause();
    console.log("PAUSE");
});

stopBtn.addEventListener("click", () => {
    if (isRecording) {
        activeNotes.forEach(note => recordEvent("noteOff", note));
        isRecording = false;
        activeRecordingNoteIds.clear();
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

    const soloTracksExist = tracks.some(track => track.solo);
    const playableTrackIds = new Set(
        tracks
            .filter(track => !track.muted && (!soloTracksExist || track.solo))
            .map(track => track.id)
    );
    const playbackEvents = recordingData
        .filter(event => playableTrackIds.has(event.trackId))
        .flatMap(event => [
            { event, type: "noteOn", tick: getEventTick(event) },
            {
                event,
                type: "noteOff",
                tick: getEventTick(event) + getEventDurationTicks(event)
            }
        ])
        .sort((a, b) => (
            a.tick - b.tick
            || (a.type === b.type ? 0 : a.type === "noteOff" ? -1 : 1)
        ));

    if (playbackEvents.length === 0) {
        setCellActionStatus("No unmuted timeline events are available to play.", true);
        return;
    }

    isPlaying = true;
    console.log("PLAY");
    playhead.setRange(0, 100);
    playhead.start(ticksToMilliseconds(getTimelineLengthTicks()));

    playbackEvents.forEach(({ event, type, tick }, index) => {
        const timeoutId = setTimeout(() => {
            const keyName = noteToKeyMap[event.note];

            if (type === "noteOn") {
                synth.set({
                    oscillator: { type: event.waveform },
                    envelope: {
                        attack: event.attack,
                        decay: event.decay,
                        sustain: event.sustain,
                        release: event.release
                    }
                });
                synth.triggerAttack(event.note, undefined, event.velocity);
                if (keyName) highlightKey(keyName);
            } else if (type === "noteOff") {
                synth.triggerRelease(event.note);
                if (keyName) unhighlightKey(keyName);
            }

            if (index === playbackEvents.length - 1) {
                isPlaying = false;
            }
        }, ticksToMilliseconds(Math.max(0, tick)));

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

updateCellTransferControls();
renderCellMemoryBank();
renderRibbon();