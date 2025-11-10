//Thermometer einblenden (Wasser-Temperatur).
function showThermometer() {
  // Falls schon eins da ist → nichts machen
  if (document.getElementById("thermo")) return;

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("id", "thermo");

  // Glasröhre
  const tube = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  tube.setAttribute("x", "760");
  tube.setAttribute("y", "100");
  tube.setAttribute("width", "12");
  tube.setAttribute("height", "300");
  tube.setAttribute("rx", "6");
  tube.setAttribute("fill", "rgba(255,255,255,0.2)");
  group.appendChild(tube);

  // Quecksilber
  const mercury = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  mercury.setAttribute("id", "mercury");
  mercury.setAttribute("x", "760");
  mercury.setAttribute("width", "12");
  mercury.setAttribute("rx", "6");
  mercury.setAttribute("fill", "#ef4444"); // rot
  group.appendChild(mercury);

  svg.appendChild(group);
  updateThermometer();
}

// Temperaturbalken aktualisieren
function updateThermometer() {
  const mercury = document.getElementById("mercury");
  if (!mercury) return;
  const temp = state.temp; // aktuelle Temperatur aus state
  const maxHeight = 300;
  const h = ((temp - 10) / (35 - 10)) * maxHeight;
  mercury.setAttribute("height", h);
  mercury.setAttribute("y", 400 - h);
}
