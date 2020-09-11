<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="radarChart" />
      </v-col>
      <v-col>
        <div class="matcher" >
          <div class=matchValue> {{ matchValue }}%</div>
          <div class=matchText> {{ match }} </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import * as d3 from 'd3'
const d3 = Object.assign({}, require("d3"), require("d3-scale"));

import {RadarChart} from './radar_chart.js'

export default {
  props: {
    value: {type: Array, default: () => [[], []]}
  },
  data: function() {
    return {
      radarChartOptions: {}
    }
  },
  computed: {
    matchValue: function() {
      const player1 = this.value[0]
      const player2 = this.value[1]

      let matchValue = 0
      let diff
      for (var i = 0; i < player1.length; i++) {
        diff = player2[i].value - player1[i].value
        // diff = diff >= 0 ? 1 + diff : abs(diff)
        matchValue += 1 - diff
      }
      matchValue /= player1.length

      return Math.round(matchValue * 100)
    },
    match: function() {
      let matchText
      if (this.matchValue >= 90) {
        matchText = 'Its a match! I would love to hear from you!'
      } else {
        matchText = "Seems I can learn a lot at your company! Let's talk trainings!"
      }
      return matchText
    }
  },
  mounted: function() {
   /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

   //////////////////////////////////////////////////////////////
   //////////////////////// Set-Up //////////////////////////////
   //////////////////////////////////////////////////////////////

   var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

   //////////////////////////////////////////////////////////////
   //////////////////// Draw the Chart //////////////////////////
   //////////////////////////////////////////////////////////////

   const style = getComputedStyle(document.body)
   const color1 = style.getPropertyValue('--primary')
   const color2 = style.getPropertyValue('--secondary')

   var color = d3.scaleOrdinal()
    .range([color1,color2]);

   this.radarChartOptions = {
     w: width,
     h: height,
     margin: margin,
     maxValue: 6,
     levels: 6,
     roundStrokes: true,
     color: color
   };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        if ( this.value ) {
            console.log(this.value)
            if (this.value && this.value.length > 0) {
                RadarChart(".radarChart", this.value, this.radarChartOptions);
            }
        }
        this.$emit('input', this.value)
      }
    }
  }
}
</script>

<style >
.axisLabel {
  font-size: 14px !important;
}

.legend {
  font-size: 14px !important;
}

.matcher {
  display: grid;
}

.matchValue {
  font-size: 72px;
  font-weight: 600;

}

</style>
