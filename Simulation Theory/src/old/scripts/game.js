import { ModifierController } from "./modifiers/modifierController";
import { createParticle, getDecayTime } from "./particle";
import { reactive } from "vue";
import { Simulation } from "./simulations/simulation";

var lastTime;

export class ParticleAmount {
  constructor(particle, bought, amount, toDecay) {
    this.particle = particle;
    this.bought = bought;
    this.amount = amount;
    this.toDecay = toDecay;
  }

  buyParticle() {
    if (!this.particle.canBuy()) return;
    else {
      Game.gameState.qBits -= this.particle.cost;
      if (this.bought === 0 && this.particle.tier < 9) {
        Game.gameState.lastSimulation.highestTier += 1;
        let tier = this.particle.tier;
        Game.gameState.particleAmounts.push(
          new ParticleAmount(createParticle(tier + 1), 0, 0, -1)
        );
        Game.gameState.particleAmounts[tier + 1].particle.cost /=
          ModifierController.getModifier("qDiscount").amount;
      }
      this.bought += 1;
      this.amount += 1;
      this.particle.cost *= 3 * (this.particle.tier + 1);
      this.particle.mult *= ModifierController.getModifier("buyMult").amount;
      if (this.amount === 1) {
        this.resetDecayTimer();
      }
    }
  }

  resetDecayTimer() {
    this.toDecay = getDecayTime(this.particle.tier);
  }

  decayParticle() {
    if (this.particle.tier <= 0) return;
    else {
      this.amount -= 1;
      const otherParticle =
        Game.gameState.particleAmounts[this.particle.tier - 1];
      otherParticle.amount += 1;
      if (this.amount > 0) {
        this.resetDecayTimer();
      } else {
        this.toDecay = -1;
      }
      if (otherParticle.amount === 1) {
        otherParticle.resetDecayTimer();
      }
    }
  }
}

export class Game {
  static gameState = reactive({
    qBits: 0,
    money: 0,
    particleAmounts: [],
    moneyPerSecond: 0,
    isInSimulation: false,
    timeInSimulation: 0,
    upgrades: [],
    modifiers: [],
    lastSimulation: new Simulation(),
  });

  static calcMoneyPerSecond() {
    let moneyPerSecond = 0;
    for (let particleAmount of Game.gameState.particleAmounts) {
      if (particleAmount.toDecay > 0 || particleAmount.particle.tier == 0) {
        moneyPerSecond +=
          particleAmount.particle.productionPerSecond() * particleAmount.amount;
      }
    }
    return moneyPerSecond;
  }

  static gameLoop(now) {
    if (!Game.gameState.isInSimulation) {
      requestAnimationFrame(Game.gameLoop);
      Game.gameState.moneyPerSecond = 0;
      lastTime = now;
      Game.gameState.qBits = ModifierController.getModifier("maxQBit").amount;
      return;
    } else {
      if (!lastTime) lastTime = now;
      var delta = now - lastTime;
      while (delta > 50) {
        for (let particleAmount of Game.gameState.particleAmounts) {
          if (particleAmount.toDecay !== -1) {
            particleAmount.toDecay -= 0.05;
            if (particleAmount.toDecay <= 0) {
              particleAmount.decayParticle();
            }
          }
          let gainedMoney =
            particleAmount.particle.productionPerSecond() *
            particleAmount.amount *
            0.05;
          Game.gameState.money += gainedMoney;
          Game.gameState.lastSimulation.totalMoney += gainedMoney;
        }
        delta -= 50;
        Game.gameState.timeInSimulation += 0.05;
        Game.gameState.lastSimulation.timeInSim += 0.05;
        Game.gameState.moneyPerSecond = Game.calcMoneyPerSecond();
        lastTime = now;
      }
      requestAnimationFrame(Game.gameLoop);
    }
  }

  static initSim() {
    Game.gameState.particleAmounts.splice(
      0,
      Game.gameState.particleAmounts.length
    );
    Game.gameState.lastSimulation = new Simulation();
  }

  static newRun() {
    this.initSim();
    Game.gameState.particleAmounts.push(
      new ParticleAmount(createParticle(0), 0, 0, 0)
    );
    Game.gameState.particleAmounts[0].particle.cost /=
      ModifierController.getModifier("qDiscount").amount;
    console.log(Game.gameState.particleAmounts[0].particle.cost);
    Game.gameState.timeInSimulation = 0;
    Game.gameState.isInSimulation = true;
  }

  static endRun() {
    this.initSim();
    Game.gameState.isInSimulation = false;
  }
}
export function format(amount) {
  let power = Math.floor(Math.log10(amount));
  let mantissa = amount / Math.pow(10, power);
  if (power < 3) return amount.toFixed(2);
  else return mantissa.toFixed(2) + "e" + power;
}
