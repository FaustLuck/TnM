const wrapper = document.querySelector(".wrapper");

function changeSlider(e) {
  const number = +getNumber(wrapper.style.transform);
  if (number - e.deltaY > 0 || number - e.deltaY < -300) return;
  wrapper.addEventListener("transitionend", pause);
  document.removeEventListener("wheel", changeSlider);
  wrapper.style.transform = `translateX(${number - e.deltaY}%)`;
  const [current, next] = calculateIndices(number, e.deltaY);
  changePage(current, next);
  changeActiveElement(current, next);
}

function calculateIndices(number, delta) {
  const current = 1 + number / (-100);
  const next = current + delta / 100;
  return [current, next];
}

function changePage(current, next) {
  const elements = document.querySelectorAll(`.page_${current}`);
  elements.forEach(el => {
    el.classList.remove(`page_${current}`);
    el.classList.add(`page_${next}`);
  });
}

function changeActiveElement(current, next) {
  const actives = Array
    .from(document.querySelectorAll("[class*=active]"))
    .filter(el => el.parentElement.children.length === 4);
  actives.forEach(el => {
    const activeClass = Array.from(el.classList).filter(el => el.includes("-active"))[0];
    const node = el.parentElement.children;
    node[current - 1].classList.remove(activeClass);
    node[next - 1].classList.add(activeClass);
  });
}

function pause() {
  document.addEventListener("wheel", changeSlider);
  wrapper.removeEventListener("transitionend", pause);
}

function getNumber(string) {
  const array = string.match(/-?\d+/g) ?? [];
  return array[0] ?? 0;
}

function setControl() {
  const width = document.documentElement.clientWidth;
  const control = document.querySelector(".control");
  control.style.left = width * .6 + "px";
  const titles = document.querySelectorAll(".control_item");
  let opacity = 1;
  titles.forEach(el => {
    el.style.opacity = opacity;
    opacity -= .4;
    if (opacity.toFixed(1) === "-0.2") opacity = .05;
    if (opacity < 0) opacity = 0;
  });

}

document.addEventListener("wheel", changeSlider);
document.addEventListener("DOMContentLoaded", setControl);
window.addEventListener("resize", setControl);