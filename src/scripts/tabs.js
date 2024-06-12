
import { Tab } from "bootstrap";

const makeBurgerSection = document.getElementById("make-burger");

document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((tab) => {
  tab.addEventListener("show.bs.tab", function (e) {
    document.querySelector(e.target.dataset.bsTarget).append(makeBurgerSection);
  });
});

// Triggering tabs with other buttons
const tabs = {
  home: new Tab(document.getElementById("home-tab-btn")),
  constructor: new Tab(document.getElementById("make-burger-tab-btn"))
};
const otherTabsButtons = document.querySelectorAll("[data-tab]");

otherTabsButtons.forEach((otherTabsButton) => {
  otherTabsButton.addEventListener("click", () => {
    tabs[otherTabsButton.dataset.tab].show();
  });
});
