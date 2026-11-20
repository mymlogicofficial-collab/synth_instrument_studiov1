let synth;

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", async function () {

    await Tone.start();

    synth = new Tone.Synth().toDestination();

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
        synth.triggerAttackRelease(note, "8n");
        console.log(note);
    }
});