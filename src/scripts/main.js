import { Modal } from "bootstrap";
import { Tab } from "bootstrap";
import Burger from "./classes/Burger.js";
import Ingredient from "./classes/Ingredient.js";
import IngredientCard from "./classes/IngredientCard.js";
import Calculator from "./classes/Calculator.js";
import { ingredients } from "./ingredients.js";

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
};
const otherTabsButtons = document.querySelectorAll("[data-tab]");

otherTabsButtons.forEach((otherTabsButton) => {
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
const priceBlockDOMEl = document.getElementById("price-block");
const burger = new Burger(burgerDOMEl, orderBtnDOMEl, ingredients);
const ingredientCards = [];
const calculatorsDefaults = {
  calories: ingredients.bun.calories,
  time: ingredients.bun.time,
  mass: ingredients.bun.mass,
  price: ingredients.bun.price
};
const calculators = [];

for (let calculatorName in calculatorsDefaults) {
  let precision = 0;

  if (calculatorName === "price") {
    precision = 2;
  }

  calculators.push(new Calculator(calculatorName, calculatorsDefaults[calculatorName], precision));
}

for (let ingredientName in ingredients) {
  const addIngredientBtnDOMEl = document.getElementById(`add-${ingredientName}-btn`);
  const removeIngredientBtnDOMEl = document.getElementById(`remove-${ingredientName}-btn`);
  const ingredient = new Ingredient(ingredientName, ingredients[ingredientName]);
  const ingredientCard = new IngredientCard(ingredient, addIngredientBtnDOMEl, burger, calculators);
  ingredientCards.push(ingredientCard);

  addIngredientBtnDOMEl.addEventListener("click", () => {
    const currentQty = ingredientCard.addIngredient();

    if (currentQty === 1) removeIngredientBtnDOMEl.removeAttribute("disabled");

    if (ingredientName === "bun") {
      // Nothing can be added after top bun
      ingredientCards.forEach((ingredientCard) => {
        ingredientCard.addBtnDOMEl.setAttribute("disabled", "");
      });
    }

    calculators.forEach((calculator) => {
      const calculatorValue = calculator.add(ingredient.characteristics[calculator.name]);

      if (calculator.name === "price" && calculatorValue > 5) {
        priceBlockDOMEl.classList.add("gift-winned");
      }
    });
  });

  removeIngredientBtnDOMEl.addEventListener("click", () => {
    const currentQty = ingredientCard.removeIngredient();

    if (currentQty === 0) removeIngredientBtnDOMEl.setAttribute("disabled", "");

    if (ingredientName === "bun") {
      ingredientCards.forEach((ingredientCard) => {
        ingredientCard.addBtnDOMEl.removeAttribute("disabled");
      });
    }

    calculators.forEach((calculator) => {
      const calculatorValue = calculator.substract(ingredient.characteristics[calculator.name]);

      if (calculator.name === "price" && calculatorValue <= 5) {
        priceBlockDOMEl.classList.remove("gift-winned");
      }
    });
  });
}

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
