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
