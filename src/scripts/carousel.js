export function setControl() {
  const width = document.documentElement.clientWidth;
  document.querySelector(".control").style.left = width * .6 + "px";
  setOpacity();
}

function setOpacity(index = 0) {
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
  if (!e.isPrimary) return;
  if (!e.target.classList.contains("control_item")) return;

  function updateSlider() {
    const slider = document.querySelector(".slider_image_wrapper");
    replaceItems(slider, targetIndex);
    slider.removeEventListener("transitionend", updateSlider);
  }

  function updateTitles() {
    const wrapper = document.querySelector(".control_wrapper");
    replaceItems(wrapper, targetIndex);
    setOpacity();
    wrapper.removeEventListener("transitionend", updateTitles);
  }

  const slider = document.querySelector(".slider_image_wrapper");
  const wrapper = document.querySelector(".control_wrapper");

  slider.addEventListener("transitionend", updateSlider);
  wrapper.addEventListener("transitionend", updateTitles);

  const targetIndex = getTargetIndex(e.target);

  slider.style = `transform:translateX(${-targetIndex * 100}%);`;

  const controls = document.querySelectorAll(".control_item");


  const leftSlider = wrapper.getBoundingClientRect().x;
  const leftMargin = parseInt(getComputedStyle(controls[targetIndex]).marginLeft);
  const leftElement = controls[targetIndex].getBoundingClientRect().x;
  wrapper.style = `transform:translateX(${leftSlider + leftMargin - leftElement}px);`;

  setActiveLamp(targetIndex);
}


function replaceItems(container, index) {
  container.classList.add("disable-transition");
  let i = 0;
  while (i < index) {
    const item = container.children[0];
    container.append(item);
    i++;
  }
  container.style = `transform:translateX(0);`;
  setInterval(() => container.classList.remove("disable-transition"));
}

function setActiveLamp(index) {
  const activeClass = "lamps_item-active";
  const active = document.querySelector(`.${activeClass}`);
  const lamps = document.querySelectorAll(".lamps_item");
  const length = lamps.length;
  const activeIndex = Array.from(lamps).findIndex(el => el === active);

  active.classList.remove(activeClass);
  lamps[(index + activeIndex) % length].classList.add(activeClass);
}