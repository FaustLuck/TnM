import { changeSlider } from "./pages.js";
import { changeSlide, setControl } from "./carousel.js";

let observer = new MutationObserver(mutationRecords => {
  let timerId;
  const className = mutationRecords[0].target.classList[0];
  const pageIndex = +className.split("_")[1];
  if (pageIndex === 3 && !timerId) {
    timerId = setInterval(changeSlide, 2000);
  }
  if (pageIndex !== 3) {
    clearInterval(timerId);
  }
});

observer.observe(document.querySelector(".page_1"), {attributeFilter: ["class"]});


document.addEventListener("wheel", changeSlider);
document.addEventListener("DOMContentLoaded", setControl);
window.addEventListener("resize", setControl);
document.addEventListener("pointerdown", changeSlide);