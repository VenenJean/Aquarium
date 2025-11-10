//Aktualisiert die Breite der Fortschrittsbalken je nach Zustand.
function updateBars() {
  bars.h.style.width = state.hunger + "%";
  bars.c.style.width = state.clarity + "%";
  bars.t.style.width = ((state.temp - 10) / (35 - 10)) * 100 + "%";
  bars.p.style.width = (state.ph / 14) * 100 + "%";
}

/*Lässt die Werte langsam „verfallen“ – das Aquarium verschlechtert sich über Zeit,
damit du eingreifen musst.*/
function decay() {
  state.hunger = Math.max(0, state.hunger - 0.2);
  state.clarity = Math.max(0, state.clarity - 0.1);
  state.temp = Math.max(10, state.temp - 0.02);
  state.ph = Math.min(14, state.ph + 0.01);
}
