import { reactive } from "vue";
import { ParticleUnitDefs } from "./particleUnitDefs";
import { Modifier } from "./modifiers";
import { GlobalModifiers } from "./globalModifiers";
import { Simulation } from "./simulation";

var lastTime;

export class Game {
  static gameState = reactive({
    qBits: 0,
    maxQbits: new Modifier(10, "Max qBits"),
    money: 0,
    moneyPerSecond: 0,
    isInSimulation: false,
    timeInSimulation: 0,
    units: [],
    globalModifiers: [],
    currentSimulation: new Simulation([]),
  });

  static newGame() {
    for (let particle of ParticleUnitDefs.particles) {
      this.gameState.units.push(particle);
    }
    for (let global of GlobalModifiers.globals) {
      this.gameState.globalModifiers.push(global);
    }
    this.gameState.qBits = this.gameState.maxQbits.amount;
  }

  static endSim() {
    this.gameState.isInSimulation = false;
    this.gameState.qBits =
      this.gameState.maxQbits.amount *
      this.getGlobalModifier("qMultiplier").amount;
    this.moneyPerSecond = 0;
    this.gameState.timeInSimulation = 0;
    for (let unit of this.gameState.units) {
      unit.resetCounts();
      unit.decayTimer = -1;
      unit.unlocked = false;
    }
  }

  static beginSim() {
    this.gameState.isInSimulation = true;
    this.gameState.currentSimulation = new Simulation(this.gameState.units);
    this.gameState.currentSimulation.units[0].unlocked = true;
    for (let unit of this.gameState.units) {
      unit.resetBonuses();
    }
  }

  static getGlobalModifier(id) {
    if (id == "PurchaseMultiplier") return this.gameState.globalModifiers[0];
    if (id == "qDiscount") return this.gameState.globalModifiers[1];
    if (id == "stabilityFlat") return this.gameState.globalModifiers[2];
    if (id == "qMultiplier") return this.gameState.globalModifiers[3];
  }

  static calcMoneyPerSecond() {
    let moneyPerSecond = 0;
    for (let unit of Game.gameState.currentSimulation.getUnlockedUnits()) {
      if (unit.decayTimer > 0 || unit.tier == 1) {
        moneyPerSecond += unit.productionPerSecond() * unit.amount;
      }
    }
    return moneyPerSecond;
  }

  static gameLoop(now) {
    if (!Game.gameState.isInSimulation) {
      requestAnimationFrame(Game.gameLoop);
      Game.gameState.moneyPerSecond = 0;
      lastTime = now;
      Game.gameState.qBits =
        Game.gameState.maxQbits.amount *
        Game.getGlobalModifier("qMultiplier").amount;
      return;
    } else {
      if (!lastTime) lastTime = now;
      var delta = now - lastTime;
      while (delta > 50) {
        let currentUnits = Game.gameState.currentSimulation.getUnlockedUnits();
        for (let i = 0; i < currentUnits.length; i++) {
          let unit = currentUnits[i];
          if (unit.decayTimer !== -1) {
            unit.decayTimer -= 0.05;
            if (unit.decayTimer <= 0) {
              unit.decay(currentUnits[i - 1]);
              if (unit.amount == 0) unit.decayTimer = -1;
              else unit.resetDecayTimer();
            }
          }
          let toGain = unit.productionPerSecond() * unit.amount * 0.05;
          if (unit.tier == 1) {
            Game.gameState.money += toGain;
            Game.gameState.currentSimulation.totalMoney += toGain;
          } else {
            currentUnits[i - 1].amount += toGain;
          }
        }
        delta -= 50;
        Game.gameState.timeInSimulation += 0.05;
        Game.gameState.currentSimulation.timeInSim += 0.05;
        Game.gameState.moneyPerSecond = Game.calcMoneyPerSecond();
        lastTime = now;
      }
      requestAnimationFrame(Game.gameLoop);
    }
  }
}

export function format(amount) {
  let power = Math.floor(Math.log10(amount));
  let mantissa = amount / Math.pow(10, power);
  if (power < 3) return amount.toFixed(2);
  else return mantissa.toFixed(2) + "e" + power;
}
