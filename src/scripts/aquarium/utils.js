function createFish(n = 5) {
  //Erzeugt SVG-Elemente: Körper (Ellipse), Schwanz (Dreieck), Auge (Kreis).
  for (let i = 0; i < n; i++) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const body = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    const tail = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    const eye = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    //Zufällige Farbe für jeden Fisch.
    const color = `hsl(${Math.random() * 60 + 20},80%,60%)`;

    //Ellipse.
    body.setAttribute("cx", 0);
    body.setAttribute("cy", 0);
    body.setAttribute("rx", 20);
    body.setAttribute("ry", 10);
    body.setAttribute("fill", color);
    //Dreieck.
    tail.setAttribute("points", "-20,0 -35,-10 -35,10");
    tail.setAttribute("fill", color);
    //Kreis.
    eye.setAttribute("cx", 10);
    eye.setAttribute("cy", "-3");
    eye.setAttribute("r", "2");
    eye.setAttribute("fill", "#000");
    //Alle zusammen bilden einen Fisch (<g> = Gruppe).
    g.append(body, tail, eye);

    //Position, Größe und Geschwindigkeit werden zufällig gesetzt.
    const y = 100 + Math.random() * 300;
    const speed = 0.5 + Math.random() * 1.5;
    const scale = Math.random() * 0.5 + 0.7;
    g.dataset.y = y;
    g.dataset.speed = speed;
    g.dataset.scale = scale;
    g.dataset.x = Math.random() * 800;
    g.setAttribute(
      "transform",
      `translate(${g.dataset.x},${y}) scale(${scale})`
    );
    fishGroup.appendChild(g);
  }
}

function animateFish() {
  for (const g of fishGroup.children) {
    let x = parseFloat(g.dataset.x),
      y = parseFloat(g.dataset.y),
      s = parseFloat(g.dataset.speed);

    //Jeder Fisch bewegt sich nach rechts.
    x += s;
    if (x > 830) {
      x = -30;
      y = 100 + Math.random() * 300;
    }
    g.dataset.x = x;
    g.dataset.y = y;
    g.setAttribute(
      "transform",
      `translate(${x},${y}) scale(${g.dataset.scale})`
    );
  }
}

function drawBubbles() {
  //Mit einer Wahrscheinlichkeit von 15 % pro Frame wird eine Blase erzeugt.
  if (Math.random() < 0.15) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const cx = 0 + Math.random() * 800;
    const r = Math.random() * 4 + 1;
    c.setAttribute("cx", cx);
    c.setAttribute("cy", "480");
    c.setAttribute("r", r);
    c.setAttribute("fill", "rgba(255,255,255,0.4)");
    bubbles.appendChild(c);
    let y = 480;

    //Sie steigt langsam nach oben (y -= 2) und verschwindet oben.
    const rise = setInterval(() => {
      y -= 2;
      if (y < 0) {
        clearInterval(rise);
        bubbles.removeChild(c);
      } else c.setAttribute("cy", y);
    }, 30);
  }
}

//Aktualisiert die Breite der Fortschrittsbalken je nach Zustand.
function updateBars() {
  bars.h.style.width = state.hunger + "%";
  bars.c.style.width = state.clarity + "%";
  bars.t.style.width = ((state.temp - 10) / (35 - 10)) * 100 + "%";
  bars.p.style.width = (state.ph / 14) * 100 + "%";
}

function actionFeed() {
  state.hunger = Math.min(100, state.hunger + 30);
}

function actionFilter() {
  state.clarity = Math.min(100, state.clarity + 25);
}

function actionLamp() {
  state.temp = Math.min(35, state.temp + 1.5);
}

function actionPh() {
  state.ph = Math.max(0, state.ph - 1);
}

/*Lässt die Werte langsam „verfallen“ – das Aquarium verschlechtert sich über Zeit,
damit du eingreifen musst.*/
function decay() {
  state.hunger = Math.max(0, state.hunger - 0.2);
  state.clarity = Math.max(0, state.clarity - 0.1);
  state.temp = Math.max(10, state.temp - 0.02);
  state.ph = Math.min(14, state.ph + 0.01);
}

//Futtertablette erzeugen.
function spawnFood() {
  const food = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const x = 100 + Math.random() * 600;
  food.setAttribute("cx", x);
  food.setAttribute("cy", "0");
  food.setAttribute("r", "6");
  food.setAttribute("fill", "#facc15"); // gold-gelb
  svg.appendChild(food);

  let y = 0;
  const drop = setInterval(() => {
    y += 3;
    if (y > 470) {
      clearInterval(drop);
      svg.removeChild(food);
      actionFeed(); // Fisch wird „gefüttert“
    } else {
      food.setAttribute("cy", y);
    }
  }, 30);
}

//pH-Tablette erzeugen.
function spawnPhTablet() {
  const tab = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  const x = 100 + Math.random() * 600;
  tab.setAttribute("x", x);
  tab.setAttribute("y", "0");
  tab.setAttribute("width", "10");
  tab.setAttribute("height", "10");
  tab.setAttribute("rx", "3");
  tab.setAttribute("fill", "#8b5cf6"); // lila
  svg.appendChild(tab);

  let y = 0;
  const fall = setInterval(() => {
    y += 2.5;
    if (y > 480) {
      clearInterval(fall);
      svg.removeChild(tab);
      actionPh(); // pH-Wert stabilisieren
      for (let i = 0; i < 8; i++) makeBubble(x + Math.random() * 10 - 5, 470);
    } else tab.setAttribute("y", y);
  }, 30);
}

//Kleine Blasen erzeugen.
function makeBubble(x, y) {
  const b = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  b.setAttribute("cx", x);
  b.setAttribute("cy", y);
  b.setAttribute("r", "2");
  b.setAttribute("fill", "rgba(255,255,255,0.6)");
  svg.appendChild(b);
  let yy = y;
  const rise = setInterval(() => {
    yy -= 2;
    b.setAttribute("cy", yy);
    if (yy < 50) {
      clearInterval(rise);
      svg.removeChild(b);
    }
  }, 40);
}

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

//Erweiterung des Hauptloops:
setInterval(() => {
  updateThermometer(); // Temperatur anzeigen
}, 500);

//Buttons erweitern (optional: Taste spawnt etwas Neues).
feedBtn.addEventListener("dblclick", spawnFood); // Doppelklick = Futtertablette.
phBtn.addEventListener("dblclick", spawnPhTablet); // Doppelklick = pH-Tablette.
lampBtn.addEventListener("dblclick", showThermometer); // Doppelklick = Thermometer anzeigen.
