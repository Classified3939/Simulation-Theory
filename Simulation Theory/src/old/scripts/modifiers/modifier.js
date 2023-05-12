export class Modifier {
  constructor(id, display, amount) {
    this.id = id;
    this.display = display;
    this.amount = amount;
  }

  addToModifier(toAdd) {
    this.amount += toAdd;
  }

  multiplyModifier(toMultiply) {
    this.amount *= toMultiply;
  }

  powerModifier(power) {
    this.amount = Math.pow(this.amount, power);
  }
}
