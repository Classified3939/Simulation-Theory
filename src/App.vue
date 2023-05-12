<script setup>
  import UnitButton from "./components/unitButton.vue";
  import UpgradePanel from "./components/upgradePanel.vue";
  import { format, Game } from "./scripts/game";
  import { ParticleUpgradeDefs } from "./scripts/particleUpgradeDefs";
</script>

<template>
    <div class="currencyContainer">
      <div>{{"You have $"+format(Game.gameState.money)+" ("+format(Game.gameState.moneyPerSecond)+"/s)"}}</div>
      <div>{{"You have "+  format(Game.gameState.qBits) + "/" + format(Game.gameState.maxQbits.amount * Game.getGlobalModifier("qMultiplier").amount) + " qBits."}}</div>
    </div>
    <div v-if="Game.gameState.isInSimulation" @click="Game.endSim()" class="endSimulation simulationControls">
      <div>{{ "You have been simulating for " + format(Game.gameState.timeInSimulation) + " seconds." }}</div>
      <div style="font-size:1.5em;">End Simulation (Resets qBits)</div>
    </div>
    <div v-else class="beginSimulation simulationControls" @click="Game.beginSim()">
      <div>{{ "You are not running a simulation" }}</div>
      <div style="font-size:1.5em">Begin Simulation</div>
    </div>
    <div v-if="Game.gameState.isInSimulation">
      <UnitButton v-for="unit in Game.gameState.currentSimulation.getUnlockedUnits()" :unit="unit"></UnitButton>
    </div>
    <div v-else>
      <pre class="simLog">
        {{ Game.gameState.currentSimulation.getDisplay() }}
      </pre>
      <div class="upgradeContainer">
        <UpgradePanel v-for="upgrade in ParticleUpgradeDefs.upgrades" :upgrade="upgrade"></UpgradePanel>
      </div>
      
    </div>

    
</template>

<style scoped>
  *{
    background-color: #055C9D;
    user-select: none;
  }

  .currencyContainer{
    text-align: center;
    font-size:1.5em
  }

  .upgradeContainer{
    display: grid;
    grid-template-columns: repeat(5, 5fr);
    gap: 10px;
    grid-auto-rows: minmax(5em,auto);
  }
  
  .simulationControls{
    text-align:center;
    font-size:1.3em;
  }
  .beginSimulation{
    border: 5px solid lightcoral;
  }
  .endSimulation{
    border: 3px solid greenyellow;
  }

  .simLog{
    border: 3px solid white;
    margin-bottom: 1%;
    margin-top:.5em;
  }
</style>
