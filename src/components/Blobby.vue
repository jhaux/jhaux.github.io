und<template>
    <div class=multiChart :id="name + 'multiChart'"> </div>
</template>

<script>
import { MultiDensityChart } from './mutli_density_chart.js'

export default {
  props: {
    name: {type: String, required: true},
    width: {type: Number, default: null},
    height: {type: Number, default: null}
  },
  data: function() {
    return {
      showHelp: false
    }
  },
  mounted: function () {
    MultiDensityChart(
      'https://media.githubusercontent.com/media/jhaux/jhaux.github.io/master/public/timestamp_av.csv',
      '#' + this.name + 'multiChart',
      this.width,
      this.height
    )
  },
}
</script>

<style>

.area {
  stroke: var(--primary);
  stroke-width: 2px;
  fill: var(--primary-var);
  fill-opacity: 0.5;
  stroke-opacity: 0.6;
}

.area.area_odd {
  stroke: var(--secondary);
  fill: var(--secondary-var1);
}

.activity > .line {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2px;
}

.axis {
  font-size: 14px;
}

.multiChart {
  height: 80%;
}

.multiChart > svg {
  max-height: 100%;
  width: auto;
}
</style>
