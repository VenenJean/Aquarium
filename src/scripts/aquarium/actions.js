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
