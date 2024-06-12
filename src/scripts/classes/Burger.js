export default class Burger {
  constructor(burgerDOMEl, orderBtnDOMEl, ingredients) {
    this.burgerDOMEl = burgerDOMEl;
    this.composition = {};
    for (let ingredient in ingredients) {
      this.composition[ingredient] = [];
    };
    this.orderBtnDOMEl = orderBtnDOMEl;
    this.ingredientsQty = 0;
  }

  addIngredient(ingredient) {
    const ingredientTemplate = ingredient.template.content.cloneNode(true);
    this.composition[ingredient.name].push(ingredientTemplate.firstElementChild);
    this.burgerDOMEl.append(ingredientTemplate);

    if (this.ingredientsQty === 0) {
      this.orderBtnDOMEl.removeAttribute("disabled");
    }

    this.ingredientsQty++;
  }

  removeIngredient(ingredient) {
    this.composition[ingredient.name].pop().remove();
    this.ingredientsQty--;

    if (this.ingredientsQty === 0) {
      this.orderBtnDOMEl.setAttribute("disabled", "");
    }
  }
}
