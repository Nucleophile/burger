export default class Calculator {
  constructor(name, value, precision) {
    this.name = name;
    this.value = value;
    this.precision = precision;
    this.valueDOMEl = document.getElementById(`${name}-calculator-value`);
  }

  add(value) {
    this.value = Math.round((this.value + value) * 100) / 100;
    this.valueDOMEl.innerText = this.value.toFixed(this.precision);
    return this.value;
  }

  substract(value) {
    const oldValue = this.value;
    this.value = Math.round((this.value - value) * 100) / 100;
    this.valueDOMEl.innerText = this.value.toFixed(this.precision);
    return this.value;
  }
}
