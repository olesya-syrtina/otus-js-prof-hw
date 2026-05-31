import { randomGradient } from "./randomGradient.js";
import "./main.scss";

const body = document.querySelector("body");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  body.style.background = randomGradient();
});
