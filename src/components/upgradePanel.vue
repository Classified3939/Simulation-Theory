<script setup>
    import {format} from "../scripts/game";
    defineProps(['upgrade'])
</script>


<template>
    <div @click="upgrade.buyUpgrade()" class="upgradePanel">
        <div style="width:100%;padding-left:1%">
            <div>{{upgrade.name}}</div>
            <div>{{upgrade.description}}</div>
            <div>{{upgrade.getDisplay(upgrade.rank)}}</div>
            <div>{{"Rank: " + upgrade.rank + "/" + upgrade.maxRank}}</div>
            <div>{{"Buy $" + format(upgrade.cost)}}</div>
        </div>
    </div>
</template>

<style scoped>
    .upgradePanel{
        background-color: #0E86D4;
        color: white;
        border: 2px solid #c9edff;
        display: flex;
        flex-direction: column;
        width:100%;
    }
</style>