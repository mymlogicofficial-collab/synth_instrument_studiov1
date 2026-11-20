const button = document.getElementById("startBtn");

button.addEventListener("click", async function () {
    await Tone.start();

    const synth = new Tone.Synth().toDestination();

    synth.triggerAttackRelease("C4", "8n");

    console.log("Tone started");
});