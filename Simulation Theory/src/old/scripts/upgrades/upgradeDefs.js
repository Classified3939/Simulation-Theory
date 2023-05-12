import { Game, format } from "../game";
import { Upgrade } from "./upgrade";
import { ModifierController } from "../modifiers/modifierController";

export class UpgradeDefs {
  static upgrades = [
    new Upgrade(
      "Small qBit Cluster",
      "Each Rank, gain 10 * Rank max qBits.",
      (rank) => "Next Rank: +" + format(10 * (rank + 1)) + " Max qBits.",
      50,
      (rank) =>
        ModifierController.getModifier("maxQBit").addToModifier(rank * 10),
      (rank) => Math.pow(20, (rank + 1) / 2) + 49
    ),
    new Upgrade(
      "Focus Increase",
      "5% Increase to purchase bonus.",
      (rank) =>
        "Per-purchase bonus is multiplied by " +
        format(Math.pow(1.05, rank)) +
        ".",
      10,
      (rank) =>
        ModifierController.getModifier("buyMult").multiplyModifier(1.05),
      (rank) => Math.pow(40, (rank + 1) / 2) + 99
    ),
    new Upgrade(
      "Simulation Control",
      "5% Discount for unit prices.",
      (rank) =>
        "qBit prices are divided by " +
        format(ModifierController.getModifier("qDiscount").amount) +
        ".",
      25,
      (rank) =>
        ModifierController.getModifier("qDiscount").multiplyModifier(1.05),
      (rank) => Math.pow(75, (rank + 1) / 2) + 499
    ),
    new Upgrade(
      "Flat Stability",
      "Gain +0.25 Seconds of decay time.",
      (rank) =>
        "All Units gain +" +
        format(ModifierController.getModifier("stabilityFlat").amount) +
        " seconds.",
      25,
      (rank) =>
        ModifierController.getModifier("stabilityFlat").addToModifier(0.25),
      (rank) => Math.pow(90, (rank + 1) / 2) + 999
    ),
    new Upgrade(
      "Medium qBit Cluster",
      "Each Rank, gain 100 * Rank max qBits.",
      (rank) => "Next Rank: +" + format(100 * (rank + 1)) + " Max qBits.",
      50,
      (rank) =>
        ModifierController.getModifier("maxQBit").addToModifier(rank * 100),
      (rank) => Math.pow(150, (rank + 1) / 2) + 1.5e3
    ),
  ];
}
