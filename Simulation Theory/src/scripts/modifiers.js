export class Modifier {
  constructor(amount, display) {
    this.amount = amount;
    this.display = display;
  }

  addToModifier(amount) {
    this.amount += amount;
  }

  multiplyModifier(amount) {
    this.amount *= amount;
  }

  powerModifier(amount) {
    this.amount = Math.pow(this.amount, amount);
  }
}
