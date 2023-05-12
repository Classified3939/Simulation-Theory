import { Game } from "./game";
import { ModifierController } from "./modifiers/modifierController";
export const tierNames = [
  "Photon",
  "Quark",
  "Proton",
  "Neutron",
  "Hydrogen",
  "Deuterium",
  "Helium",
  "Interstellar Medium",
  "Molecular Cloud",
  "Protostar",
];

export class Particle {
  constructor(tier, name, cost, decayTime, production, mult) {
    this.tier = tier;
    this.name = name;
    this.cost = cost;
    this.decayTime = decayTime;
    this.production = production;
    this.mult = mult;
  }

  canBuy() {
    return this.cost <= Game.gameState.qBits;
  }

  productionPerSecond() {
    return this.production * this.mult;
  }
}

export function getDecayTime(tier) {
  const time =
    10 +
    ModifierController.getModifier("stabilityFlat").amount -
    Math.pow(tier, 2);
  return time > 0 ? time : 0;
}

export function getParticleName(tier) {
  return tierNames[tier % tierNames.length];
}

export function createParticle(tier) {
  const name = getParticleName(tier);
  const cost = Math.pow(10, tier);
  const decayTime = -1;
  const production = Math.pow(2, tier * 3);
  const mult = 1;

  return new Particle(tier, name, cost, decayTime, production, mult);
}
