import { Game } from "./game";
export class Upgrade {
  constructor(
    name,
    description,
    getDisplay,
    maxRank,
    upgradeFunction,
    costFunction
  ) {
    this.name = name;
    this.description = description;
    this.getDisplay = getDisplay;
    this.maxRank = maxRank;
    this.upgradeFunction = upgradeFunction;
    this.costFunction = costFunction;
    this.rank = 0;
    this.cost = this.costFunction(0);
  }

  doUpgrade(rank) {
    this.upgradeFunction(rank);
  }

  increaseRank() {
    this.rank += 1;
    this.doUpgrade(this.rank);
    this.cost = this.costFunction(this.rank);
  }

  canBuy() {
    return this.rank < this.maxRank && Game.gameState.money >= this.cost;
  }

  buyUpgrade() {
    if (!this.canBuy()) return;
    Game.gameState.money -= this.cost;
    this.increaseRank();
  }
}
