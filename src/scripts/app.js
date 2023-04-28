import { changeSlider } from "./pages.js";
import { changeSlide, setControl } from "./carousel.js";

document.addEventListener("wheel", changeSlider);
document.addEventListener("DOMContentLoaded", setControl);
window.addEventListener("resize", setControl);
document.addEventListener("pointerdown", changeSlide);