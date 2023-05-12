import { reactive } from "../../node_modules/vue";
import { Upgrade } from "./upgrades";
import { Game, format } from "./game";

export class ParticleUpgradeDefs {
  static upgrades = reactive([
    new Upgrade(
      "Small qBit Cluster",
      "Each Rank, gain 16 * Rank max qBits.",
      (rank) => "Next Rank: +" + format(10 * (rank + 1)) + " Max qBits.",
      50,
      (rank) => Game.gameState.maxQbits.addToModifier(rank * 10),
      (rank) => Math.pow(20, rank) + 49
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
        Game.getGlobalModifier("PurchaseMultiplier").multiplyModifier(1.05),
      (rank) => Math.pow(40, rank) + 99
    ),
    new Upgrade(
      "Simulation Control",
      "5% Discount for unit prices.",
      (rank) =>
        "qBit prices are divided by " +
        format(Game.getGlobalModifier("qDiscount").amount) +
        ".",
      25,
      (rank) => Game.getGlobalModifier("qDiscount").multiplyModifier(1.05),
      (rank) => Math.pow(60, rank) + 999
    ),
    new Upgrade(
      "Flat Stability",
      "Gain +1 Seconds of decay time.",
      (rank) =>
        "All Units gain +" +
        format(Game.getGlobalModifier("stabilityFlat").amount) +
        " seconds.",
      25,
      (rank) => Game.getGlobalModifier("stabilityFlat").addToModifier(1),
      (rank) => Math.pow(90, rank) + 2.5e3 * Math.max(1, rank / 1.75)
    ),
    new Upgrade(
      "qBit Reformat",
      "Double Max qBits",
      (rank) =>
        "qBit Maximum multiplied by " + format(Math.pow(2, rank)) + "x.",
      5,
      (rank) => {
        Game.getGlobalModifier("qMultiplier").multiplyModifier(2);
        console.log(Game.gameState.qBits);
        Game.gameState.qBits =
          Game.gameState.maxQbits.amount *
          Game.getGlobalModifier("qMultiplier").amount;
        console.log(Game.gameState.qBits);
      },
      (rank) => Math.pow(125, rank) + 1e4 * Math.max(1, rank / 1.5)
    ),
  ]);
}
