export default class IngredientCard {
  constructor(name, addBtnDOMEl) {
    this.name = name;
    this.addBtnDOMEl = addBtnDOMEl;
    this.qty = 0;
    this.qtyDOMel = document.getElementById(`${this.name}-qty`);
  }

  addIngredient() {
    this.qty++;
    this.qtyDOMel.innerText = this.qty;
    return this.qty;
  }

  removeIngredient() {
    this.qty--;
    this.qtyDOMel.innerText = this.qty;
    return this.qty;
  }
}
