import Burger from "./classes/Burger.js";
import Ingredient from "./classes/Ingredient.js";
import IngredientCard from "./classes/IngredientCard.js";
import Calculator from "./classes/Calculator.js";
import { ingredients } from "./ingredients.js";

const burgerDOMEl = document.getElementById("burger");
const orderBtnDOMEl = document.getElementById("order-btn");
const priceBlockDOMEl = document.getElementById("price-block");
const burger = new Burger(burgerDOMEl, ingredients);
const warningDOMEl = document.getElementById("are-you-sure");
const burgerObserver = new IntersectionObserver(
  // Showing and hiding "Are you sure?" pop-up
  ([entry]) => {
    if (!entry.isIntersecting) {
      warningDOMEl.style.display = "block";
    } else {
      warningDOMEl.style.display = "none";
    }
    burgerObserver.unobserve(burgerDOMEl);
  },
  { threshold: 1 }
);

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

      // Now we can order
      orderBtnDOMEl.removeAttribute("disabled");
    }

    burger.addIngredient(ingredient);
    burgerObserver.observe(burgerDOMEl);

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
      // Now use can add any ingredient
      ingredientCards.forEach((ingredientCard) => {
        ingredientCard.addBtnDOMEl.removeAttribute("disabled");
      });

      // Now we can't order
      orderBtnDOMEl.setAttribute("disabled", "");
    }

    burger.removeIngredient(ingredient);
    burgerObserver.observe(burgerDOMEl);

    calculators.forEach((calculator) => {
      const calculatorValue = calculator.substract(ingredient.characteristics[calculator.name]);

      if (calculator.name === "price" && calculatorValue <= 5) {
        priceBlockDOMEl.classList.remove("gift-winned");
      }
    });
  });
}
