export default class IngredientCard {
  constructor(ingredient, burger, calculators, addIngredientCallback, removeIngredientCallback) {
    this.ingredient = ingredient;
    this.burger = burger;
    this.calculators = calculators;
    this.addIngredientCallback = addIngredientCallback;
    this.removeIngredientCallback = removeIngredientCallback;
    this.qty = 0;
    this.qtyDOMel = document.getElementById(`${this.ingredient.name}-qty`);
    this.addBtnDOMel = document.getElementById(`add-${this.ingredient.name}-btn`);
    this.addBtnDOMel.addEventListener("click", this.addIngredient.bind(this));
    this.removeBtnDOMel = document.getElementById(`remove-${this.ingredient.name}-btn`);
    this.removeBtnDOMel.addEventListener("click", this.removeIngredient.bind(this));
  }

  addIngredient() {
    if (this.qty === 0) {
      this.removeBtnDOMel.removeAttribute("disabled");
    }

    this.burger.addIngredient(this.ingredient);
    this.calculators.forEach((calculator) => {
      calculator.add(this.ingredient.characteristics[calculator.name]);
    });
    this.qty++;
    this.qtyDOMel.innerText = this.qty;
    this.addIngredientCallback && this.addIngredientCallback();
  }

  removeIngredient() {
    if (this.qty === 1) {
      this.removeBtnDOMel.setAttribute("disabled", "");
    }

    if (this.qty) {
      this.burger.removeIngredient(this.ingredient);
      this.calculators.forEach((calculator) => {
        calculator.substract(this.ingredient.characteristics[calculator.name]);
      });
      this.qty--;
      this.qtyDOMel.innerText = this.qty;
    }

    this.removeIngredientCallback && this.removeIngredientCallback();
  }
}
