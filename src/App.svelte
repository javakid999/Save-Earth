<script>
import { element, xlink_attr } from "svelte/internal";
import { Vec2 } from './api/vec2';
import { Tri, Circle, Square } from './api/sprite';
import { Game } from "./api/game";

  function startGame() {
    document.getElementById('menu').style.display = 'none';
    const g = new Game();
    g.canvas.addItem(new Tri([new Vec2(1, 1), new Vec2(0, 0), new Vec2(0, 1)], [[0, 1, 0, 1],[1, 0, 0, 1],[0, 0, 1, 1]]));
    g.canvas.addItem(new Circle(new Vec2(-0.5, 0), 0.5, 30, [0, 1, 1, 1]));
    g.canvas.addItem(new Square(new Vec2(-1, -1), new Vec2(0.3, 0.7), [1, 1, 0, 0.5]));
    g.canvas.addItem(new Square(new Vec2(-1, -1), new Vec2(0.7, 0.3), [1, 0, 1, 0.5]));
  }

  function gotoSettings() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
  }

  function gotoMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('settings').style.display = 'none';
  }
</script>

<main>
  <div id="menu">
    <h1>Save Earth</h1>
    <button class="button" on:click={startGame}><span>Start</span></button>
    <button class="button"><span>Tutorial</span></button>
    <button class="button" on:click={gotoSettings}><span>Settings</span></button>
    <button class="button"><span>Jerny</span></button>
    <button class="button"><span>Quit to Menu</span></button>
  </div>
  <div id="settings">
    <h1>Settings</h1>
    <button class="button"><span>Logan Poggers Jai Discord Server</span></button>
    <button class="button" on:click={gotoMenu}><span>Back</span></button>
  </div>
  <div id="canvas"></div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  #settings {
    display: none;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background-color: black;
    width: 100vw;
    height: 100vh;
  }

  h1 {
    color: #002c7e;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 1000;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  .button {
    text-transform: uppercase;
    font-size: 2rem;
    width: 100%;
    display: inline-block;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    transition-duration: 0.5s;
    background-color: transparent;
    background-image: linear-gradient(to right, rgba(0, 44, 126, 0), rgb(37, 150, 255), #002c7e00);
  }

  .button:hover {
    font-size: 2.2rem;
    background-image: linear-gradient(to right, rgba(0, 70, 170, 0), rgb(37, 200, 255), rgba(0, 70, 170, 0));
  }

  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .button span:after {
    content: '\00ab';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

  .button:hover span {
    padding-right: 25px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
