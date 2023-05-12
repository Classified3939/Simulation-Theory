<script setup>
import {Game, format} from "../scripts/game";
defineProps(["unit"])
</script>

<template>
    <div @click="Game.gameState.currentSimulation.buyUnit(unit)" class="container">
        <div style="width:20em;padding-left:1%">
            <div>{{(format(unit.amount)) + " [" + (format(unit.bought)) + "] " + unit.name}}</div>
            <div v-if="unit.tier == 1">{{"Generating $"+ format(unit.productionPerSecond()*unit.amount) + "/second"}}</div>
            <div v-else>{{"Generating "+ format(unit.productionPerSecond()*unit.amount) + "/second"}}</div>
            <div>{{"Buy: " + format(unit.cost) + " qBits"}}</div>
        </div>
        <div style="width:20em;padding-left:1%">
            <div>{{"Makes "+ format(unit.productionPerSecond()) + "/s per unit." }}</div>
            <div v-if="unit.tier > 1">{{ "Decays every " + format(unit.decayTime.amount)}}</div>
            <div v-if="unit.tier > 1 && unit.decayTimer !== -1">{{ "To Decay: "+format(unit.decayTimer) }}</div>
        </div>
        <div>
            <div v-if="unit.tier > 1">{{ "Bonus of "+format(unit.decayProduction.amount) + " on decay" }}</div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        background-color: #0E86D4;
        color: white;
        border: 2px solid #c9edff;
        display: flex;
        flex-direction: row;
    }
</style>