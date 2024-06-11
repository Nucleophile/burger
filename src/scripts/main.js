import { Modal } from "bootstrap";
import { Tab } from "bootstrap";
import Burger from "./classes/Burger.js";
import Ingredient from "./classes/Ingredient.js";
import IngredientCard from "./classes/IngredientCard.js";
import Calculator from "./classes/Calculator.js";
import { ingredientsCharacteristics } from "./ingredientsCharacteristics.js";

// Moving .make-burger block between tabs
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
}
const otherTabsButtons = document.querySelectorAll("[data-tab]");

otherTabsButtons.forEach(otherTabsButton => {
  otherTabsButton.addEventListener("click", () => {
    tabs[otherTabsButton.dataset.tab].show();
  });
});

// Parallax realisation
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

// Burger building logic
const burgerDOMEl = document.getElementById("burger");
const orderBtnDOMEl = document.getElementById("order-btn");
const ingredients = Object.keys(ingredientsCharacteristics);
const burger = new Burger(burgerDOMEl, orderBtnDOMEl, ingredients);
const ingredientCards = [];
const calculatorsDefaults = {
  calories: ingredientsCharacteristics.bun.calories,
  time: ingredientsCharacteristics.bun.time,
  mass: ingredientsCharacteristics.bun.mass,
  price: ingredientsCharacteristics.bun.price
};
const calculators = [];

Object.keys(calculatorsDefaults).forEach((calculatorName) => {
  const callbacks = {};
  let precision = 0;

  if (calculatorName === "price") {
    const priceBlockDOMEl = document.getElementById("price-block");
    const callback = () => {
      priceBlockDOMEl.classList.toggle("gift-winned");
    };
    Object.assign(callbacks, {
      triggerValue: 5,
      callbackAbove: callback,
      callbackUnder: callback
    });
    precision = 2;
  }

  calculators.push(new Calculator(calculatorName, calculatorsDefaults[calculatorName], precision, callbacks));
});

ingredients.forEach((ingredientName) => {
  const ingredient = new Ingredient(ingredientName, ingredientsCharacteristics[ingredientName]);
  let addIngredientCallback;
  let removeIngredientCallback;

  if (ingredientName === "bun") {
    addIngredientCallback = () => {
      ingredientCards.forEach((ingredientCard) => {
        ingredientCard.addBtnDOMel.setAttribute("disabled", "");
      });
    };
    removeIngredientCallback = () => {
      ingredientCards.forEach((ingredientCard) => {
        ingredientCard.addBtnDOMel.removeAttribute("disabled");
      });
    };
  }
  ingredientCards.push(new IngredientCard(ingredient, burger, calculators, addIngredientCallback, removeIngredientCallback));
});

// Modals logic
const modalOrderDOMEl = document.getElementById("modal-order");
const modalSuccessDOMEl = document.getElementById("modal-success");
const modalOrder = new Modal(modalOrderDOMEl);
const modalSuccess = new Modal(modalSuccessDOMEl);
const burgerForModalDOMEl = document.querySelector(".burger-for-modal");

orderBtnDOMEl.addEventListener("click", () => {
  modalOrderDOMEl.querySelector(".burger-for-modal").replaceWith(burgerForModalDOMEl.cloneNode(true));
  modalOrder.show();
});

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  modalOrder.hide();
  modalSuccessDOMEl.querySelector(".burger-for-modal").replaceWith(burgerForModalDOMEl.cloneNode(true));
  modalSuccess.show();
});

document.getElementById("success-form").addEventListener("submit", (e) => {
  e.preventDefault();
  modalSuccess.hide();
});

// Mobile menu
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
