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
const audioStatus = document.getElementById("audioStatus");
const bank1InstrumentSelect = document.getElementById("bank1Instrument");
const bank1OctaveDownBtn = document.getElementById("bank1OctaveDown");
const bank1OctaveUpBtn = document.getElementById("bank1OctaveUp");
const bank1OctaveValue = document.getElementById("bank1OctaveValue");
const bank1RangeLabel = document.getElementById("bank1Range");
const bank1DrumSlots = document.getElementById("bank1DrumSlots");
const bankCoupleToggle = document.getElementById("bankCoupleToggle");
const bank23Controller = document.getElementById("bank23Controller");
const bank23InstrumentSelect = document.getElementById("bank23Instrument");
const bank23OctaveDownBtn = document.getElementById("bank23OctaveDown");
const bank23OctaveUpBtn = document.getElementById("bank23OctaveUp");
const bank23OctaveValue = document.getElementById("bank23OctaveValue");
const bank23RangeLabel = document.getElementById("bank23Range");

const recordBtn = document.getElementById("recordBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const loadBtn = document.getElementById("loadBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");
const mixerControls = document.getElementById("mixerControls");

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
const DEFAULT_TRACK_NAME = "Lead";
const BANK1_MIN_OCTAVE = 1;
const BANK1_MAX_OCTAVE = 8;
const BANK23_MIN_OCTAVE = 1;
const BANK23_MAX_OCTAVE = 7;
const BANK1_PITCH_CLASSES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const KEY_CODE_BY_LABEL = {
    q: "KeyQ",
    "2": "Digit2",
    w: "KeyW",
    "3": "Digit3",
    e: "KeyE",
    r: "KeyR",
    f: "KeyF",
    "5": "Digit5",
    t: "KeyT",
    "6": "Digit6",
    y: "KeyY",
    "7": "Digit7",
    u: "KeyU",
    i: "KeyI",
    "9": "Digit9",
    o: "KeyO",
    "0": "Digit0",
    p: "KeyP",
    "[": "BracketLeft",
    "=": "Equal",
    "]": "BracketRight",
    a: "KeyA",
    z: "KeyZ",
    s: "KeyS",
    x: "KeyX",
    d: "KeyD",
    c: "KeyC",
    v: "KeyV",
    g: "KeyG",
    b: "KeyB",
    h: "KeyH",
    n: "KeyN",
    j: "KeyJ",
    m: "KeyM",
    k: "KeyK",
    ",": "Comma",
    l: "KeyL",
    ".": "Period",
    ";": "Semicolon",
    "/": "Slash"
};
const BANK23_KEY_LABELS = [
    ["i", "9", "o", "0", "p", "[", "=", "]", "a", "z", "s", "x"],
    ["c", "f", "v", "g", "b", "n", "j", "m", "k", ",", "l", "."]
];
const BANK1_INSTRUMENTS = [
    { id: "sine", label: "Sine" },
    { id: "square", label: "Square" },
    { id: "saw", label: "Saw" },
    { id: "triangle", label: "Triangle" },
    { id: "noise", label: "Noise" },
    { id: "drumkit", label: "Drum Kit" }
];
const BANK1_WAVEFORM_BY_INSTRUMENT = {
    sine: "sine",
    square: "square",
    saw: "sawtooth",
    triangle: "triangle"
};
const BANK1_INSTRUMENT_BY_WAVEFORM = {
    sine: "sine",
    square: "square",
    sawtooth: "saw",
    triangle: "triangle"
};
const BANK1_DRUM_SOUNDS = [
    { id: "gm_35_acoustic_bass_drum", label: "Acoustic Bass Drum", midiNote: 35, family: "membrane" },
    { id: "gm_36_bass_drum_1", label: "Bass Drum 1", midiNote: 36, family: "membrane" },
    { id: "gm_37_side_stick", label: "Side Stick", midiNote: 37, family: "noise" },
    { id: "gm_38_acoustic_snare", label: "Acoustic Snare", midiNote: 38, family: "noise" },
    { id: "gm_39_hand_clap", label: "Hand Clap", midiNote: 39, family: "noise" },
    { id: "gm_40_electric_snare", label: "Electric Snare", midiNote: 40, family: "noise" },
    { id: "gm_41_low_floor_tom", label: "Low Floor Tom", midiNote: 41, family: "membrane" },
    { id: "gm_42_closed_hi_hat", label: "Closed Hi-Hat", midiNote: 42, family: "metal" },
    { id: "gm_43_high_floor_tom", label: "High Floor Tom", midiNote: 43, family: "membrane" },
    { id: "gm_44_pedal_hi_hat", label: "Pedal Hi-Hat", midiNote: 44, family: "metal" },
    { id: "gm_45_low_tom", label: "Low Tom", midiNote: 45, family: "membrane" },
    { id: "gm_46_open_hi_hat", label: "Open Hi-Hat", midiNote: 46, family: "metal" },
    { id: "gm_47_low_mid_tom", label: "Low-Mid Tom", midiNote: 47, family: "membrane" },
    { id: "gm_48_high_mid_tom", label: "High-Mid Tom", midiNote: 48, family: "membrane" },
    { id: "gm_49_crash_cymbal_1", label: "Crash Cymbal 1", midiNote: 49, family: "metal" },
    { id: "gm_50_high_tom", label: "High Tom", midiNote: 50, family: "membrane" },
    { id: "gm_51_ride_cymbal_1", label: "Ride Cymbal 1", midiNote: 51, family: "metal" },
    { id: "gm_52_chinese_cymbal", label: "Chinese Cymbal", midiNote: 52, family: "metal" },
    { id: "gm_53_ride_bell", label: "Ride Bell", midiNote: 53, family: "metal" },
    { id: "gm_54_tambourine", label: "Tambourine", midiNote: 54, family: "metal" },
    { id: "gm_55_splash_cymbal", label: "Splash Cymbal", midiNote: 55, family: "metal" },
    { id: "gm_56_cowbell", label: "Cowbell", midiNote: 56, family: "metal" },
    { id: "gm_57_crash_cymbal_2", label: "Crash Cymbal 2", midiNote: 57, family: "metal" },
    { id: "gm_58_vibraslap", label: "Vibraslap", midiNote: 58, family: "noise" },
    { id: "gm_59_ride_cymbal_2", label: "Ride Cymbal 2", midiNote: 59, family: "metal" },
    { id: "gm_60_high_bongo", label: "High Bongo", midiNote: 60, family: "membrane" },
    { id: "gm_61_low_bongo", label: "Low Bongo", midiNote: 61, family: "membrane" },
    { id: "gm_62_mute_high_conga", label: "Mute High Conga", midiNote: 62, family: "membrane" },
    { id: "gm_63_open_high_conga", label: "Open High Conga", midiNote: 63, family: "membrane" },
    { id: "gm_64_low_conga", label: "Low Conga", midiNote: 64, family: "membrane" },
    { id: "gm_65_high_timbale", label: "High Timbale", midiNote: 65, family: "membrane" },
    { id: "gm_66_low_timbale", label: "Low Timbale", midiNote: 66, family: "membrane" },
    { id: "gm_67_high_agogo", label: "High Agogo", midiNote: 67, family: "tone" },
    { id: "gm_68_low_agogo", label: "Low Agogo", midiNote: 68, family: "tone" },
    { id: "gm_69_cabasa", label: "Cabasa", midiNote: 69, family: "noise" },
    { id: "gm_70_maracas", label: "Maracas", midiNote: 70, family: "noise" },
    { id: "gm_71_short_whistle", label: "Short Whistle", midiNote: 71, family: "tone" },
    { id: "gm_72_long_whistle", label: "Long Whistle", midiNote: 72, family: "tone" },
    { id: "gm_73_short_guiro", label: "Short Guiro", midiNote: 73, family: "noise" },
    { id: "gm_74_long_guiro", label: "Long Guiro", midiNote: 74, family: "noise" },
    { id: "gm_75_claves", label: "Claves", midiNote: 75, family: "tone" },
    { id: "gm_76_high_wood_block", label: "High Wood Block", midiNote: 76, family: "tone" },
    { id: "gm_77_low_wood_block", label: "Low Wood Block", midiNote: 77, family: "tone" },
    { id: "gm_78_mute_cuica", label: "Mute Cuica", midiNote: 78, family: "tone" },
    { id: "gm_79_open_cuica", label: "Open Cuica", midiNote: 79, family: "tone" },
    { id: "gm_80_mute_triangle", label: "Mute Triangle", midiNote: 80, family: "metal" },
    { id: "gm_81_open_triangle", label: "Open Triangle", midiNote: 81, family: "metal" },
    { id: "gm_82_shaker", label: "Shaker", midiNote: 82, family: "noise" },
    { id: "gm_83_jingle_bell", label: "Jingle Bell", midiNote: 83, family: "metal" },
    { id: "gm_84_bell_tree", label: "Bell Tree", midiNote: 84, family: "metal" }
];
const BANK1_DRUM_SLOTS = [
    { id: "pad_01", keys: ["w"], defaultSoundId: "gm_46_open_hi_hat" },
    { id: "pad_02", keys: ["s"], defaultSoundId: "gm_42_closed_hi_hat" },
    { id: "pad_03", keys: ["e"], defaultSoundId: "gm_56_cowbell" },
    { id: "pad_04", keys: ["3"], defaultSoundId: "gm_51_ride_cymbal_1" },
    { id: "pad_05", keys: ["r"], defaultSoundId: "gm_50_high_tom" },
    { id: "pad_06", keys: ["t"], defaultSoundId: "gm_47_low_mid_tom" },
    { id: "pad_07", keys: ["y"], defaultSoundId: "gm_45_low_tom" },
    { id: "pad_08", keys: ["7"], defaultSoundId: "gm_49_crash_cymbal_1" },
    { id: "pad_09", keys: ["d"], defaultSoundId: "gm_38_acoustic_snare" },
    { id: "pad_10", keys: ["f"], defaultSoundId: "gm_37_side_stick" },
    { id: "pad_11", keys: ["h"], defaultSoundId: "gm_41_low_floor_tom" },
    { id: "pad_12", keys: ["v", "b"], defaultSoundId: "gm_36_bass_drum_1" }
];
const BANK1_DRUM_KEY_BINDINGS = Object.fromEntries(
    BANK1_DRUM_SLOTS.flatMap(slot => slot.keys.map(key => [KEY_CODE_BY_LABEL[key], slot.id]))
);
const DEFAULT_BANK1_DRUM_ASSIGNMENTS = Object.fromEntries(
    BANK1_DRUM_SLOTS.map(slot => [slot.id, slot.defaultSoundId])
);
const DEFAULT_DRUM_SAMPLE_PACK_ID = "salamander";
const SAMPLE_PACKS = {
    salamander: {
        id: "salamander",
        name: "Salamander Drumkit",
        samples: {
            kick: { url: "samples/salamander/kick.wav", gain: 1 },
            snare: { url: "samples/salamander/snare.wav", gain: 0.85 },
            crossStick: { url: "samples/salamander/cross-stick.wav", gain: 0.8 },
            closedHat: { url: "samples/salamander/hihat-closed.wav", gain: 0.8 },
            openHat: { url: "samples/salamander/hihat-open.wav", gain: 0.8 },
            pedalHat: { url: "samples/salamander/hihat-foot.wav", gain: 0.8 },
            ride: { url: "samples/salamander/ride.wav", gain: 0.85 },
            crash: { url: "samples/salamander/crash.wav", gain: 0.85 },
            tomHigh: { url: "samples/salamander/tom-high.wav", gain: 0.85 },
            tomLow: { url: "samples/salamander/tom-low.wav", gain: 0.85 },
            tomFloor: { url: "samples/salamander/tom-floor.wav", gain: 0.85 }
        },
        soundMap: {
            35: { sampleId: "kick", pitchSemitones: -1 },
            36: { sampleId: "kick" },
            37: { sampleId: "crossStick" },
            38: { sampleId: "snare" },
            39: { sampleId: "snare" },
            40: { sampleId: "snare", pitchSemitones: 2 },
            41: { sampleId: "tomFloor" },
            42: { sampleId: "closedHat" },
            43: { sampleId: "tomFloor", pitchSemitones: 2 },
            44: { sampleId: "pedalHat" },
            45: { sampleId: "tomLow" },
            46: { sampleId: "openHat" },
            47: { sampleId: "tomLow", pitchSemitones: 2 },
            48: { sampleId: "tomHigh", pitchSemitones: -2 },
            49: { sampleId: "crash" },
            50: { sampleId: "tomHigh" },
            51: { sampleId: "ride" },
            52: { sampleId: "crash", pitchSemitones: 3 },
            53: { sampleId: "ride", pitchSemitones: 2 },
            54: { sampleId: "pedalHat" },
            55: { sampleId: "crash", pitchSemitones: 5 },
            56: { sampleId: "pedalHat", pitchSemitones: -5 },
            57: { sampleId: "crash", pitchSemitones: 2 },
            58: { sampleId: "crossStick", pitchSemitones: -3 },
            59: { sampleId: "ride", pitchSemitones: 7 },
            60: { sampleId: "tomHigh", pitchSemitones: 5 },
            61: { sampleId: "tomLow", pitchSemitones: 5 },
            62: { sampleId: "tomLow", pitchSemitones: 7 },
            63: { sampleId: "tomHigh", pitchSemitones: 7 },
            64: { sampleId: "tomFloor", pitchSemitones: 7 },
            65: { sampleId: "tomHigh", pitchSemitones: 12 },
            66: { sampleId: "tomLow", pitchSemitones: 12 },
            67: { sampleId: "pedalHat", pitchSemitones: 7 },
            68: { sampleId: "pedalHat", pitchSemitones: 5 },
            69: { sampleId: "closedHat", pitchSemitones: 5 },
            70: { sampleId: "pedalHat", pitchSemitones: 3 },
            71: { sampleId: "openHat", pitchSemitones: 12 },
            72: { sampleId: "openHat", pitchSemitones: 7 },
            73: { sampleId: "crossStick", pitchSemitones: 5 },
            74: { sampleId: "crossStick", pitchSemitones: 2 },
            75: { sampleId: "crossStick", pitchSemitones: 7 },
            76: { sampleId: "crossStick", pitchSemitones: 12 },
            77: { sampleId: "crossStick", pitchSemitones: 9 },
            78: { sampleId: "tomLow", pitchSemitones: 2 },
            79: { sampleId: "tomHigh", pitchSemitones: 2 },
            80: { sampleId: "closedHat", pitchSemitones: 12 },
            81: { sampleId: "ride", pitchSemitones: 12 },
            82: { sampleId: "closedHat", pitchSemitones: 7 },
            83: { sampleId: "pedalHat", pitchSemitones: 12 },
            84: { sampleId: "crash", pitchSemitones: 12 }
        }
    }
};
const MASTER_MIN_DBFS = -60;
const MASTER_MAX_DBFS = -6;
const DEFAULT_MASTER_DBFS = -30;
const MASTER_MIN_GAIN = Math.pow(10, MASTER_MIN_DBFS / 20);
const MASTER_MAX_GAIN = Math.pow(10, MASTER_MAX_DBFS / 20);
const DEFAULT_MASTER_GAIN = Math.pow(10, DEFAULT_MASTER_DBFS / 20);
const mixerPrimitives = [
    {
        id: "masterVolume",
        label: "Volume",
        group: "master",
        type: "slider",
        target: "master.volume",
        min: 0,
        max: 100,
        step: 0.1,
        format: "dbfs"
    },
    {
        id: "trackVolume",
        label: "Volume",
        group: "track",
        type: "slider",
        target: `tracks.${DEFAULT_TRACK_ID}.volume`,
        min: 0,
        max: 1,
        step: 0.01,
        format: "percent"
    },
    {
        id: "trackPan",
        label: "Pan",
        group: "track",
        type: "slider",
        target: `tracks.${DEFAULT_TRACK_ID}.pan`,
        min: -1,
        max: 1,
        step: 0.01,
        format: "pan"
    },
    {
        id: "trackMute",
        label: "Mute",
        group: "track",
        type: "toggle",
        target: `tracks.${DEFAULT_TRACK_ID}.mute`
    },
    {
        id: "trackSolo",
        label: "Solo",
        group: "track",
        type: "toggle",
        target: `tracks.${DEFAULT_TRACK_ID}.solo`
    }
];
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
let bank1 = { instrument: "sine", octave: 4, coupled: false };
let bank23 = { instrument: "sine", octave: 3 };
let bank1DrumKit = {
    schemaVersion: 2,
    samplePackId: DEFAULT_DRUM_SAMPLE_PACK_ID,
    assignments: { ...DEFAULT_BANK1_DRUM_ASSIGNMENTS }
};
let mixerState = createDefaultMixerState(tracks);
let mixerVersionStore = {
    activeVersion: null,
    isDirty: false,
    versions: {},
    autoTriggers: []
};
let mixerBaselineSnapshot = cloneState(mixerState);
let instrumentSettings = {
    id: "instrument_1",
    trackId: DEFAULT_TRACK_ID,
    waveform: "sine",
    attack: Number(attackSlider.value),
    decay: Number(decaySlider.value),
    sustain: Number(sustainSlider.value),
    release: Number(releaseSlider.value),
    duration: durationSlider ? Number(durationSlider.value) : 1
};
let fxChains = [];
let undoStack = [];
let redoStack = [];
let pendingInstrumentTransaction = null;
let recordingHistoryBefore = null;
let timelineSelectionIds = new Set();
let timelineSelectionAnchorTick = null;

let synth;
const pitchedSynths = new Map();
let primaryTrackGain;
let primaryTrackPanner;
let masterOutputGain;
const activeNotes = new Map();
const activeNoiseVoices = new Map();
const managedGeneratedVoices = new Map();
const sampleBuffers = new Map();
const sampleBufferPromises = new Map();
const activeSampleSources = new Map();
const activeKeyboardInputs = new Map();
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
const BANK1_KEY_LABELS = ["q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u"];
const BANK1_NOTE_BINDINGS = BANK1_KEY_LABELS.map(key => ({
    code: KEY_CODE_BY_LABEL[key],
    key,
    note: /^([A-G]#?)/.exec(keyMap[key])[1]
}));
const BANK23_NOTE_BINDINGS = BANK23_KEY_LABELS.flatMap((labels, bankIndex) => (
    labels.map((key, pitchIndex) => ({
        bank: bankIndex + 2,
        code: KEY_CODE_BY_LABEL[key],
        key,
        note: BANK1_PITCH_CLASSES[pitchIndex]
    }))
));

const noteToKeyMap = Object.fromEntries(
    Object.entries(keyMap).map(([k, v]) => [v, k])
);
const ribbonPitchGutterWidth = 32;

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
    disposeActiveSampleSources();
    disposeGeneratedVoices();
    pitchedSynths.forEach(instrumentSynth => {
        instrumentSynth.releaseAll();
        instrumentSynth.dispose();
    });
    pitchedSynths.clear();
    primaryTrackGain?.dispose();
    primaryTrackPanner?.dispose();
    masterOutputGain?.dispose();

    activeNotes.clear();
    activeNoiseVoices.clear();

    primaryTrackGain = new Tone.Gain(1);
    primaryTrackPanner = new Tone.Panner(0);
    masterOutputGain = new Tone.Gain(mixerState.master.volume);
    ["sine", "square", "sawtooth", "triangle"].forEach(waveform => {
        const instrumentSynth = new Tone.PolySynth(Tone.Synth);
        instrumentSynth.set({ oscillator: { type: waveform } });
        instrumentSynth.connect(primaryTrackGain);
        pitchedSynths.set(waveform, instrumentSynth);
    });
    synth = pitchedSynths.get(BANK1_WAVEFORM_BY_INSTRUMENT[bank1.instrument]) || pitchedSynths.get("sine");
    primaryTrackGain.connect(primaryTrackPanner);
    primaryTrackPanner.connect(masterOutputGain);
    masterOutputGain.toDestination();
    applyInstrumentSettingsToSynth();
    applyPrimaryTrackOutput();
}

function updateEnvelope() {
    pitchedSynths.forEach(instrumentSynth => {
        instrumentSynth.set({
            envelope: {
                attack: instrumentSettings.attack,
                decay: instrumentSettings.decay,
                sustain: instrumentSettings.sustain,
                release: instrumentSettings.release
            }
        });
    });
}

function applyInstrumentSettingsToSynth() {
    pitchedSynths.forEach((instrumentSynth, waveform) => {
        instrumentSynth.set({
            oscillator: { type: waveform },
            envelope: {
                attack: instrumentSettings.attack,
                decay: instrumentSettings.decay,
                sustain: instrumentSettings.sustain,
                release: instrumentSettings.release
            }
        });
    });
    synth = pitchedSynths.get(BANK1_WAVEFORM_BY_INSTRUMENT[bank1.instrument]) || pitchedSynths.get("sine");
    applyMasterVolume();
}

function syncInstrumentSettingsFromControls() {
    instrumentSettings = {
        ...instrumentSettings,
        attack: Number(attackSlider.value),
        decay: Number(decaySlider.value),
        sustain: Number(sustainSlider.value),
        release: Number(releaseSlider.value),
        duration: durationSlider ? Number(durationSlider.value) : 1
    };
}

function beginInstrumentEdit() {
    if (!pendingInstrumentTransaction) {
        pendingInstrumentTransaction = beginCompositionTransaction();
    }
}

function updateInstrumentControls() {
    updateBank1UI();
    attackSlider.value = String(instrumentSettings.attack);
    decaySlider.value = String(instrumentSettings.decay);
    sustainSlider.value = String(instrumentSettings.sustain);
    releaseSlider.value = String(instrumentSettings.release);
    if (durationSlider) durationSlider.value = String(instrumentSettings.duration);
    attackValue.textContent = attackSlider.value;
    decayValue.textContent = decaySlider.value;
    sustainValue.textContent = sustainSlider.value;
    releaseValue.textContent = releaseSlider.value;
    if (durationValue) durationValue.textContent = durationSlider?.value || "1";
}

function normalizeBank1(savedBank1, legacyWaveform = "sine") {
    if (!savedBank1 || typeof savedBank1 !== "object") {
        return {
            instrument: BANK1_INSTRUMENT_BY_WAVEFORM[legacyWaveform] || "sine",
            octave: 3,
            coupled: false
        };
    }

    const savedInstrument = savedBank1.instrument === "sawtooth"
        ? "saw"
        : String(savedBank1.instrument || "");
    const instrument = BANK1_INSTRUMENTS.some(candidate => candidate.id === savedInstrument)
        ? savedInstrument
        : BANK1_INSTRUMENT_BY_WAVEFORM[legacyWaveform] || "sine";
    const octave = Number(savedBank1.octave);

    return {
        instrument,
        octave: Number.isInteger(octave)
            ? Math.min(BANK1_MAX_OCTAVE, Math.max(BANK1_MIN_OCTAVE, octave))
            : 3,
        coupled: savedBank1.coupled === true
    };
}

function normalizeBank23(savedBank23) {
    const savedInstrument = String(savedBank23?.instrument || "");
    const instrument = BANK1_INSTRUMENTS.some(candidate => (
        candidate.id === savedInstrument && candidate.id !== "drumkit"
    ))
        ? savedInstrument
        : "sine";
    const octave = Number(savedBank23?.octave);

    return {
        instrument,
        octave: Number.isInteger(octave)
            ? Math.min(BANK23_MAX_OCTAVE, Math.max(BANK23_MIN_OCTAVE, octave))
            : 3
    };
}

function normalizeBank1DrumKit(savedDrumKit) {
    const savedAssignments = savedDrumKit?.assignments || {};
    const validSoundIds = new Set(BANK1_DRUM_SOUNDS.map(sound => sound.id));
    const assignments = { ...DEFAULT_BANK1_DRUM_ASSIGNMENTS };

    BANK1_DRUM_SLOTS.forEach(slot => {
        const savedSoundId = savedAssignments[slot.id];
        if (validSoundIds.has(savedSoundId)) {
            assignments[slot.id] = savedSoundId;
        }
    });

    const savedSamplePackId = String(savedDrumKit?.samplePackId || "");
    const samplePackId = Object.prototype.hasOwnProperty.call(SAMPLE_PACKS, savedSamplePackId)
        ? savedSamplePackId
        : DEFAULT_DRUM_SAMPLE_PACK_ID;

    return { schemaVersion: 2, samplePackId, assignments };
}

function getPlayableNote(noteName, octave = bank1.octave) {
    const match = /^([A-G]#?)(?:-?\d+)?$/.exec(String(noteName));
    if (!match) {
        throw new TypeError(`Invalid note name: ${noteName}`);
    }
    return `${match[1]}${octave}`;
}

function getInputKeyForNote(note) {
    const match = /^([A-G]#?)(-?\d+)$/.exec(String(note));
    if (!match || Number(match[2]) !== bank1.octave) return undefined;
    const pitchClass = match[1];
    return pitchClass ? noteToKeyMap[`${pitchClass}3`] : undefined;
}

function renderBank1DrumSlots() {
    if (!bank1DrumSlots) return;
    bank1DrumSlots.replaceChildren();

    BANK1_DRUM_SLOTS.forEach((slot, index) => {
        const wrapper = document.createElement("label");
        wrapper.className = "bank1-drum-slot";
        wrapper.htmlFor = `bank1-${slot.id}`;

        const label = document.createElement("span");
        label.textContent = `Pad ${String(index + 1).padStart(2, "0")} (${slot.keys.join("/").toUpperCase()})`;

        const select = document.createElement("select");
        select.id = `bank1-${slot.id}`;
        select.dataset.drumSlot = slot.id;
        BANK1_DRUM_SOUNDS.forEach(sound => {
            const option = document.createElement("option");
            option.value = sound.id;
            option.textContent = sound.label;
            select.appendChild(option);
        });

        wrapper.append(label, select);
        bank1DrumSlots.appendChild(wrapper);
    });
}

function updateBank1UI() {
    if (bank1InstrumentSelect) bank1InstrumentSelect.value = bank1.instrument;
    if (bank1OctaveValue) bank1OctaveValue.textContent = String(bank1.octave);
    if (bankCoupleToggle) bankCoupleToggle.checked = bank1.coupled;
    if (bank23Controller) bank23Controller.hidden = bank1.coupled;
    if (bank23InstrumentSelect) bank23InstrumentSelect.value = bank23.instrument;
    if (bank23OctaveValue) bank23OctaveValue.textContent = String(bank23.octave);
    if (bank1RangeLabel) {
        bank1RangeLabel.textContent = bank1.instrument === "drumkit"
            ? "12 assignable pads"
            : `${BANK1_PITCH_CLASSES[0]}${bank1.octave}-${BANK1_PITCH_CLASSES[11]}${bank1.octave}`;
    }
    if (bank23RangeLabel) {
        bank23RangeLabel.textContent = `${BANK1_PITCH_CLASSES[0]}${bank23.octave}-${BANK1_PITCH_CLASSES[11]}${bank23.octave + 1}`;
    }

    const octaveDisabled = bank1.instrument === "noise" || bank1.instrument === "drumkit";
    if (bank1OctaveDownBtn) bank1OctaveDownBtn.disabled = octaveDisabled || bank1.octave <= BANK1_MIN_OCTAVE;
    if (bank1OctaveUpBtn) bank1OctaveUpBtn.disabled = octaveDisabled || bank1.octave >= BANK1_MAX_OCTAVE;
    if (bank23OctaveDownBtn) bank23OctaveDownBtn.disabled = bank23.octave <= BANK23_MIN_OCTAVE;
    if (bank23OctaveUpBtn) bank23OctaveUpBtn.disabled = bank23.octave >= BANK23_MAX_OCTAVE;
    if (bank1DrumSlots) bank1DrumSlots.hidden = bank1.instrument !== "drumkit";
    bank1DrumSlots?.querySelectorAll("select[data-drum-slot]").forEach(select => {
        select.value = bank1DrumKit.assignments[select.dataset.drumSlot];
    });

    const keymap = document.getElementById("keymap");
    if (!keymap) return;
    if (bank1.instrument === "drumkit") {
        keymap.textContent = [
            "BANK 1 - DRUM MODE",
            ...BANK1_DRUM_SLOTS.map((slot, index) => {
                const soundId = bank1DrumKit.assignments[slot.id];
                const sound = BANK1_DRUM_SOUNDS.find(candidate => candidate.id === soundId);
                return `${slot.keys.join("/").toUpperCase()} = Pad ${String(index + 1).padStart(2, "0")} (${sound?.label || "Unassigned"})`;
            }),
            "Bank 2/3 note keys are inactive while Drum Kit is selected."
        ].join("\n");
        return;
    }

    const formatBindings = (bindings, octave) => bindings
        .map(binding => {
            return `${binding.key.toUpperCase()}=${getPlayableNote(binding.note, octave)}`;
        })
        .join("  ");
    const bank23BaseOctave = bank1.coupled ? bank1.octave + 1 : bank23.octave;
    const bank23UpperOctave = bank1.coupled ? bank1.octave + 2 : bank23.octave + 1;
    keymap.textContent = [
        `BANK 1 (${bank1.instrument.toUpperCase()}): ${formatBindings(BANK1_NOTE_BINDINGS, bank1.octave)}`,
        `BANK 2 (${(bank1.coupled ? bank1.instrument : bank23.instrument).toUpperCase()}): ${formatBindings(BANK23_NOTE_BINDINGS.filter(binding => binding.bank === 2), bank23BaseOctave)}`,
        `BANK 3 (${(bank1.coupled ? bank1.instrument : bank23.instrument).toUpperCase()}): ${formatBindings(BANK23_NOTE_BINDINGS.filter(binding => binding.bank === 3), bank23UpperOctave)}`
    ].join("\n");
}

function setBank1Instrument(instrumentId) {
    const instrument = BANK1_INSTRUMENTS.find(candidate => candidate.id === instrumentId);
    if (!instrument) throw new RangeError(`Unsupported Bank 1 instrument: ${instrumentId}`);
    if (bank1.instrument === instrument.id) return false;

    const before = beginCompositionTransaction();
    bank1 = { ...bank1, instrument: instrument.id };
    if (BANK1_WAVEFORM_BY_INSTRUMENT[instrument.id]) {
        instrumentSettings.waveform = BANK1_WAVEFORM_BY_INSTRUMENT[instrument.id];
    }
    applyInstrumentSettingsToSynth();
    updateBank1UI();
    renderRibbon();
    recordCompositionTransaction("CHANGE_INSTRUMENT", "Change Bank 1 Instrument", before);
    return true;
}

function setBank1Octave(octave) {
    const nextOctave = Number(octave);
    if (!Number.isInteger(nextOctave) || nextOctave < BANK1_MIN_OCTAVE || nextOctave > BANK1_MAX_OCTAVE) {
        throw new RangeError(`Bank 1 octave must be between ${BANK1_MIN_OCTAVE} and ${BANK1_MAX_OCTAVE}.`);
    }
    if (bank1.octave === nextOctave) return false;

    const before = beginCompositionTransaction();
    bank1 = { ...bank1, octave: nextOctave };
    updateBank1UI();
    renderRibbon();
    recordCompositionTransaction("CHANGE_BANK1_OCTAVE", "Change Bank 1 Octave", before);
    return true;
}

function setBank23Instrument(instrumentId) {
    const instrument = BANK1_INSTRUMENTS.find(candidate => (
        candidate.id === instrumentId && candidate.id !== "drumkit"
    ));
    if (!instrument) throw new RangeError(`Unsupported Bank 2/3 instrument: ${instrumentId}`);
    if (bank23.instrument === instrument.id) return false;

    const before = beginCompositionTransaction();
    bank23 = { ...bank23, instrument: instrument.id };
    updateBank1UI();
    renderRibbon();
    recordCompositionTransaction("CHANGE_INSTRUMENT", "Change Bank 2/3 Instrument", before);
    return true;
}

function setBank23Octave(octave) {
    const nextOctave = Number(octave);
    if (!Number.isInteger(nextOctave)
        || nextOctave < BANK23_MIN_OCTAVE
        || nextOctave > BANK23_MAX_OCTAVE) {
        throw new RangeError(`Bank 2/3 octave must be between ${BANK23_MIN_OCTAVE} and ${BANK23_MAX_OCTAVE}.`);
    }
    if (bank23.octave === nextOctave) return false;

    const before = beginCompositionTransaction();
    bank23 = { ...bank23, octave: nextOctave };
    updateBank1UI();
    renderRibbon();
    recordCompositionTransaction("CHANGE_BANK23_OCTAVE", "Change Bank 2/3 Octave", before);
    return true;
}

function setBanksCoupled(coupled) {
    if (typeof coupled !== "boolean") {
        throw new TypeError("Bank coupling state must be a boolean.");
    }
    if (bank1.coupled === coupled) return false;

    const before = beginCompositionTransaction();
    bank1 = { ...bank1, coupled };
    updateBank1UI();
    renderRibbon();
    recordCompositionTransaction(
        "CHANGE_BANK_COUPLING",
        coupled ? "Couple Banks 1-3" : "Decouple Banks 1-3",
        before
    );
    return true;
}

function setBank1DrumSound(slotId, soundId) {
    if (!BANK1_DRUM_SLOTS.some(slot => slot.id === slotId)) {
        throw new RangeError(`Unsupported Bank 1 drum slot: ${slotId}`);
    }
    if (!BANK1_DRUM_SOUNDS.some(sound => sound.id === soundId)) {
        throw new RangeError(`Unsupported Bank 1 drum sound: ${soundId}`);
    }
    if (bank1DrumKit.assignments[slotId] === soundId) return false;

    const before = beginCompositionTransaction();
    bank1DrumKit = {
        ...bank1DrumKit,
        assignments: { ...bank1DrumKit.assignments, [slotId]: soundId }
    };
    updateBank1UI();
    renderRibbon();
    recordCompositionTransaction("CHANGE_DRUM_ASSIGNMENT", "Change Drum Pad Sound", before);
    return true;
}

function finishInstrumentEdit() {
    if (!pendingInstrumentTransaction) {
        pendingInstrumentTransaction = beginCompositionTransaction();
    }
    syncInstrumentSettingsFromControls();
    updateEnvelope();
    applyInstrumentSettingsToSynth();
    recordCompositionTransaction(
        "CHANGE_INSTRUMENT",
        "Change Instrument",
        pendingInstrumentTransaction
    );
    pendingInstrumentTransaction = null;
}

startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    if (audioStatus) audioStatus.textContent = "Starting audio and loading drum samples...";
    try {
        await Tone.start();
        await buildSynth();
        const pack = SAMPLE_PACKS[bank1DrumKit.samplePackId];
        if (!pack) {
            throw new RangeError(`Unsupported drum sample pack: ${bank1DrumKit.samplePackId}`);
        }
        validateDrumSamplePack(pack);
        await loadSamplePack(pack.id);
        if (audioStatus) {
            audioStatus.textContent = `Audio ready. ${pack.name} samples loaded.`;
        }
        console.log("Tone started");
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (audioStatus) audioStatus.textContent = `Audio startup failed: ${message}`;
        console.error("Audio startup failed", error);
    } finally {
        startBtn.disabled = false;
    }
});

bank1InstrumentSelect?.addEventListener("change", () => {
    setBank1Instrument(bank1InstrumentSelect.value);
    bank1InstrumentSelect.blur();
});

bank1OctaveDownBtn?.addEventListener("click", () => setBank1Octave(bank1.octave - 1));
bank1OctaveUpBtn?.addEventListener("click", () => setBank1Octave(bank1.octave + 1));
bankCoupleToggle?.addEventListener("change", () => {
    setBanksCoupled(bankCoupleToggle.checked);
});
bank23InstrumentSelect?.addEventListener("change", () => {
    setBank23Instrument(bank23InstrumentSelect.value);
    bank23InstrumentSelect.blur();
});
bank23OctaveDownBtn?.addEventListener("click", () => setBank23Octave(bank23.octave - 1));
bank23OctaveUpBtn?.addEventListener("click", () => setBank23Octave(bank23.octave + 1));

bank1DrumSlots?.addEventListener("change", event => {
    const select = event.target.closest("select[data-drum-slot]");
    if (select) {
        setBank1DrumSound(select.dataset.drumSlot, select.value);
        select.blur();
    }
});

function buildProjectData() {
    const savedMixerVersionStore = cloneState(mixerVersionStore);
    savedMixerVersionStore.isDirty = false;
    return {
        name: projectName?.value || "Untitled Project",
        description: projectDescription?.value || "",
        composition: getCompositionSnapshot(),
        mixerState: cloneState(mixerState),
        mixerVersionStore: savedMixerVersionStore
    };
}

function getCellMemory(cellId) {
    return cellMemories.find(cell => cell.id === cellId);
}

function createDefaultTracks() {
    return [{
        id: DEFAULT_TRACK_ID,
        name: DEFAULT_TRACK_NAME,
        events: []
    }];
}

function defaultTrackMixerSettings(trackId) {
    const isPrimaryTrack = trackId === DEFAULT_TRACK_ID;
    return {
        volume: isPrimaryTrack ? 1 : 0.77,
        pan: 0,
        mute: false,
        solo: false
    };
}

function createDefaultMixerState(trackList = tracks) {
    return {
        master: { volume: DEFAULT_MASTER_GAIN },
        tracks: Object.fromEntries(trackList.map(track => [
            track.id,
            defaultTrackMixerSettings(track.id)
        ]))
    };
}

function cloneState(value) {
    return JSON.parse(JSON.stringify(value));
}

function normalizeMixerState(savedState, trackList, legacyTracks = []) {
    const savedTracks = savedState?.tracks && typeof savedState.tracks === "object"
        ? savedState.tracks
        : {};
    const legacyTrackMap = new Map(
        legacyTracks
            .filter(track => track && typeof track === "object" && track.id)
            .map(track => [String(track.id), track])
    );
    const normalizedTracks = {};

    Object.entries(savedTracks).forEach(([trackId, settings]) => {
        normalizedTracks[trackId] = {
            ...defaultTrackMixerSettings(trackId),
            ...(settings && typeof settings === "object" ? settings : {}),
            volume: clampMixerValue(settings?.volume, 0, 1, 0.77),
            pan: clampMixerValue(settings?.pan, -1, 1, 0),
            mute: settings?.mute === true,
            solo: settings?.solo === true
        };
    });

    trackList.forEach(track => {
        const saved = savedTracks[track.id] || {};
        const legacy = legacyTrackMap.get(track.id) || {};
        const defaults = defaultTrackMixerSettings(track.id);
        normalizedTracks[track.id] = {
            ...defaults,
            ...(saved && typeof saved === "object" ? saved : {}),
            volume: clampMixerValue(saved.volume, 0, 1, defaults.volume),
            pan: clampMixerValue(saved.pan, -1, 1, defaults.pan),
            mute: saved.mute === undefined ? legacy.muted === true : saved.mute === true,
            solo: saved.solo === undefined ? legacy.solo === true : saved.solo === true
        };
    });

    const savedMaster = savedState?.master && typeof savedState.master === "object"
        ? savedState.master
        : {};
    return {
        master: {
            ...savedMaster,
            volume: clampMixerValue(
                savedMaster.volume ?? savedState?.masterVolume,
                MASTER_MIN_GAIN,
                MASTER_MAX_GAIN,
                DEFAULT_MASTER_GAIN
            )
        },
        tracks: normalizedTracks
    };
}

function clampMixerValue(value, minimum, maximum, fallback) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return fallback;
    return Math.min(maximum, Math.max(minimum, numericValue));
}

function masterGainFromSliderValue(value) {
    const position = clampMixerValue(value, 0, 100, 0);
    const dbfs = MASTER_MIN_DBFS
        + (position / 100) * (MASTER_MAX_DBFS - MASTER_MIN_DBFS);
    return Math.pow(10, dbfs / 20);
}

function masterSliderValueFromGain(gain) {
    const safeGain = clampMixerValue(gain, MASTER_MIN_GAIN, MASTER_MAX_GAIN, DEFAULT_MASTER_GAIN);
    const dbfs = 20 * Math.log10(safeGain);
    return ((dbfs - MASTER_MIN_DBFS) / (MASTER_MAX_DBFS - MASTER_MIN_DBFS)) * 100;
}

function deepFreeze(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
    return value;
}

function normalizeMixerVersionStore(savedStore) {
    const savedVersions = savedStore?.versions && typeof savedStore.versions === "object"
        ? savedStore.versions
        : {};
    const versions = {};

    Object.entries(savedVersions).forEach(([versionId, savedVersion]) => {
        if (!savedVersion || typeof savedVersion !== "object" || !savedVersion.snapshot) return;
        const id = String(savedVersion.id || versionId);
        const snapshot = normalizeMixerState(savedVersion.snapshot, []);
        versions[id] = {
            id,
            name: String(savedVersion.name || id),
            description: String(savedVersion.description || ""),
            createdAt: Number.isFinite(Number(savedVersion.createdAt))
                ? Number(savedVersion.createdAt)
                : 0,
            snapshot: deepFreeze(snapshot)
        };
    });

    const activeVersion = versions[savedStore?.activeVersion]
        ? String(savedStore.activeVersion)
        : null;
    const validTriggers = ["PROJECT_SAVE", "EXPORT_AUDIO", "EXPORT_STEMS"];
    const autoTriggers = Array.isArray(savedStore?.autoTriggers)
        ? [...new Set(savedStore.autoTriggers.filter(trigger => validTriggers.includes(trigger)))]
        : [];
    return {
        activeVersion,
        isDirty: savedStore?.isDirty === true,
        versions,
        autoTriggers
    };
}

function markMixerDirty() {
    mixerVersionStore.isDirty = !mixerBaselineSnapshot
        || JSON.stringify(mixerState) !== JSON.stringify(mixerBaselineSnapshot);
}

function markMixerSaved() {
    mixerBaselineSnapshot = cloneState(mixerState);
    mixerVersionStore.isDirty = false;
}

function createMixerVersionFromSnapshot(name, description, snapshot) {
    const usedIds = Object.keys(mixerVersionStore.versions)
        .map(id => Number(id.match(/^mix_(\d+)$/)?.[1]))
        .filter(Number.isInteger);
    let nextNumber = Math.max(0, ...usedIds) + 1;
    let id = `mix_${String(nextNumber).padStart(3, "0")}`;
    while (mixerVersionStore.versions[id]) {
        nextNumber += 1;
        id = `mix_${String(nextNumber).padStart(3, "0")}`;
    }

    const version = {
        id,
        name: String(name).trim(),
        description: String(description || ""),
        createdAt: Date.now(),
        snapshot: deepFreeze(cloneState(snapshot))
    };
    mixerVersionStore.versions = {
        ...mixerVersionStore.versions,
        [id]: version
    };
    return { id };
}

function createMixerVersion(name, description = "") {
    if (name && typeof name === "object") {
        if (name.auto !== true) {
            throw new TypeError("Mixer auto-version configuration must set auto to true.");
        }
        const trigger = String(name.trigger || "");
        const validTriggers = ["PROJECT_SAVE", "EXPORT_AUDIO", "EXPORT_STEMS", "MANUAL_ONLY"];
        if (!validTriggers.includes(trigger)) {
            throw new RangeError("Choose a supported mixer auto-version trigger.");
        }
        mixerVersionStore.autoTriggers = trigger === "MANUAL_ONLY"
            ? []
            : [...new Set([...mixerVersionStore.autoTriggers, trigger])];
        return { enabled: trigger !== "MANUAL_ONLY", trigger };
    }

    const versionName = String(name || "").trim();
    if (!versionName) throw new TypeError("Mixer version name cannot be empty.");
    return createMixerVersionFromSnapshot(versionName, description, mixerState);
}

function captureMixerVersionForTrigger(trigger) {
    if (!mixerVersionStore.autoTriggers.includes(trigger)) return null;
    const timestamp = new Date().toISOString();
    return createMixerVersionFromSnapshot(
        `Auto ${trigger} ${timestamp}`,
        `Automatically captured on ${trigger}.`,
        mixerState
    );
}

function updateMixerVersionMeta(versionId, updates) {
    const version = mixerVersionStore.versions[String(versionId)];
    if (!version || !updates || typeof updates !== "object") return false;
    const next = { ...version };
    if (updates.name !== undefined) {
        const name = String(updates.name).trim();
        if (!name) throw new TypeError("Mixer version name cannot be empty.");
        next.name = name;
    }
    if (updates.description !== undefined) {
        next.description = String(updates.description);
    }
    mixerVersionStore.versions = {
        ...mixerVersionStore.versions,
        [version.id]: next
    };
    return true;
}

function loadMixerVersion(versionId) {
    const version = mixerVersionStore.versions[String(versionId)];
    if (!version) throw new RangeError(`Mixer version "${versionId}" was not found.`);
    mixerState = normalizeMixerState(cloneState(version.snapshot), tracks);
    mixerVersionStore.activeVersion = version.id;
    mixerBaselineSnapshot = cloneState(mixerState);
    mixerVersionStore.isDirty = false;
    applyMasterVolume();
    applyPrimaryTrackOutput();
    syncMixerControls();
    return true;
}

function deleteMixerVersion(versionId) {
    const id = String(versionId);
    if (!mixerVersionStore.versions[id]) return false;
    const versions = { ...mixerVersionStore.versions };
    delete versions[id];
    mixerVersionStore.versions = versions;
    if (mixerVersionStore.activeVersion === id) {
        mixerVersionStore.activeVersion = null;
    }
    markMixerDirty();
    return true;
}

function duplicateMixerVersion(sourceVersionId, newName) {
    const source = mixerVersionStore.versions[String(sourceVersionId)];
    if (!source) throw new RangeError(`Mixer version "${sourceVersionId}" was not found.`);
    const name = String(newName || "").trim();
    if (!name) throw new TypeError("Duplicate mixer version name cannot be empty.");
    return createMixerVersionFromSnapshot(name, source.description, source.snapshot);
}

function renameMixerVersion(versionId, newName) {
    return updateMixerVersionMeta(versionId, { name: newName });
}

function getMixerVersion(versionId) {
    const version = mixerVersionStore.versions[String(versionId)];
    return version
        ? {
            metadata: {
                id: version.id,
                name: version.name,
                description: version.description,
                createdAt: version.createdAt
            },
            snapshot: cloneState(version.snapshot)
        }
        : null;
}

function listMixerVersions() {
    return Object.values(mixerVersionStore.versions)
        .map(version => ({ id: version.id, name: version.name }));
}

function compareMixerVersions(versionA, versionB) {
    const first = mixerVersionStore.versions[String(versionA)];
    const second = mixerVersionStore.versions[String(versionB)];
    if (!first || !second) {
        throw new RangeError("Both mixer versions must exist before comparing.");
    }

    const diffState = (firstState, secondState) => {
        const changes = {};
        const keys = new Set([
            ...Object.keys(firstState || {}),
            ...Object.keys(secondState || {})
        ]);
        keys.forEach(key => {
            const from = firstState?.[key];
            const to = secondState?.[key];
            if (JSON.stringify(from) !== JSON.stringify(to)) {
                changes[key] = {
                    from: from === undefined ? null : cloneState(from),
                    to: to === undefined ? null : cloneState(to)
                };
            }
        });
        return changes;
    };

    const firstTracks = first.snapshot.tracks || {};
    const secondTracks = second.snapshot.tracks || {};
    const changedTracks = [...new Set([
        ...Object.keys(firstTracks),
        ...Object.keys(secondTracks)
    ])]
        .map(trackId => ({
            trackId,
            ...diffState(firstTracks[trackId], secondTracks[trackId])
        }))
        .filter(track => Object.keys(track).length > 1);

    return {
        changedMaster: diffState(first.snapshot.master, second.snapshot.master),
        changedTracks
    };
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

function getTimelineEventInstrument(rawEvent) {
    if (rawEvent.kind === "drum") return "drumkit";
    const savedInstrument = rawEvent.instrumentId === "sawtooth"
        ? "saw"
        : String(rawEvent.instrumentId || "");
    if (BANK1_INSTRUMENTS.some(instrument => instrument.id === savedInstrument)) {
        return savedInstrument;
    }
    return BANK1_INSTRUMENT_BY_WAVEFORM[rawEvent.waveform] || "sine";
}

function makeTimelineEvent(rawEvent, startTick, durationTicks) {
    const normalizedStartTick = Math.max(0, Math.round(startTick));
    const normalizedDurationTicks = Math.max(1, Math.round(durationTicks));
    const kind = rawEvent.kind === "drum" ? "drum" : "note";
    const padId = BANK1_DRUM_SLOTS.some(slot => slot.id === rawEvent.padId)
        ? rawEvent.padId
        : "";
    if (kind === "drum" && !padId) {
        throw new TypeError("Bank 1 drum timeline events must reference a valid drum pad.");
    }
    return {
        id: String(rawEvent.id || rawEvent.eventId || crypto.randomUUID()),
        trackId: String(rawEvent.trackId || DEFAULT_TRACK_ID),
        note: String(rawEvent.note || ""),
        kind,
        instrumentId: getTimelineEventInstrument(rawEvent),
        padId,
        startTime: secondsForTicks(normalizedStartTick),
        duration: secondsForTicks(normalizedDurationTicks),
        startTick: normalizedStartTick,
        durationTicks: normalizedDurationTicks,
        velocity: Number.isFinite(Number(rawEvent.velocity))
            ? Number(rawEvent.velocity)
            : 1,
        waveform: String(rawEvent.waveform || instrumentSettings.waveform),
        attack: Number.isFinite(Number(rawEvent.attack))
            ? Number(rawEvent.attack)
            : instrumentSettings.attack,
        decay: Number.isFinite(Number(rawEvent.decay))
            ? Number(rawEvent.decay)
            : instrumentSettings.decay,
        sustain: Number.isFinite(Number(rawEvent.sustain))
            ? Number(rawEvent.sustain)
            : instrumentSettings.sustain,
        release: Number.isFinite(Number(rawEvent.release))
            ? Number(rawEvent.release)
            : instrumentSettings.release
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

function getCompositionSnapshot() {
    return {
        tracks: tracks.map(track => ({
            id: track.id,
            name: track.name,
            events: [...track.events]
        })),
        events: recordingData.map(event => ({ ...event })),
        cells: cellMemories.map(cell => ({
            ...cell,
            events: cell.events.map(event => ({ ...event }))
        })),
        instruments: [{ ...instrumentSettings }],
        bank1: { ...bank1 },
        bank23: { ...bank23 },
        bank1DrumKit: cloneState(bank1DrumKit),
        fxChains: cloneState(fxChains),
        tempo: tempoBpm,
        timing: {
            beatsPerBar,
            beatUnit,
            ticksPerQuarter: SIS_TICKS_PER_QUARTER
        },
        timeline: {
            duration: ticksToMilliseconds(getTimelineLengthTicks()) / 1000,
            tracks: tracks.map(track => track.id),
            regionCount
        }
    };
}

function updateHistoryControls() {
    if (undoBtn) undoBtn.disabled = undoStack.length === 0;
    if (redoBtn) redoBtn.disabled = redoStack.length === 0;
    if (undoBtn) undoBtn.textContent = undoStack.length
        ? `Undo ${undoStack[undoStack.length - 1].label}`
        : "Undo";
    if (redoBtn) redoBtn.textContent = redoStack.length
        ? `Redo ${redoStack[redoStack.length - 1].label}`
        : "Redo";
    if (undoBtn) undoBtn.title = undoStack.length
        ? `Undo ${undoStack[undoStack.length - 1].label}`
        : "Nothing to undo";
    if (redoBtn) redoBtn.title = redoStack.length
        ? `Redo ${redoStack[redoStack.length - 1].label}`
        : "Nothing to redo";
}

function beginCompositionTransaction() {
    finishRecording();
    if (pendingInstrumentTransaction) finishInstrumentEdit();
    return getCompositionSnapshot();
}

function recordCompositionTransaction(type, label, before) {
    const after = getCompositionSnapshot();
    if (JSON.stringify(before) === JSON.stringify(after)) return false;
    undoStack.push({ type, label, before, after });
    redoStack = [];
    updateHistoryControls();
    return true;
}

function restoreCompositionSnapshot(snapshot) {
    tempoBpm = Number(snapshot.tempo) > 0 ? Number(snapshot.tempo) : DEFAULT_TEMPO_BPM;
    beatsPerBar = Number.isInteger(snapshot.timing?.beatsPerBar) && snapshot.timing.beatsPerBar > 0
        ? snapshot.timing.beatsPerBar
        : DEFAULT_BEATS_PER_BAR;
    beatUnit = Number.isInteger(snapshot.timing?.beatUnit) && snapshot.timing.beatUnit > 0
        ? snapshot.timing.beatUnit
        : DEFAULT_BEAT_UNIT;
    regionCount = Math.max(1, Number(snapshot.timeline?.regionCount) || 4);
    timelineDurationTicks = secondsToTicks(snapshot.timeline?.duration || 0);
    recordingData = normalizeTimelineEvents(snapshot.events || []);
    tracks = normalizeTracks(snapshot.tracks, recordingData);
    cellMemories = normalizeCellMemories(snapshot.cells);
    instrumentSettings = {
        ...instrumentSettings,
        ...(snapshot.instruments?.[0] || {})
    };
    bank1 = normalizeBank1(snapshot.bank1, instrumentSettings.waveform);
    bank23 = normalizeBank23(snapshot.bank23);
    bank1DrumKit = normalizeBank1DrumKit(snapshot.bank1DrumKit);
    instrumentSettings.waveform = BANK1_WAVEFORM_BY_INSTRUMENT[bank1.instrument]
        || instrumentSettings.waveform;
    fxChains = cloneState(snapshot.fxChains || []);
    if (!cellMemories.some(cell => cell.id === selectedCellMemoryId)) {
        selectedCellMemoryId = cellMemories[0].id;
    }
    timelineSelectionIds.clear();
    timelineSelectionAnchorTick = null;
    rebuildTrackEventRefs();
    updateInstrumentControls();
    applyInstrumentSettingsToSynth();
    updateCellTransferControls();
    renderCellMemoryBank();
    renderRibbon();
    updateHistoryControls();
}

function undoComposition() {
    if (pendingInstrumentTransaction) finishInstrumentEdit();
    finishRecording();
    const transaction = undoStack.pop();
    if (!transaction) return false;
    restoreCompositionSnapshot(transaction.before);
    redoStack.push(transaction);
    updateHistoryControls();
    return true;
}

function redoComposition() {
    if (pendingInstrumentTransaction) finishInstrumentEdit();
    finishRecording();
    const transaction = redoStack.pop();
    if (!transaction) return false;
    restoreCompositionSnapshot(transaction.after);
    undoStack.push(transaction);
    updateHistoryControls();
    return true;
}

function applyMasterVolume() {
    if (!masterOutputGain) return;
    masterOutputGain.gain.value = mixerState.master.volume;
}

function setMasterVolume(volume) {
    if (
        !Number.isFinite(Number(volume))
        || Number(volume) < MASTER_MIN_GAIN
        || Number(volume) > MASTER_MAX_GAIN
    ) {
        throw new RangeError(
            `Master volume gain must map between ${MASTER_MIN_DBFS} and ${MASTER_MAX_DBFS} dBFS.`
        );
    }
    mixerState.master.volume = Number(volume);
    applyMasterVolume();
    markMixerDirty();
    syncMixerControls();
}

function setTrackMixerState(trackId, updates) {
    const track = tracks.find(candidate => candidate.id === String(trackId));
    if (!track || !updates || typeof updates !== "object") {
        throw new TypeError("Provide a valid track and mixer update.");
    }
    const current = mixerState.tracks[track.id] || defaultTrackMixerSettings(track.id);
    const next = { ...current };
    if (updates.volume !== undefined) {
        if (!Number.isFinite(Number(updates.volume)) || updates.volume < 0 || updates.volume > 1) {
            throw new RangeError("Track volume must be between 0 and 1.");
        }
        next.volume = Number(updates.volume);
    }
    if (updates.pan !== undefined) {
        if (!Number.isFinite(Number(updates.pan)) || updates.pan < -1 || updates.pan > 1) {
            throw new RangeError("Track pan must be between -1 and 1.");
        }
        next.pan = Number(updates.pan);
    }
    if (updates.mute !== undefined) {
        if (typeof updates.mute !== "boolean") {
            throw new TypeError("Track mute must be a boolean.");
        }
        next.mute = updates.mute;
    }
    if (updates.solo !== undefined) {
        if (typeof updates.solo !== "boolean") {
            throw new TypeError("Track solo must be a boolean.");
        }
        next.solo = updates.solo;
    }
    mixerState.tracks[track.id] = next;
    applyPrimaryTrackOutput();
    markMixerDirty();
    syncMixerControls();
}

function resolveMixerPrimitiveTarget(path) {
    const keys = String(path).split(".");
    if (keys.length === 2 && keys[0] === "master" && keys[1] === "volume") {
        return { scope: "master", field: "volume" };
    }
    if (
        keys.length === 3
        && keys[0] === "tracks"
        && tracks.some(track => track.id === keys[1])
        && ["volume", "pan", "mute", "solo"].includes(keys[2])
    ) {
        return { scope: "track", trackId: keys[1], field: keys[2] };
    }
    throw new RangeError(`Unsupported mixer primitive target "${path}".`);
}

function getMixerPrimitiveValue(target) {
    const resolved = resolveMixerPrimitiveTarget(target);
    return resolved.scope === "master"
        ? mixerState.master[resolved.field]
        : mixerState.tracks[resolved.trackId]?.[resolved.field];
}

function applyPrimitiveTarget(target, value) {
    const resolved = resolveMixerPrimitiveTarget(target);
    if (resolved.scope === "master") {
        setMasterVolume(value);
        return;
    }
    setTrackMixerState(resolved.trackId, { [resolved.field]: value });
}

function setPrimitiveValue(id, value) {
    const primitive = mixerPrimitives.find(candidate => candidate.id === id);
    if (!primitive) throw new RangeError(`Unknown mixer primitive "${id}".`);
    let normalizedValue = value;
    if (primitive.type === "slider") {
        normalizedValue = Number(value);
        if (
            !Number.isFinite(normalizedValue)
            || normalizedValue < primitive.min
            || normalizedValue > primitive.max
        ) {
            throw new RangeError(`${primitive.label} must be between ${primitive.min} and ${primitive.max}.`);
        }
    } else if (primitive.type === "toggle" && typeof value !== "boolean") {
        throw new TypeError(`${primitive.label} must be a boolean.`);
    }
    const targetValue = primitive.format === "dbfs"
        ? masterGainFromSliderValue(normalizedValue)
        : normalizedValue;
    applyPrimitiveTarget(primitive.target, targetValue);
}

function formatMixerPrimitiveValue(primitive, value) {
    if (primitive.format === "percent") return `${Math.round(value * 100)}%`;
    if (primitive.format === "dbfs") {
        const dbfs = MASTER_MIN_DBFS + (value / 100) * (MASTER_MAX_DBFS - MASTER_MIN_DBFS);
        return `${dbfs.toFixed(1)} dBFS`;
    }
    if (primitive.format === "pan") {
        if (value === 0) return "C";
        return value < 0
            ? `L ${Math.round(Math.abs(value) * 100)}%`
            : `R ${Math.round(value * 100)}%`;
    }
    return String(value);
}

function renderMixerControls() {
    if (!mixerControls) return;
    mixerControls.replaceChildren();
    const groups = [
        { id: "master", title: "MASTER" },
        {
            id: "track",
            title: tracks.find(track => track.id === DEFAULT_TRACK_ID)?.name.toUpperCase() || "TRACK"
        }
    ];

    groups.forEach(group => {
        const groupElement = document.createElement("section");
        groupElement.className = "mixer-group";
        const heading = document.createElement("h3");
        heading.className = "mixer-group-title";
        heading.textContent = group.title;
        groupElement.append(heading);

        mixerPrimitives
            .filter(primitive => primitive.group === group.id)
            .forEach(primitive => {
                if (primitive.type === "slider") {
                    const control = document.createElement("div");
                    control.className = "mixer-slider-control";
                    const label = document.createElement("label");
                    label.htmlFor = `mixer-${primitive.id}`;
                    label.textContent = primitive.label;
                    const input = document.createElement("input");
                    input.id = `mixer-${primitive.id}`;
                    input.type = "range";
                    input.min = String(primitive.min);
                    input.max = String(primitive.max);
                    input.step = String(primitive.step);
                    input.dataset.mixerPrimitive = primitive.id;
                    const output = document.createElement("output");
                    output.htmlFor = input.id;
                    output.dataset.mixerValue = primitive.id;
                    control.append(label, input, output);
                    groupElement.append(control);
                    return;
                }

                const button = document.createElement("button");
                button.type = "button";
                button.className = "mixer-toggle";
                button.dataset.mixerPrimitive = primitive.id;
                button.setAttribute("aria-pressed", "false");
                button.textContent = primitive.label;
                groupElement.append(button);
            });

        mixerControls.append(groupElement);
    });
    syncMixerControls();
}

function syncMixerControls() {
    if (!mixerControls) return;
    mixerPrimitives.forEach(primitive => {
        const value = getMixerPrimitiveValue(primitive.target);
        const controlValue = primitive.format === "dbfs"
            ? masterSliderValueFromGain(value)
            : value;
        const control = mixerControls.querySelector(`[data-mixer-primitive="${primitive.id}"]`);
        if (!control) return;
        if (primitive.type === "slider") {
            control.value = String(controlValue);
            const output = mixerControls.querySelector(`[data-mixer-value="${primitive.id}"]`);
            if (output) output.value = formatMixerPrimitiveValue(primitive, controlValue);
            return;
        }
        control.setAttribute("aria-pressed", String(value));
        control.classList.toggle("active", value);
    });
}

function applyPrimaryTrackOutput() {
    if (!primaryTrackGain || !primaryTrackPanner) return;
    const settings = mixerState.tracks[DEFAULT_TRACK_ID] || defaultTrackMixerSettings(DEFAULT_TRACK_ID);
    const hasSolo = tracks.some(track => mixerState.tracks[track.id]?.solo);
    const audible = !settings.mute && (!hasSolo || settings.solo);
    primaryTrackGain.gain.value = audible ? settings.volume : 0;
    primaryTrackPanner.pan.value = settings.pan;
}

mixerControls?.addEventListener("input", event => {
    const control = event.target.closest("[data-mixer-primitive]");
    if (!control || control.type !== "range") return;
    setPrimitiveValue(control.dataset.mixerPrimitive, control.value);
});

mixerControls?.addEventListener("click", event => {
    const control = event.target.closest("button[data-mixer-primitive]");
    if (!control) return;
    const primitive = mixerPrimitives.find(candidate => candidate.id === control.dataset.mixerPrimitive);
    if (!primitive || primitive.type !== "toggle") return;
    setPrimitiveValue(primitive.id, getMixerPrimitiveValue(primitive.target) !== true);
});

function setTrackVolume(trackId, volume) {
    setTrackMixerState(trackId, { volume });
}

function setTrackPan(trackId, pan) {
    setTrackMixerState(trackId, { pan });
}

function setTrackMuted(trackId, mute) {
    setTrackMixerState(trackId, { mute });
}

function setTrackSolo(trackId, solo) {
    setTrackMixerState(trackId, { solo });
}

function createTrack(name) {
    const before = beginCompositionTransaction();
    const usedNumbers = tracks
        .map(track => Number(track.id.match(/^track_(\d+)$/)?.[1]))
        .filter(Number.isInteger);
    const trackId = `track_${Math.max(0, ...usedNumbers) + 1}`;
    const trackName = String(name || "").trim() || `Track ${tracks.length + 1}`;
    tracks.push({
        id: trackId,
        name: trackName,
        events: []
    });
    mixerState.tracks[trackId] = defaultTrackMixerSettings(trackId);
    markMixerDirty();
    rebuildTrackEventRefs();
    recordCompositionTransaction("CREATE_TRACK", "Create Track", before);
    return trackId;
}

function deleteTrack(trackId) {
    if (!tracks.some(track => track.id === String(trackId)) || tracks.length <= 1) {
        return false;
    }
    const before = beginCompositionTransaction();
    tracks = tracks.filter(track => track.id !== String(trackId));
    recordingData = recordingData.filter(event => event.trackId !== String(trackId));
    timelineSelectionIds = new Set(
        [...timelineSelectionIds].filter(id => recordingData.some(event => event.id === id))
    );
    rebuildTrackEventRefs();
    renderRibbon();
    recordCompositionTransaction("DELETE_TRACK", "Delete Track", before);
    return true;
}

function setTempo(bpm) {
    const nextTempo = Number(bpm);
    if (!Number.isFinite(nextTempo) || nextTempo <= 0) {
        throw new RangeError("Tempo must be a positive number.");
    }
    if (nextTempo === tempoBpm) return false;
    const before = beginCompositionTransaction();
    tempoBpm = nextTempo;
    recordingData = recordingData.map(event => makeTimelineEvent(
        event,
        getEventTick(event),
        getEventDurationTicks(event)
    ));
    cellMemories = cellMemories.map(cell => ({
        ...cell,
        events: cell.events.map(event => ({
            ...event,
            startOffset: secondsForTicks(event.startOffsetTicks),
            duration: secondsForTicks(event.durationTicks)
        }))
    }));
    rebuildTrackEventRefs();
    renderRibbon();
    recordCompositionTransaction("CHANGE_TEMPO", "Change Tempo", before);
    return true;
}

function changeInstrument(updates) {
    if (!updates || typeof updates !== "object") {
        throw new TypeError("Provide instrument settings to change.");
    }
    const before = beginCompositionTransaction();
    const next = { ...instrumentSettings, ...updates };
    for (const setting of ["attack", "decay", "sustain", "release", "duration"]) {
        if (!Number.isFinite(Number(next[setting])) || Number(next[setting]) < 0) {
            throw new RangeError(`${setting} must be a non-negative number.`);
        }
        next[setting] = Number(next[setting]);
    }
    if (!Object.values(BANK1_WAVEFORM_BY_INSTRUMENT).includes(next.waveform)) {
        throw new RangeError("Choose a supported waveform.");
    }
    instrumentSettings = next;
    if (Object.prototype.hasOwnProperty.call(updates, "waveform")) {
        bank1 = {
            ...bank1,
            instrument: BANK1_INSTRUMENT_BY_WAVEFORM[next.waveform]
        };
    }
    updateInstrumentControls();
    applyInstrumentSettingsToSynth();
    recordCompositionTransaction("CHANGE_INSTRUMENT", "Change Instrument", before);
    return true;
}

function addEffect(trackId, effect) {
    if (!tracks.some(track => track.id === String(trackId))
        || !effect || typeof effect !== "object") {
        throw new TypeError("Provide a valid track and effect.");
    }
    const before = beginCompositionTransaction();
    let chain = fxChains.find(candidate => candidate.trackId === String(trackId));
    if (!chain) {
        chain = { trackId: String(trackId), effects: [] };
        fxChains.push(chain);
    }
    const addedEffect = { ...effect, id: String(effect.id || crypto.randomUUID()) };
    chain.effects.push(addedEffect);
    recordCompositionTransaction("ADD_EFFECT", "Add Effect", before);
    return addedEffect.id;
}

function removeEffect(trackId, effectId) {
    const chain = fxChains.find(candidate => candidate.trackId === String(trackId));
    if (!chain || !chain.effects.some(effect => effect.id === String(effectId))) return false;
    const before = beginCompositionTransaction();
    chain.effects = chain.effects.filter(effect => effect.id !== String(effectId));
    if (chain.effects.length === 0) {
        fxChains = fxChains.filter(candidate => candidate !== chain);
    }
    recordCompositionTransaction("REMOVE_EFFECT", "Remove Effect", before);
    return true;
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

function scheduleGeneratedVoiceDisposal(voice, delayMs) {
    const timerId = setTimeout(() => {
        managedGeneratedVoices.delete(voice);
        voice.dispose();
    }, delayMs);
    managedGeneratedVoices.set(voice, timerId);
}

function disposeGeneratedVoices() {
    activeNoiseVoices.forEach(voice => voice.dispose());
    activeNoiseVoices.clear();
    managedGeneratedVoices.forEach((timerId, voice) => {
        clearTimeout(timerId);
        voice.dispose();
    });
    managedGeneratedVoices.clear();
}

function disposeActiveSampleSources() {
    activeSampleSources.forEach((gainNode, source) => {
        source.onended = null;
        source.stop();
        source.disconnect();
        gainNode.disconnect();
    });
    activeSampleSources.clear();
}

function getSampleBuffer(url) {
    if (sampleBuffers.has(url)) {
        return Promise.resolve(sampleBuffers.get(url));
    }

    if (!sampleBufferPromises.has(url)) {
        const request = fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(`Could not load audio sample "${url}" (${response.status}).`);
            }
            return response.arrayBuffer();
        }).then(data => Tone.getContext().rawContext.decodeAudioData(data));
        sampleBufferPromises.set(url, request);
        request.then(buffer => {
            sampleBuffers.set(url, buffer);
            sampleBufferPromises.delete(url);
        }, () => {
            sampleBufferPromises.delete(url);
        });
    }

    return sampleBufferPromises.get(url);
}

async function loadSamplePack(packId) {
    const pack = SAMPLE_PACKS[packId];
    if (!pack) {
        throw new RangeError(`Unsupported audio sample pack: ${packId}`);
    }

    const sampleIds = new Set(
        Object.values(pack.soundMap).map(mapping => mapping.sampleId)
    );
    const sampleUrls = [...sampleIds].map(sampleId => {
        const sample = pack.samples[sampleId];
        if (!sample) {
            throw new Error(`Drum sample pack "${packId}" references missing sample "${sampleId}".`);
        }
        return sample.url;
    });
    await Promise.all(sampleUrls.map(getSampleBuffer));
    return pack;
}

function validateDrumSamplePack(pack) {
    const unmappedSounds = BANK1_DRUM_SOUNDS.filter(sound => !pack.soundMap[sound.midiNote]);
    if (unmappedSounds.length > 0) {
        throw new Error(
            `Audio sample pack "${pack.id}" does not map: ${unmappedSounds.map(sound => sound.label).join(", ")}.`
        );
    }
}

function playSampleVoice(pack, mapping, velocity) {
    if (!mapping) {
        throw new Error(`Audio sample pack "${pack.id}" has no mapping for this voice.`);
    }
    const sample = pack.samples[mapping.sampleId];
    if (!sample) {
        throw new Error(`Audio sample pack "${pack.id}" references missing sample "${mapping.sampleId}".`);
    }
    const buffer = sampleBuffers.get(sample.url);
    if (!buffer) return false;

    const normalizedVelocity = Number(velocity);
    if (!Number.isFinite(normalizedVelocity) || normalizedVelocity < 0 || normalizedVelocity > 1) {
        throw new RangeError("Sample voice velocity must be between 0 and 1.");
    }
    const sampleGain = Number(sample.gain ?? 1);
    const pitchSemitones = Number(mapping.pitchSemitones ?? 0);
    if (!Number.isFinite(sampleGain) || sampleGain < 0 || sampleGain > 1) {
        throw new RangeError(`Sample "${mapping.sampleId}" gain must be between 0 and 1.`);
    }
    if (!Number.isFinite(pitchSemitones) || Math.abs(pitchSemitones) > 24) {
        throw new RangeError(`Sample "${mapping.sampleId}" pitch shift must be between -24 and 24 semitones.`);
    }
    const context = Tone.getContext().rawContext;
    const source = context.createBufferSource();
    const outputGain = context.createGain();
    source.buffer = buffer;
    source.playbackRate.value = Math.pow(2, pitchSemitones / 12);
    outputGain.gain.value = normalizedVelocity * sampleGain;
    source.connect(outputGain);
    outputGain.connect(primaryTrackGain.input);
    activeSampleSources.set(source, outputGain);
    source.addEventListener("ended", () => {
        activeSampleSources.delete(source);
        source.disconnect();
        outputGain.disconnect();
    }, { once: true });
    source.start();
    return true;
}

function getEnvelopeSettings(settings = instrumentSettings) {
    return {
        attack: settings.attack,
        decay: settings.decay,
        sustain: settings.sustain,
        release: settings.release
    };
}

function startAudioNote(note, instrumentId, inputId, velocity = 1, settings = instrumentSettings) {
    if (!primaryTrackGain || activeNotes.has(inputId)) return false;

    if (instrumentId === "noise") {
        const voice = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: getEnvelopeSettings(settings)
        }).connect(primaryTrackGain);
        voice.triggerAttack(undefined, velocity);
        activeNoiseVoices.set(inputId, voice);
        activeNotes.set(inputId, { note, instrumentId, voice, release: settings.release });
        return true;
    }

    const waveform = BANK1_WAVEFORM_BY_INSTRUMENT[instrumentId]
        || settings.waveform
        || "sine";
    const instrumentSynth = pitchedSynths.get(waveform);
    if (!instrumentSynth) return false;
    instrumentSynth.set({ envelope: getEnvelopeSettings(settings) });
    instrumentSynth.triggerAttack(note, undefined, velocity);
    activeNotes.set(inputId, {
        note,
        instrumentId,
        synth: instrumentSynth,
        release: settings.release
    });
    return true;
}

function releaseAudioNote(inputId, release) {
    const activeNote = activeNotes.get(inputId);
    if (!activeNote) return false;
    activeNotes.delete(inputId);

    if (activeNote.voice) {
        activeNoiseVoices.delete(inputId);
        activeNote.voice.triggerRelease();
        const releaseTime = Number.isFinite(Number(release))
            ? Number(release)
            : Number(activeNote.release || instrumentSettings.release);
        scheduleGeneratedVoiceDisposal(activeNote.voice, Math.max(100, releaseTime * 1000 + 100));
    } else {
        activeNote.synth.triggerRelease(activeNote.note);
    }
    return true;
}

function triggerDrumPad(padId, velocity = 1) {
    if (!primaryTrackGain) return false;
    const soundId = bank1DrumKit.assignments[padId];
    const sound = BANK1_DRUM_SOUNDS.find(candidate => candidate.id === soundId);
    if (!sound) return false;
    const pack = SAMPLE_PACKS[bank1DrumKit.samplePackId];
    if (!pack) {
        throw new Error(`Drum sample pack "${bank1DrumKit.samplePackId}" is unavailable.`);
    }

    return playSampleVoice(pack, pack.soundMap[sound.midiNote], velocity);
}

function getRecordingTick() {
    const elapsed = performance.now() - recordingStart;
    return recordingStartTick
        + Math.round((elapsed * tempoBpm * SIS_TICKS_PER_QUARTER) / 60000);
}

function recordEvent(type, note, instrumentId = bank1.instrument, inputId = note) {
    if (!isRecording) return;

    if (type === "noteOn") {
        activeRecordingNoteIds.set(inputId, {
            id: crypto.randomUUID(),
            trackId: DEFAULT_TRACK_ID,
            startTick: getRecordingTick(),
            note,
            kind: "note",
            instrumentId,
            velocity: 1,
            waveform: BANK1_WAVEFORM_BY_INSTRUMENT[instrumentId] || instrumentSettings.waveform,
            attack: instrumentSettings.attack,
            decay: instrumentSettings.decay,
            sustain: instrumentSettings.sustain,
            release: instrumentSettings.release
        });
        return;
    }

    if (type === "noteOff") {
        const startedNote = activeRecordingNoteIds.get(inputId);
        if (!startedNote) return;
        activeRecordingNoteIds.delete(inputId);
        const endTick = getRecordingTick();
        recordingData.push(makeTimelineEvent(
            startedNote,
            startedNote.startTick,
            Math.max(1, endTick - startedNote.startTick)
        ));
        rebuildTrackEventRefs();
        renderRibbon();
    }
}

function recordDrumHit(padId) {
    if (!isRecording) return;
    recordingData.push(makeTimelineEvent({
        id: crypto.randomUUID(),
        trackId: DEFAULT_TRACK_ID,
        note: padId,
        kind: "drum",
        instrumentId: "drumkit",
        padId,
        velocity: 1
    }, getRecordingTick(), 1));
    rebuildTrackEventRefs();
    renderRibbon();
}

function finishRecording() {
    if (!isRecording) return false;
    [...activeRecordingNoteIds.entries()].forEach(([inputId, note]) => (
        recordEvent("noteOff", note.note, note.instrumentId, inputId)
    ));
    activeRecordingNoteIds.clear();
    isRecording = false;
    if (recordingHistoryBefore) {
        recordCompositionTransaction("ADD_NOTE", "Record Phrase", recordingHistoryBefore);
    }
    recordingHistoryBefore = null;
    return true;
}

function loadProject(data, options = {}) {
    if (pendingInstrumentTransaction) finishInstrumentEdit();
    finishRecording();
    const compositionData = data.composition || data;
    projectName.value = data.name || "";
    projectDescription.value = data.description || "";
    const instrument = compositionData.instruments?.[0] || {};
    instrumentSettings = {
        id: instrument.id || "instrument_1",
        trackId: instrument.trackId || DEFAULT_TRACK_ID,
        waveform: instrument.waveform || compositionData.waveform || data.waveform || "sine",
        attack: Number(instrument.attack ?? compositionData.attack ?? data.attack ?? 0.05),
        decay: Number(instrument.decay ?? compositionData.decay ?? data.decay ?? 0.2),
        sustain: Number(instrument.sustain ?? compositionData.sustain ?? data.sustain ?? 0.6),
        release: Number(instrument.release ?? compositionData.release ?? data.release ?? 1),
        duration: Number(instrument.duration ?? compositionData.duration ?? data.duration ?? 1)
    };
    bank1 = normalizeBank1(
        compositionData.bank1 || data.bank1,
        instrumentSettings.waveform
    );
    bank23 = normalizeBank23(compositionData.bank23 || data.bank23);
    bank1DrumKit = normalizeBank1DrumKit(
        compositionData.bank1DrumKit || data.bank1DrumKit
    );
    instrumentSettings.waveform = BANK1_WAVEFORM_BY_INSTRUMENT[bank1.instrument]
        || instrumentSettings.waveform;
    updateInstrumentControls();

    const timing = compositionData.timing || data.timing || {};
    const loadedTempo = Number(compositionData.tempo ?? timing.tempoBpm);
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

    const savedTimeline = compositionData.timeline || data.timeline || {};
    regionCount = Math.max(
        1,
        Number(savedTimeline.regionCount || compositionData.regionCount || data.regionCount) || 4
    );
    const savedTimelineDuration = Number(savedTimeline.duration);
    timelineDurationTicks = Number.isFinite(savedTimelineDuration) && savedTimelineDuration > 0
        ? secondsToTicks(savedTimelineDuration)
        : 0;
    const savedTracks = compositionData.tracks || data.tracks || savedTimeline.tracks;
    cellMemories = normalizeCellMemories(
        compositionData.cells || compositionData.cellMemories || data.cellMemories
    );
    selectedCellMemoryId = cellMemories.some(cell => cell.id === data.selectedCellMemoryId)
        ? data.selectedCellMemoryId
        : cellMemories[0].id;
    recordingData = normalizeTimelineEvents(
        compositionData.events
            || compositionData.timelineEvents
            || data.timelineEvents
            || data.events
            || data.recordingData
            || []
    );
    tracks = normalizeTracks(savedTracks, recordingData);
    mixerState = normalizeMixerState(data.mixerState, tracks, savedTracks || []);
    mixerVersionStore = normalizeMixerVersionStore(data.mixerVersionStore);
    mixerBaselineSnapshot = cloneState(mixerState);
    mixerVersionStore.isDirty = false;
    applyMasterVolume();
    applyPrimaryTrackOutput();
    renderMixerControls();
    fxChains = Array.isArray(compositionData.fxChains)
        ? cloneState(compositionData.fxChains)
        : [];
    rebuildTrackEventRefs();

    applyInstrumentSettingsToSynth();
    updateCellTransferControls();
    renderCellMemoryBank();
    renderRibbon();
    if (!options.preserveHistory) {
        undoStack = [];
        redoStack = [];
        updateHistoryControls();
    }

    console.log("PROJECT LOADED", data.name);
}

function importProject(data) {
    const before = beginCompositionTransaction();
    const previousMixerState = cloneState(mixerState);
    const previousMixerVersionStore = cloneState(mixerVersionStore);
    const previousMixerBaseline = cloneState(mixerBaselineSnapshot);
    try {
        loadProject(data, { preserveHistory: true });
    } catch (error) {
        restoreCompositionSnapshot(before);
        mixerState = previousMixerState;
        mixerVersionStore = normalizeMixerVersionStore(previousMixerVersionStore);
        mixerBaselineSnapshot = previousMixerBaseline;
        applyMasterVolume();
        applyPrimaryTrackOutput();
        renderMixerControls();
        throw error;
    }
    recordCompositionTransaction("IMPORT_PROJECT", "Import Project", before);
}

function noteOn(note, instrumentId = bank1.instrument, inputId = note) {
    if (!startAudioNote(note, instrumentId, inputId)) return false;
    recordEvent("noteOn", note, instrumentId, inputId);
    return true;
}

function noteOff(inputId, note = inputId, instrumentId = bank1.instrument) {
    const activeNote = activeNotes.get(inputId);
    if (!activeNote || !releaseAudioNote(inputId)) {
        return false;
    }
    recordEvent("noteOff", activeNote.note || note, activeNote.instrumentId || instrumentId, inputId);
    return true;
}

function resolvePerformanceInput(code) {
    if (bank1.instrument === "drumkit") {
        const padId = BANK1_DRUM_KEY_BINDINGS[code];
        if (!padId) return null;
        const slot = BANK1_DRUM_SLOTS.find(candidate => candidate.id === padId);
        const key = slot?.keys.find(label => KEY_CODE_BY_LABEL[label] === code);
        return { kind: "drum", padId, key };
    }

    const bank1Binding = BANK1_NOTE_BINDINGS.find(binding => binding.code === code);
    if (bank1Binding) {
        return {
            kind: "note",
            note: getPlayableNote(bank1Binding.note, bank1.octave),
            instrumentId: bank1.instrument,
            key: bank1Binding.key
        };
    }

    if (bank1.instrument === "drumkit") return null;
    const bank23Binding = BANK23_NOTE_BINDINGS.find(binding => binding.code === code);
    if (!bank23Binding) return null;

    const octave = bank1.coupled
        ? bank1.octave + bank23Binding.bank - 1
        : bank23.octave + bank23Binding.bank - 2;
    return {
        kind: "note",
        note: getPlayableNote(bank23Binding.note, octave),
        instrumentId: bank1.coupled ? bank1.instrument : bank23.instrument,
        key: bank23Binding.key
    };
}

function startPerformanceInput(code, inputId) {
    if (activeKeyboardInputs.has(inputId)) return;
    const action = resolvePerformanceInput(code);
    if (!action) return;

    const started = action.kind === "drum"
        ? triggerDrumPad(action.padId)
        : noteOn(action.note, action.instrumentId, inputId);
    if (!started) return;

    activeKeyboardInputs.set(inputId, action);
    if (action.kind === "drum") recordDrumHit(action.padId);
    if (action.key) highlightKey(action.key);
}

function releasePerformanceInput(inputId) {
    const action = activeKeyboardInputs.get(inputId);
    if (!action) return;
    activeKeyboardInputs.delete(inputId);
    if (action.kind === "note") {
        noteOff(inputId, action.note, action.instrumentId);
    }
    if (action.key) unhighlightKey(action.key);
}

document.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    const target = event.target;
    if (target instanceof HTMLElement && !target.matches("[data-key]")
        && target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (event.code === "Slash" && event.shiftKey) return;
    startPerformanceInput(event.code, `keyboard:${event.code}`);
});

document.addEventListener("keyup", (event) => {
    releasePerformanceInput(`keyboard:${event.code}`);
});

attackSlider.addEventListener("input", () => {
    beginInstrumentEdit();
    attackValue.textContent = attackSlider.value;
    syncInstrumentSettingsFromControls();
    updateEnvelope();
});
attackSlider.addEventListener("change", finishInstrumentEdit);

decaySlider.addEventListener("input", () => {
    beginInstrumentEdit();
    decayValue.textContent = decaySlider.value;
    syncInstrumentSettingsFromControls();
    updateEnvelope();
});
decaySlider.addEventListener("change", finishInstrumentEdit);

sustainSlider.addEventListener("input", () => {
    beginInstrumentEdit();
    sustainValue.textContent = sustainSlider.value;
    syncInstrumentSettingsFromControls();
    updateEnvelope();
});
sustainSlider.addEventListener("change", finishInstrumentEdit);

releaseSlider.addEventListener("input", () => {
    beginInstrumentEdit();
    releaseValue.textContent = releaseSlider.value;
    syncInstrumentSettingsFromControls();
    updateEnvelope();
});
releaseSlider.addEventListener("change", finishInstrumentEdit);

if (durationSlider && durationValue) {
    durationSlider.addEventListener("input", () => {
        beginInstrumentEdit();
        durationValue.textContent = durationSlider.value;
        syncInstrumentSettingsFromControls();
    });
    durationSlider.addEventListener("change", finishInstrumentEdit);
}

function stopPlayback() {
    playbackTimeouts.forEach(id => clearTimeout(id));
    playbackTimeouts = [];
    isPlaying = false;
    playhead.stop(false);

    pitchedSynths.forEach(instrumentSynth => instrumentSynth.releaseAll());
    disposeGeneratedVoices();
    activeNotes.clear();
    activeKeyboardInputs.clear();
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

    const drumMode = bank1.instrument === "drumkit";
    const bank23BaseOctave = bank1.coupled ? bank1.octave + 1 : bank23.octave;
    const bank23UpperOctave = bank1.coupled ? bank1.octave + 2 : bank23.octave + 1;
    const configuredMinOctave = bank1.coupled
        ? bank1.octave
        : Math.min(bank1.octave, bank23BaseOctave);
    const configuredMaxOctave = bank1.coupled
        ? bank23UpperOctave
        : Math.max(bank1.octave, bank23UpperOctave);
    const recordedOctaves = recordingData
        .filter(event => event.kind !== "drum")
        .map(event => /^([A-G]#?)(-?\d+)$/.exec(event.note)?.[2])
        .filter(octave => octave !== undefined)
        .map(Number)
        .filter(octave => Number.isInteger(octave) && octave >= 0 && octave <= 10);
    const minPitchedOctave = Math.min(configuredMinOctave, ...recordedOctaves);
    const maxPitchedOctave = Math.max(configuredMaxOctave, ...recordedOctaves);
    const laneLabels = drumMode
        ? BANK1_DRUM_SLOTS.map((slot, index) => String(index + 1).padStart(2, "0"))
        : Array.from({ length: maxPitchedOctave - minPitchedOctave + 1 }, (_, index) => (
            BANK1_PITCH_CLASSES.map(pitch => `${pitch}${minPitchedOctave + index}`)
        )).flat();
    const laneHeight = ribbon.clientHeight / laneLabels.length;
    const displayedLaneLabels = drumMode ? laneLabels : [...laneLabels].reverse();
    displayedLaneLabels.forEach((pitch, row) => {
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
        const notePitchClass = /^([A-G]#?)-?\d+$/.exec(note.note)?.[1] || "";
        const drumSlotIndex = BANK1_DRUM_SLOTS.findIndex(slot => slot.id === note.padId);
        const drumSound = BANK1_DRUM_SOUNDS.find(sound => (
            sound.id === bank1DrumKit.assignments[note.padId]
        ));
        if (note.kind === "drum") block.classList.add("drum-event");
        if (notePitchClass.includes("#")) block.classList.add("sharp");
        block.dataset.note = note.note;
        block.dataset.noteId = note.id;
        block.dataset.startTick = String(note.startTick);
        block.dataset.durationTicks = String(note.durationTicks);
        const displayNote = note.kind === "drum"
            ? drumSound?.label || `Pad ${String(drumSlotIndex + 1).padStart(2, "0")}`
            : note.note;
        block.title = `${displayNote} - Start: ${note.startTick} ticks - Duration: ${note.durationTicks} ticks`;
        block.setAttribute(
            "aria-label",
            `${displayNote} ${note.kind === "drum" ? "drum hit" : "note"}, starts at tick ${note.startTick}, duration ${note.durationTicks} ticks`
        );
        block.setAttribute("role", "button");
        block.tabIndex = 0;

        block.classList.add("timeline-event");

        const startRatio = note.startTick / timelineLengthTicks;
        const durationRatio = note.durationTicks / timelineLengthTicks;
        const pitchIndex = laneLabels.indexOf(note.note);
        const row = note.kind === "drum"
            ? Math.max(0, drumSlotIndex)
            : pitchIndex === -1
                ? 0
            : laneLabels.length - 1 - pitchIndex;

        block.style.left = `${startRatio * 100}%`;
        block.style.width = `${durationRatio * 100}%`;
        block.style.top = `${(row / laneLabels.length) * 100}%`;
        block.style.height = `${100 / laneLabels.length}%`;
        if (plot.clientWidth * durationRatio >= 24) {
            block.textContent = displayNote;
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
        kind: event.kind,
        padId: event.padId,
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

    const before = beginCompositionTransaction();
    const startTick = Math.min(...selectedEvents.map(getEventTick));
    target.events = selectedEvents.map(event => createCellEventCopy(
        event,
        getEventTick(event) - startTick
    ));
    target.createdAt = Date.now();
    selectedCellMemoryId = target.id;
    renderCellMemoryBank();
    recordCompositionTransaction("SAVE_CELL", "Save Cell", before);
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

    const before = beginCompositionTransaction();
    target.events = source.events.map(event => createCellEventCopy(event));
    target.createdAt = Date.now();
    renderCellMemoryBank();
    recordCompositionTransaction("COPY_CELL", "Copy Cell", before);
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
    const before = beginCompositionTransaction();
    cell.events = [];
    cell.createdAt = null;
    renderCellMemoryBank();
    recordCompositionTransaction("CLEAR_CELL", "Clear Cell", before);
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
    const before = beginCompositionTransaction();
    cell.name = nextName;
    renderCellMemoryBank();
    updateCellTransferControls();
    recordCompositionTransaction("RENAME_CELL", "Rename Cell", before);
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

    const before = beginCompositionTransaction();
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
    recordCompositionTransaction("PASTE_CELL", "Paste Cell", before);
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

    const before = beginCompositionTransaction();
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
    recordCompositionTransaction("REPEAT_CELL", "Repeat Cell", before);
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

    const before = beginCompositionTransaction();
    recordingData = recordingData.map(event => {
        if (!selectedIds.has(event.id)) return event;
        return makeTimelineEvent(event, getEventTick(event) + deltaTicks, getEventDurationTicks(event));
    });
    rebuildTrackEventRefs();
    timelineSelectionAnchorTick = destinationTick;
    renderRibbon();
    recordCompositionTransaction("MOVE_NOTE", "Move Notes", before);
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
    const before = beginCompositionTransaction();
    recordingData = recordingData.filter(event => !selectedIds.has(event.id));
    rebuildTrackEventRefs();
    timelineSelectionIds.clear();
    timelineSelectionAnchorTick = null;
    updateTimelineSelectionAppearance();
    renderRibbon();
    recordCompositionTransaction("DELETE_NOTE", "Delete Notes", before);
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
    finishRecording();
    stopPlayback();
    timelineSelectionIds.clear();
    timelineSelectionAnchorTick = null;
    updateTimelineSelectionAppearance();
    activeRecordingNoteIds.clear();
    recordingHistoryBefore = getCompositionSnapshot();
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
    captureMixerVersionForTrigger("PROJECT_SAVE");
    const data = buildProjectData();

    localStorage.setItem(
        "sis-project",
        JSON.stringify(data)
    );
    markMixerSaved();

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
            importProject(data);
        } catch (error) {
            console.error("Error parsing imported project:", error);
        }
    };
    reader.readAsText(file);
});

downloadBtn?.addEventListener("click", () => {
    captureMixerVersionForTrigger("PROJECT_SAVE");
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
    markMixerSaved();

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

undoBtn?.addEventListener("click", () => {
    undoComposition();
});

redoBtn?.addEventListener("click", () => {
    redoComposition();
});

pauseBtn.addEventListener("click", () => {
    finishRecording();
    playhead.pause();
    console.log("PAUSE");
});

stopBtn.addEventListener("click", () => {
    finishRecording();
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
    if (!synth || isPlaying) return;

    finishRecording();
    if (recordingData.length === 0) return;

    const soloTracksExist = tracks.some(track => mixerState.tracks[track.id]?.solo);
    const playableTrackIds = new Set(
        tracks
            .filter(track => (
                !mixerState.tracks[track.id]?.mute
                && (!soloTracksExist || mixerState.tracks[track.id]?.solo)
            ))
            .map(track => track.id)
    );
    const playbackEvents = recordingData
        .filter(event => playableTrackIds.has(event.trackId))
        .flatMap(event => event.kind === "drum"
            ? [{ event, type: "drum", tick: getEventTick(event) }]
            : [
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
            const playbackInputId = `playback:${event.id}`;
            const keyName = type === "drum"
                ? BANK1_DRUM_SLOTS.find(slot => slot.id === event.padId)?.keys[0]
                : getInputKeyForNote(event.note);

            if (type === "noteOn") {
                startAudioNote(
                    event.note,
                    event.instrumentId || getTimelineEventInstrument(event),
                    playbackInputId,
                    event.velocity,
                    event
                );
                if (keyName) highlightKey(keyName);
            } else if (type === "noteOff") {
                releaseAudioNote(playbackInputId, event.release);
                if (keyName) unhighlightKey(keyName);
            } else if (type === "drum") {
                triggerDrumPad(event.padId, event.velocity);
                if (keyName) highlightKey(keyName);
                if (keyName) {
                    setTimeout(() => unhighlightKey(keyName), 100);
                }
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
    const physicalCode = KEY_CODE_BY_LABEL[physicalKey];
    if (!physicalCode) return;

    keyElement.addEventListener("mousedown", () => {
        startPerformanceInput(physicalCode, `piano:${physicalCode}`);
    });

    keyElement.addEventListener("mouseup", () => {
        releasePerformanceInput(`piano:${physicalCode}`);
    });

    keyElement.addEventListener("mouseleave", () => {
        releasePerformanceInput(`piano:${physicalCode}`);
    });

    keyElement.addEventListener("touchstart", (event) => {
        event.preventDefault();
        startPerformanceInput(physicalCode, `piano:${physicalCode}`);
    });

    keyElement.addEventListener("touchend", () => {
        releasePerformanceInput(`piano:${physicalCode}`);
    });
});

renderBank1DrumSlots();
updateBank1UI();
updateCellTransferControls();
renderCellMemoryBank();
renderMixerControls();
renderRibbon();