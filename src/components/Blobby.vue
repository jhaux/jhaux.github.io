und<template>
  <v-container class=multiChartContainer>
    <v-toolbar>
      <v-toolbar-title>
        Experience
      </v-toolbar-title>
      <v-spacer />
        <v-btn icon @click=onHelpClick>
          <v-icon>
            mdi-help-circle-outline
          </v-icon>
        </v-btn>
    </v-toolbar>

    <v-overlay v-if=showHelp>
      Help Text
      <v-btn icon @click="showHelp=false">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-overlay>

    <div :id="name + 'multiChart'"> </div>
    <v-row>
        Content
    </v-row>
  </v-container>
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
    MultiDensityChart('timestamp_av.csv', '#' + this.name + 'multiChart', this.width, this.height)
  },
  methods: {
    onHelpClick: function () {
      this.showHelp = true
    }
  }
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
</style>
