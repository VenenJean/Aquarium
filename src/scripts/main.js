// Alle 50 ms:

// Fische bewegen sich

// evtl. Blasen entstehen

// Werte verschlechtern sich

// Balken aktualisieren sich
// → Dadurch wirkt alles lebendig.

createFish();
updateBars();

setInterval(() => {
  animateFish();
  drawBubbles();
  decay();
  updateBars();
  updateThermometer();
}, 50);

//Verbindet die Buttons mit den Funktionen.
feedBtn.onclick = actionFeed;
filterBtn.onclick = actionFilter;
lampBtn.onclick = actionLamp;
phBtn.onclick = actionPh;

// Doppel-Klick Events
feedBtn.ondblclick = spawnFood;
phBtn.ondblclick = spawnPhTablet;
lampBtn.ondblclick = showThermometer;
