<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="radarChart" />
      </v-col>
      <v-col>
        <div class="matcher" >
          <div class=matchValue v-html=matchRender></div>
          <div class=matchText> {{ matchText }} </div>
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
    value: {type: Array, default: () => [[], []]},
    cap: {type: Boolean, default: false}
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

      const N = player1.length

      if (N === 0) {
        return ['?', '?']
      }

      let matchValues = []
      let diff
      let val
      for (var i = 0; i < player1.length; i++) {
        diff = player2[i].value - player1[i].value

        val = 1 - diff
        val = this.cap && diff < 0 ? 1 : val
        matchValues.push( val )
      }
      console.log(matchValues)

      const matchValue = matchValues.reduce((a, b) => a + b) / N
      const matchVariance = matchValues.reduce(
        (a, b) => a + Math.pow((b - matchValue), 2)
      ) / N

      const returnValue = Math.round(matchValue * 1000) / 10
      const returnVariance = Math.round(matchVariance * 1000) / 10

      return [returnValue, returnVariance]
    },
    matchRender: function() {
      const [m, v] = this.matchValue
      if (m === '?'){
        return '?%'
      } else {
        return `${m}%` + ' &#177 ' + `${v}%`
      }
    },
    matchText: function() {
      let matchText
      if (this.matchValue >= 90) {
        matchText = 'Its a match! I would love to hear from you!'
      } else if (this.matchValue[0] === '?') {
        matchText = "Choose some of my skills and set your requirements!"
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
        if (this.value) {
            RadarChart(".radarChart", this.value, this.radarChartOptions);
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
