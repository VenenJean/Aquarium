const svg = document.getElementById("aquarium");
const fishGroup = document.getElementById("fishGroup");
const bubbles = document.getElementById("bubbles");
const bars = {
    h: document.getElementById("barH"),
    c: document.getElementById("barC"),
    t: document.getElementById("barT"),
    p: document.getElementById("barP"),
};
let state = { hunger: 60, clarity: 50, temp: 24, ph: 7 };
