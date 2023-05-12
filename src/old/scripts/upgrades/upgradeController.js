import { Game } from "../game";
import { UpgradeAmount } from "./upgrade";
import { UpgradeDefs } from "./upgradeDefs";

export class UpgradeController {
  constructor() {
    for (let upgrade of UpgradeDefs.upgrades) {
      Game.gameState.upgrades.push(
        new UpgradeAmount(upgrade, 0, upgrade.costFunction(0))
      );
    }
  }
  static canBuy(upgradeAmount) {
    return (
      upgradeAmount.rank < upgradeAmount.upgrade.maxRank &&
      Game.gameState.money >= upgradeAmount.cost
    );
  }

  static buyUpgrade(upgradeAmount) {
    if (!UpgradeController.canBuy(upgradeAmount)) return;
    Game.gameState.money -= upgradeAmount.cost;
    upgradeAmount.increaseRank();
  }
}
