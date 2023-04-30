import { changeSlider } from "./pages.js";
import { changeSlide, setControl, start, stop } from "./carousel.js";

let observer = new MutationObserver(mutationRecords => {
  const className = mutationRecords[0].target.classList[0];
  const pageIndex = +className.split("_")[1];
  if (pageIndex === 3) {
    start();
  }
  if (pageIndex !== 3) {
    stop();
  }
});

observer.observe(document.querySelector(".page_1"), {attributeFilter: ["class"]});

document.addEventListener("wheel", changeSlider);
document.addEventListener("DOMContentLoaded", setControl);
window.addEventListener("resize", () => {
  if (window.matchMedia("screen and (max-width: 600px)").matches) return;
  setControl();
});
document.addEventListener("pointerdown", changeSlide);