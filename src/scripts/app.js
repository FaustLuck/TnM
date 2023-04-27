const wrapper = document.querySelector(".wrapper");

function changeSlider(e) {
  const number = +getNumber(wrapper.style.transform);
  if (number - e.deltaY > 0 || number - e.deltaY < -300) return;
  wrapper.addEventListener("transitionend", pause);
  document.removeEventListener("wheel", changeSlider);
  wrapper.style.transform = `translateX(${number - e.deltaY}%)`;
  changePage(number, e.deltaY);
}

function changePage(number, delta) {
  const i = 1 + number / (-100);
  const elements = document.querySelectorAll(`.page_${i}`);
  elements.forEach(el => {
    el.classList.remove(`page_${i}`);
    el.classList.add(`page_${i + delta / 100}`);
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

document.addEventListener("wheel", changeSlider);