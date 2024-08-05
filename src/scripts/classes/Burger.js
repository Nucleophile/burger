export default class Burger {
  constructor(burgerDOMEl, ingredients) {
    this.burgerDOMEl = burgerDOMEl;
    this.composition = {};
    for (let ingredient in ingredients) {
      this.composition[ingredient] = [];
    };
  }

  addIngredient(ingredient) {
    const ingredientTemplate = ingredient.template.content.cloneNode(true);
    this.composition[ingredient.name].push(ingredientTemplate.firstElementChild);
    this.burgerDOMEl.append(ingredientTemplate);
  }

  removeIngredient(ingredient) {
    this.composition[ingredient.name].pop().remove();
  }
}
