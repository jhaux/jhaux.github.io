<template>
  <div>
    <v-container class=matcherContainer>
      <Webster
        class=matcherWebster
        v-model=value
        name=matcher
        matches
      />
      <v-sheet width="50%" height="50%" :color=secondary class=matcherSeperator /> 
      <div class="matcher" >
        <p>
        Currently I am matching your profile by
        </p>
        <div class=matchValue v-html=matchRender></div>
        <div class=matchText> {{ matchText }} </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Webster from './Webster.vue'

import Colors from '@/mixins/Colors.js'


export default {
  components: {Webster},
  mixins: [Colors],
  props: {
    value: {type: Array, default: () => [[], []]},
    cap: {type: Boolean, default: false},
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
      for (var i = 0; i < N; i++) {
        diff = player2[i].value - player1[i].value
        diff /= 6

        val = 1 - diff
        val = this.cap && diff < 0 ? 1 : val
        matchValues.push( val )
      }

      const matchValue = matchValues.reduce((a, b) => a + b) / N
      let matchVariance = 0
      let dist
      if ( N > 1 ) {
        for (i=0; i < N; i++) {
          dist = Math.pow(matchValues[i] - matchValue, 2)
          matchVariance += dist
        }
        matchVariance = Math.sqrt( matchVariance / (N-1) )
      }

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
      if (this.matchValue[0] >= 90) {
        matchText = 'Its a match! I would love to hear from you!'
      } else if (this.matchValue[0] === '?') {
        matchText = "Choose some of my skills and set your requirements!"
      } else {
        matchText = "Seems I can learn a lot at your company!"
      }
      return matchText
    }
  },
}
</script>

<style>

.matcherContainer {
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  grid-template-rows: 1fr;

  gap: 5px;

  align-items: center;
}

.matcher {
  padding: 3%;
  display: flex;
  flex-direction: column;
}

.matchValue {
  font-size: 72px;
  font-weight: 600;

}

.matcherSeperator {
  justify-self: center;
}

@media (max-width: 1264px) {
  .matcherContainer {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2px auto;
    align-items: center;
    text-align: center;
  }
}
</style>
