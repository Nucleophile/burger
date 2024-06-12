const mobMenuTogglers = document.querySelectorAll(".mob-menu-toggler");
const mobMenuBtn = document.getElementById("mob-menu-btn");
const mobMenu = document.getElementById("mob-menu");

mobMenuBtn.addEventListener("click", (e) => {
  if (mobMenu.classList.contains("opened")) {
    mobMenu.classList.remove("opened");
  } else {
    mobMenu.classList.add("opened");
  }
});

mobMenuTogglers.forEach((mobMenuToggler) => {
  mobMenuToggler.addEventListener("click", (e) => {
    if (mobMenu.classList.contains("opened")) {
      mobMenu.classList.remove("opened");
    }
  });
});
