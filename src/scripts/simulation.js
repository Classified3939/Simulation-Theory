import { Game, format } from "./game";
export class Simulation {
  constructor(units) {
    this.units = units;
    this.totalMoney = 0;
    this.qBitsSpent = 0;
    this.highestTier = 0;
    this.timeInSim = 0;
    this.bonusesApplied = [];
  }

  buyUnit(unit) {
    if (!unit.canBuy()) return;
    else {
      Game.gameState.qBits -= unit.cost;
      this.qBitsSpent += unit.cost;

      if (unit.bought === 0 && unit.tier < 8) {
        if (unit.tier < 8) {
          this.units[this.highestTier + 1].unlocked = true;
        }
        this.highestTier += 1;
      }
      unit.bought += 1;
      unit.amount += 1;
      unit.cost *= 2;
      unit.production.multiplyModifier(
        Game.getGlobalModifier("PurchaseMultiplier").amount
      );
      if (unit.amount == 1) {
        unit.resetDecayTimer();
      }
    }
  }

  getDisplay() {
    if (this.totalMoney === 0 || this.highestTier === 0) {
      return "\n\tYour last simulation generated no income!";
    } else {
      let display =
        "\n\tYour last simulation lasted " +
        format(this.timeInSim) +
        " seconds, spent " +
        format(this.qBitsSpent) +
        " qBits, and generated $" +
        format(this.totalMoney);
      if (this.bonusMoney > 0) {
        display += " + $" + format(this.bonusMoney);
      }
      display += ".\n\tYou created up to a tier " + this.highestTier + " unit.";
      if (this.bonusesApplied.length === 0) {
        return display;
      } else {
        display += "\nYou achieved the bonuses of:";
        for (let bonus in this.bonusesApplied) {
          display += bonus.getDisplay();
          if (
            this.bonusesApplied.indexOf(bonus) <
            this.bonusesApplied.length - 1
          ) {
            display += ", ";
          }
        }
      }
    }
  }

  getUnlockedUnits() {
    return this.units.filter((unit) => unit.unlocked == true);
  }
}
