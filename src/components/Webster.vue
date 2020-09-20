<template>
  <div>
    <div :id="name + 'radarChart'" class=radarChart />
    <v-container>
        <v-col v-if=matches>
          <div class="matcher" >
            <div class=matchValue v-html=matchRender></div>
            <div class=matchText> {{ matchText }} </div>
          </div>
        </v-col>
    </v-container>
      </div>
</template>

<script>
import * as d3 from 'd3'

import {RadarChart} from './radar_chart.js'
import Colors from '@/mixins/Colors.js'

export default {
  mixins: [Colors],
  props: {
    value: {type: Array, default: () => [[], []]},
    cap: {type: Boolean, default: false},
    name: {type: String, required: true},
    matches: {type: Boolean}
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

   const elementObj = document.querySelector('#' + this.name + 'radarChart')

   console.log('r wh', elementObj.offsetWidth, elementObj.offsetHeight)
   // const baseWidth = Math.min(window.innerWidth, Math.max(700, elementObj.offsetWidth))
   // const baseHeigth = Math.min(window.innerHeight, Math.max(700, elementObj.offsetHeight))

   var margin = {top: 100, right: 100, bottom: 100, left: 100}
   // width = baseWidth - margin.left - margin.right,
   // height = baseHeigth- margin.top - margin.bottom

   //////////////////////////////////////////////////////////////
   //////////////////// Draw the Chart //////////////////////////
   //////////////////////////////////////////////////////////////

   var color = d3.scaleOrdinal()
    .range(this.matches ? [this.primary, this.secondary] : [this.primary]);

   this.radarChartOptions = {
     // w: width,
     // h: height,
     margin: margin,
     maxValue: 6,
     levels: 6,
     roundStrokes: true,
     color: color,
   };
  },
  watch: {
    value: {
      // immediate: true,
      deep: true,
      handler() {
        if (this.value) {
            const value = this.matches ? this.value : [ this.value[0] ]
            console.log(this.name, this.value)
            RadarChart("#" + this.name + "radarChart", value, this.radarChartOptions);
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
