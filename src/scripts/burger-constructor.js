import Burger from "./classes/Burger.js";
import Ingredient from "./classes/Ingredient.js";
import IngredientCard from "./classes/IngredientCard.js";
import Calculator from "./classes/Calculator.js";
import { ingredients } from "./ingredients.js";

const burgerDOMEl = document.getElementById("burger");
const orderBtnDOMEl = document.getElementById("order-btn");
const priceBlockDOMEl = document.getElementById("price-block");
const burger = new Burger(burgerDOMEl, orderBtnDOMEl, ingredients);
const warningDOMEl = document.getElementById("are-you-sure");
const burgerObserver = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting) {
      warningDOMEl.style.display = "block";
    } else {
      warningDOMEl.style.display = "none";
    }
  },
  { threshold: 1 }
);

function checkBurgerOverflow() {
  burgerObserver.observe(burgerDOMEl);
  setTimeout(() => {
    burgerObserver.unobserve(burgerDOMEl);
  }, 100);
}

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
  const ingredientCard = new IngredientCard(ingredientName, addIngredientBtnDOMEl);
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

    burger.addIngredient(ingredient);
    checkBurgerOverflow();

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

    burger.removeIngredient(ingredient);
    checkBurgerOverflow();

    calculators.forEach((calculator) => {
      const calculatorValue = calculator.substract(ingredient.characteristics[calculator.name]);

      if (calculator.name === "price" && calculatorValue <= 5) {
        priceBlockDOMEl.classList.remove("gift-winned");
      }
    });
  });
}
