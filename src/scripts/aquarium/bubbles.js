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
