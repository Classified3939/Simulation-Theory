import { Game } from "../game";
import { Modifier } from "./modifier";
export class ModifierController {
  constructor() {
    if (Game.gameState.modifiers.length === 0) {
      Game.gameState.modifiers = ModifierController.getDefaultModifiers();
    }
  }

  static getDefaultModifiers() {
    return [
      new Modifier("maxQBit", "Max qBits", 100),
      new Modifier("buyMult", "Purchase Multiplier", 1.05),
      new Modifier("qDiscount", "qBit Discount", 1),
      new Modifier("stabilityFlat", "Decay Time Bonus", 0),
    ];
  }

  static getModifier(id) {
    return Game.gameState.modifiers.find((modifier) => modifier.id == id);
  }
}
