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
