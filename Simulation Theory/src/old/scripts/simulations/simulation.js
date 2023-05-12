import { format } from "../game";

export class Simulation {
  constructor() {
    this.totalMoney = 0;
    this.bonusMoney = 0;
    this.highestTier = 0;
    this.bonusesApplied = [];
    this.timeInSim = 0;
  }

  getDisplay() {
    if (this.totalMoney === 0 || this.highestTier === 0) {
      return "\n\tYour last simulation generated no income!";
    } else {
      let display =
        "\n\tYour last simulation lasted " +
        format(this.timeInSim) +
        " seconds, and generated $" +
        format(this.totalMoney) +
        " + $" +
        format(this.bonusMoney) +
        ".\n\tYou created up to a tier " +
        this.highestTier +
        " unit.";
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
}
