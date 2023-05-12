import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { Game } from "./scripts/game";

new Game();
const app = createApp(App);

Game.newGame();
window.gameState = Game.gameState;
requestAnimationFrame(Game.gameLoop);
app.mount("#app");
