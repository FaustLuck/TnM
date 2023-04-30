const slider = document.querySelector(".slider_image_wrapper");
const wrapper = document.querySelector(".control_wrapper");

export function setControl() {
  if (window.matchMedia("screen and (max-width: 600px)").matches) {
    unshift(slider);
    unshift(wrapper);
    return;
  }
  ;
  const width = document.documentElement.clientWidth;
  document.querySelector(".control").style.left = width * .6 + "px";
  setOpacity();
}

function setOpacity(index = 0) {
  if (window.matchMedia("screen and (max-width: 600px)").matches) return;
  const titles = document.querySelectorAll(".control_item");
  let opacity = 1;
  titles.forEach((el, i) => {
    if (index > i) return;
    el.style.opacity = opacity;
    opacity -= .4;
    if (opacity.toFixed(1) === "-0.2") opacity = .05;
    if (opacity < 0) opacity = 0;
  });
}

function getTargetIndex(target) {
  const controls = document.querySelectorAll(".control_item");
  return Array.from(controls).findIndex(el => el === target);
}

export function changeSlide(e) {
  const flagMQ = window.matchMedia("screen and (max-width: 600px)").matches;
  if (e) {
    if (!e.isPrimary) return;
    if (flagMQ && !e.target.closest(".control_arrow")) return;
    if (!flagMQ && !e.target.closest(".control_item")) return;
  }

  slider.addEventListener("transitionend", updateSlider);
  wrapper.addEventListener("transitionend", updateTitles);

  function updateSlider() {
    const slider = document.querySelector(".slider_image_wrapper");
    (targetIndex > 0) ? replaceItems(slider, targetIndex) : unshift(slider);
    slider.removeEventListener("transitionend", updateSlider);
  }

  function updateTitles() {
    const wrapper = document.querySelector(".control_wrapper");
    (targetIndex > 0) ? replaceItems(wrapper, targetIndex) : unshift(wrapper);
    setOpacity();
    wrapper.removeEventListener("transitionend", updateTitles);
  }

  let targetIndex;

  if (flagMQ) {
    targetIndex = (e.target.closest(".control_arrow-right")) ? 2 : 0;
  } else {
    targetIndex = (e) ? getTargetIndex(e.target) : 1;
  }
  let transform;
  if (flagMQ) {
    transform = `${-targetIndex * 100}%`;
  } else {
    const controls = document.querySelectorAll(".control_item");
    const leftSlider = wrapper.getBoundingClientRect().x;
    const leftMargin = parseInt(getComputedStyle(controls[targetIndex]).marginLeft);
    const leftElement = controls[targetIndex].getBoundingClientRect().x;
    transform = `${leftSlider + leftMargin - leftElement}px`;
    setActiveLamp(targetIndex);
  }
  if (targetIndex <= 0) targetIndex = 0;
  slider.style = `transform:translateX(${-targetIndex * 100}%);`;
  wrapper.style = `transform:translateX(${transform});`;
}

function unshift(container) {
  const item = container.lastElementChild;
  container.prepend(item);
  container.classList.add("disable-transition");
  container.style = `transform:translateX(-100%);`;
  setTimeout(() => container.classList.remove("disable-transition"));
}


function replaceItems(container, index) {
  if (window.matchMedia("screen and (max-width: 600px)").matches) index = 1;
  container.classList.add("disable-transition");
  let i = 0;
  while (i < index) {
    const item = container.children[0];
    container.append(item);
    i++;
  }
  container.style = `transform:translateX(-100%);`;
  setTimeout(() => container.classList.remove("disable-transition"));
}

function setActiveLamp(index) {

  const activeClass = "lamps_item-active";
  const active = document.querySelector(`.${activeClass}`);
  const lamps = document.querySelectorAll(".lamps_item");
  const length = lamps.length;
  const activeIndex = Array.from(lamps).findIndex(el => el === active);

  if (index + activeIndex === -1) index = lamps.length;

  active.classList.remove(activeClass);
  lamps[(index + activeIndex) % length].classList.add(activeClass);
}

