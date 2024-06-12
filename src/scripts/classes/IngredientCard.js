export default class IngredientCard {
  constructor(ingredient, addBtnDOMEl, burger, calculators) {
    this.ingredient = ingredient;
    this.addBtnDOMEl = addBtnDOMEl;
    this.burger = burger;
    this.calculators = calculators;
    this.qty = 0;
    this.qtyDOMel = document.getElementById(`${this.ingredient.name}-qty`);
  }

  addIngredient() {
    this.burger.addIngredient(this.ingredient);
    this.qty++;
    this.qtyDOMel.innerText = this.qty;
    return this.qty;
  }

  removeIngredient() {
    this.burger.removeIngredient(this.ingredient);
    this.qty--;
    this.qtyDOMel.innerText = this.qty;
    return this.qty;
  }
}
