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
