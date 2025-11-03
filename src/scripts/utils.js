function createFish(n = 5) {
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
        const color = `hsl(${Math.random() * 60 + 20},80%,60%)`;
        body.setAttribute("cx", 0);
        body.setAttribute("cy", 0);
        body.setAttribute("rx", 20);
        body.setAttribute("ry", 10);
        body.setAttribute("fill", color);
        tail.setAttribute("points", "-20,0 -35,-10 -35,10");
        tail.setAttribute("fill", color);
        eye.setAttribute("cx", 10);
        eye.setAttribute("cy", "-3");
        eye.setAttribute("r", "2");
        eye.setAttribute("fill", "#000");
        g.append(body, tail, eye);
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
    if (Math.random() < 0.15) {
        const c = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        const cx = 0 + Math.random() * 800;
        const r = Math.random() * 4 + 1;
        c.setAttribute("cx", cx);
        c.setAttribute("cy", "480");
        c.setAttribute("r", r);
        c.setAttribute("fill", "rgba(255,255,255,0.4)");
        bubbles.appendChild(c);
        let y = 480;
        const rise = setInterval(() => {
            y -= 2;
            if (y < 0) {
                clearInterval(rise);
                bubbles.removeChild(c);
            } else c.setAttribute("cy", y);
        }, 30);
    }
}

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
    state.ph += (7 - state.ph) * 0.5;
}

function decay() {
    state.hunger = Math.max(0, state.hunger - 0.2);
    state.clarity = Math.max(0, state.clarity - 0.1);
    state.temp = Math.max(10, state.temp - 0.02);
    state.ph += (Math.random() - 0.5) * 1;
}

