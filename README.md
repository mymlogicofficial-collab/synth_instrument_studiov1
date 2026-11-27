# Synth Instrument Studio V1

A lightweight, creation-first instrument studio focused on rapid music prototyping, recording, visualization, and future song assistance.

---

## Philosophy

- Creation first, configuration second.
- Primitive-driven development.
- Small features should unlock larger systems.
- Minimal code, maximum capability.
- Existing music should guide development, not the other way around.
- The studio should adapt around the performer.

---

## Current Build State

### Audio
- Polyphonic synth engine
- Waveform selection
- ADSR envelope controls
- Duration control

### Input
- Keyboard input
- Mouse input
- Touch input
- Unified input behavior

### Transport
- Record
- Play
- Pause
- Stop

### Projects
- Name
- Description
- Save
- Load
- Download
- Import
- Copy

### Visualization
- Timing Ribbon
- Ribbon Regions (A, B, C, D...)
- Ribbon Blocks
- Playback Playhead

---

## Core Development Method

Features are built as reusable primitives.

Example:

```text
Note
↓
Ribbon Block
↓
Region
↓
Cell
↓
Track
↓
Song
```

No system should skip layers.

---

## Current Focus

Timing Ribbon Evolution

Current:

```text
Regions
+
Notes
+
Playhead
```

Next:

```text
Selectable Regions
↓
Cells
↓
Track Layers
```

---

## Planned Systems

### Cells
Reusable musical regions.

### Track Layers
Independent lanes for:

- Synths
- Bass
- Drums
- Future instruments

### Song Assistance
Future AI-assisted support for:

- Pattern recognition
- Timing guidance
- Phrase extension
- Arrangement suggestions
- Smoothing transitions

### Dynamic Opacity Layering

Layer visibility system allowing:

```text
Active Layer
Preview Layer
Ghost Layer
Future Layer
```

without losing context.

---

## Timing Philosophy

SIS does not aim to become a traditional metronome-driven workflow. SIS uses a 'tister' instead of a metranome. a tister= tist tist, tist tist, tist tis tist, tist tist, ...etc... . it promotes motion, not just timing.

Future timing guidance should:

- Encourage flow
- Suggest motion
- Support rhythm awareness
- Stay out of the way of performance

The player should hear their music first.

---

## Definition of Success

```text
Instrument
+
Recorder
+
Visualizer
+
Looper
+
Track Studio
+
Song Assistant
```

built through progressive, reusable primitives rather than large monolithic features.