createFish();
updateBars();

setInterval(() => {
    animateFish();
    drawBubbles();
    decay();
    updateBars();
}, 50);

feedBtn.onclick = () => actionFeed();
filterBtn.onclick = () => actionFilter();
lampBtn.onclick = () => actionLamp();
phBtn.onclick = () => actionPh();