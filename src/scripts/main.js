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

setInterval(() => {
  fetch("../api/api.php?action=sim")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.I1 === "1") {
        actionFeed();
        spawnFood();
      }

      // <<<<<<< HEAD
      // // Doppel-Klick Events
      // feedBtn.ondblclick = spawnFood;
      // phBtn.ondblclick = spawnPhTablet;
      // // lampBtn.ondblclick = showThermometer;
      // =======
      if (data.I2 === "1") {
        actionFilter();
      }

      if (data.I3 === "1") {
        actionLamp();
      }

      if (data.I4 === "1") {
        actionPh();
        spawnPhTablet();
      }
    })
    .catch((error) => {
      console.error("Es gab ein Problem mit der Fetch-Operation:", error);
    });
}, 1000);
