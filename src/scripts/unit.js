import { Modifier } from "./modifiers";
import { Game } from "./game";

export class Unit {
  constructor(tier, name, defaultCost, defaultDecay, defaultProd, decayProd) {
    this.tier = tier;
    this.name = name;
    this.defaultCost = defaultCost;
    this.cost = defaultCost;
    this.costMult = new Modifier(1, name + " Cost Multiplier");
    this.defaultDecay = defaultDecay;
    this.decayTime = new Modifier(defaultDecay, name + " Stability");
    this.defaultProduction = defaultProd;
    this.production = new Modifier(defaultProd, name + " Production");
    this.bought = 0;
    this.amount = 0;
    this.unlocked = false;
    this.decayTimer = -1;
    this.defaultDecayProduction = decayProd;
    this.decayProduction = new Modifier(decayProd, name + " Decay Bonus");
  }

  canBuy() {
    return this.cost * this.costMult.amount <= Game.gameState.qBits;
  }

  productionPerSecond() {
    return this.production.amount;
  }

  resetDecayTimer() {
    this.decayTimer = this.decayTime.amount;
  }

  resetCounts() {
    this.bought = 0;
    this.amount = 0;
    this.resetBonuses();
  }

  resetBonuses() {
    this.cost = this.defaultCost / Game.getGlobalModifier("qDiscount").amount;
    this.production.amount = this.defaultProduction;
    this.decayTime.amount =
      this.defaultDecay + Game.getGlobalModifier("stabilityFlat").amount;
  }

  decay(lowerTier) {
    if (this.tier == 1) return;
    this.amount -= 1;
    lowerTier.amount += this.decayProduction.amount;
  }
}
