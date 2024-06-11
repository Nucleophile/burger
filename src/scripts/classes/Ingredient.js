export default class Ingredient {
  constructor(name, characteristics) {
    this.name = name;
    this.template = document.getElementById(`${name}-template`);
    this.characteristics = characteristics;
  }
}
