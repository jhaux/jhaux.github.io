<template>
  <div>
    <div :id="name + 'radarChart'" class=radarChart />
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
  mounted: function() {
   /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

   //////////////////////////////////////////////////////////////
   //////////////////////// Set-Up //////////////////////////////
   //////////////////////////////////////////////////////////////

   var margin = {top: 100, right: 100, bottom: 100, left: 100}

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

.radarChart {
  height: 80%;
}

.radarChart > svg {
  max-height: 100%;
  width: auto;
}

@media (max-width: 1904px) {
  .axisLabel {
    font-size: 20px !important;
  }

  .legend {
    font-size: 20px !important;
  }
}

@media (max-width: 1264px) {
  .axisLabel {
    font-size: 14px !important;
  }

  .legend {
    font-size: 14px !important;
  }
}

@media (max-width: 700px) {
  .axisLabel {
    font-size: 20px !important;
  }

  .legend {
    font-size: 20px !important;
  }
}

</style>
