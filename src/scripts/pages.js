const wrapper = document.querySelector(".wrapper");
const nav = document.querySelector(".nav");

export function clickNavLinkPage(e) {
  e.preventDefault();
  if (!e.target.closest(".nav_item")) return;
  const target = e.target;

  // document.querySelector(target.getAttribute("href"))
  //   .scrollIntoView({behavior: "smooth"});
  scroll(target)

  const [targetIndex, currentIndex] = getIndices(target);
  changePage(currentIndex, targetIndex);
  changeActiveElement(currentIndex, targetIndex);
}

function getIndices(target) {
  const targetIndex = Array.from(nav.children).findIndex(el => el === target) + 1;
  const currentIndex = Array.from(nav.children).findIndex(el => el.classList.contains("nav_item-active")) + 1;
  return [targetIndex, currentIndex];
}

function scroll(target) {
  const {left} = document.querySelector(target.getAttribute("href")).getBoundingClientRect();
  window.scrollTo({left, behavior: "smooth"});
}

export function changeSlider(e) {
  if (window.matchMedia("screen and (max-width: 960px)").matches) return;
  const currentIndex = getIndices(e.target)[1];
  const targetIndex = currentIndex + Math.round(e.deltaY / 100);
  if (targetIndex > 4 || targetIndex < 1) return;

  document.querySelector(nav.children[targetIndex - 1].getAttribute("href"))
    .scrollIntoView({behavior: "smooth"});
  changePage(currentIndex, targetIndex);
  changeActiveElement(currentIndex, targetIndex);

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