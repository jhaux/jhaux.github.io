<template>
  <div>
  <v-app app id="app">
    <v-main app>
      <!-- <DevHelper /> -->
      <TopMatter />
      <FirstImpressionPlots id=data1 :data=selectedAxis />

      <Jobs id=work />

      <Citation>
      "Ford!" he said, "there's an infinite number of monkeys outside who want to
      talk to us about this script for Hamlet they've worked out.”
      <template v-slot:source>
        <span>
        Douglas Adams, The Hitchhiker's Guide to the Galaxy
        </span>
      </template>
      </Citation>

      <Education id=education />

      <Publications id=publication />

      <Activities id=activites />

      <Citation>
          A common mistake that people make when trying to design something
          completely foolproof is to underestimate the ingenuity of complete
          fools.
      <template v-slot:source>
        <span>
          Douglas Adams, Mostly Harmless
        </span>
      </template>
      </Citation>

      <SkillsTable
        id=skillztable
        v-model=selectedSkills
        />

      <div class=interactivePlots>
      <Matcher
        v-model=selectedAxis
        id='data2'
        cap
        matches
      />
      </div>

      <Impressum />
    </v-main>
  </v-app>
  </div>
</template>

<script>
import Jobs from './components/Jobs.vue'
import Education from './components/Education.vue'
import Activities from './components/Activities.vue'
import Citation from './components/Citation.vue'
import Publications from './components/Publications.vue'
import SkillsTable from './components/SkillsTable.vue'
import Matcher from './components/Matcher.vue'
import TopMatter from './components/TopMatter.vue'
import FirstImpressionPlots from './components/FirstImpressionPlots.vue'
import Impressum from './components/Impressum.vue'

export default {
  name: 'app',
  title: 'Johannes Haux | For Hire!',
  components: {
    Jobs,
    Education,
    Activities,
    Citation,
    Publications,
    SkillsTable,
    Matcher,
    TopMatter,
    FirstImpressionPlots,
    Impressum,
  },
  data: function() {
    return {
      selectedSkills: [],
      selectedAxis: [[], []],
    }
  },
  watch: {
    selectedSkills: {
      deep: true,
      immediate: true,
      handler(newValues) {
        const convertedValues = []
        const randomValues = []
        for (var value of newValues) {
          convertedValues.push({axis: value.skill, value: value.level, player: 'J'})
          randomValues.push({axis: value.skill, value: value.required, player: 'O'})
        }
        this.selectedAxis = [convertedValues, randomValues]
      }
    }
  }
}
</script>

<style>
#app {
  background: unset;
}

.interactivePlots {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "web blob";
}

@media (max-width: 900px) {
  .interactivePlots {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
        "web"
        "blob";
  }
}

#data2 {
  grid-area: "web";
  max-height: 100%;
}

#blob {
  grid-area: "blob";
  max-height: 100%;
}
</style>
