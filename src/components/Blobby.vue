<template>
  <div id="multiChart">
  </div>
</template>

<script>
import { MultiDensityChart } from './mutli_density_chart.js'

export default {
  mounted: function () {
    MultiDensityChart('timestamp_av.csv', '#multiChart')
  }
}
</script>

<style>
.activity > .area {
  stroke: none;
  fill: var(--primary);
}
.activity > .line {
  fill: none;
  stroke: var(--secondary);
}
</style>
