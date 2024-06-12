export default class Burger {
  constructor(burgerDOMEl, orderBtnDOMEl, ingredients) {
    this.burgerDOMEl = burgerDOMEl;
    this.composition = {};
    for (let ingredient in ingredients) {
      this.composition[ingredient] = [];
    };
    this.orderBtnDOMEl = orderBtnDOMEl;
    this.ingredientsQty = 0;
    this.warningDOMEl = document.getElementById("are-you-sure");
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          this.warningDOMEl.style.display = "block";
        } else {
          this.warningDOMEl.style.display = "none";
        }
      },
      { threshold: 1 }
    );
    this.checkOverflow = () => {
      this.observer.observe(this.burgerDOMEl);
      setTimeout(() => {
        this.observer.unobserve(this.burgerDOMEl);
      }, 10);
    };
  }

  addIngredient(ingredient) {
    const ingredientTemplate = ingredient.template.content.cloneNode(true);
    this.composition[ingredient.name].push(ingredientTemplate.firstElementChild);
    this.burgerDOMEl.append(ingredientTemplate);

    if (this.ingredientsQty === 0) {
      this.orderBtnDOMEl.removeAttribute("disabled");
    }

    this.checkOverflow();
    this.ingredientsQty++;
  }

  removeIngredient(ingredient) {
    this.composition[ingredient.name].pop().remove();
    this.checkOverflow();
    this.ingredientsQty--;

    if (this.ingredientsQty === 0) {
      this.orderBtnDOMEl.setAttribute("disabled", "");
    }
  }
}
