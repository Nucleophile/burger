export default class Calculator {
  constructor(name, value, precision, callbacks) {
    this.name = name;
    this.value = value;
    this.precision = precision;
    this.callbacks = callbacks;
    this.valueDOMEl = document.getElementById(`${name}-calculator-value`);
  }

  add(value) {
    const oldValue = this.value;
    this.value = Math.round((this.value + value) * 100) / 100;
    this.valueDOMEl.innerText = this.value.toFixed(this.precision);

    if (this.callbacks.triggerValue && this.callbacks.triggerValue >= oldValue && this.callbacks.triggerValue < this.value) {
      this.callbacks.callbackAbove();
    }
  }

  substract(value) {
    const oldValue = this.value;
    this.value = Math.round((this.value - value) * 100) / 100;
    this.valueDOMEl.innerText = this.value.toFixed(this.precision);

    if (this.callbacks.triggerValue && this.callbacks.triggerValue < oldValue && this.callbacks.triggerValue >= this.value) {
      this.callbacks.callbackUnder();
    }
  }
}
