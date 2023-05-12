import { Game } from "../game";

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
  }

  doUpgrade(rank) {
    this.upgradeFunction(rank);
  }
}

export class UpgradeAmount {
  constructor(upgrade, rank, cost) {
    this.upgrade = upgrade;
    this.rank = rank;
    this.cost = cost;
  }

  increaseRank() {
    this.rank += 1;
    this.upgrade.doUpgrade(this.rank);
    this.cost = this.upgrade.costFunction(this.rank);
  }
}
