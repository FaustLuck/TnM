const wrapper = document.querySelector(".wrapper");

export function changeSlider(e) {
  if (window.matchMedia("screen and (max-width: 960px)").matches) return;
  const number = +getNumber(wrapper.style.transform);
  if (number - e.deltaY > 0 || number - e.deltaY < -300) return;
  wrapper.addEventListener("transitionend", pause);
  document.removeEventListener("wheel", changeSlider);
  wrapper.style = `transform:translateX(${number - e.deltaY}%);`;
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
    el.classList.replace(`page_${current}`, `page_${next}`);
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