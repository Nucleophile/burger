let clientWidth = document.documentElement.clientWidth;
const parallaxedBlocks = document.getElementById("burger-parallaxed").children;

window.addEventListener("resize", (e) => {
  clientWidth = document.documentElement.clientWidth;
});

document.addEventListener("mousemove", (e) => {
  for (let child of parallaxedBlocks) {
    const part = (clientWidth - e.pageX) / clientWidth;
    const translateX = parseInt(child.dataset.translatex) * part;
    const translateY = parseInt(child.dataset.translatey) * part;
    const rotate = parseInt(child.dataset.rotate) * part;
    child.style.transform = `translate(${translateX}%, ${translateY}%) rotate(${rotate}deg)`;
  }
});
