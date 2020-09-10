<template>
  <div>
  <v-app app id="app">

    <TheSidebar />
    <v-main app>
      <!-- <DevHelper /> -->
    <TitleCard id=home></TitleCard>

    <CallToAction></CallToAction>
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
    <SkillsTable id=skillztable />
    </v-main>
  </v-app>
  </div>
</template>

<script>
import TitleCard from './components/TitleCard.vue'
import Jobs from './components/Jobs.vue'
import Education from './components/Education.vue'
import Activities from './components/Activities.vue'
import Citation from './components/Citation.vue'
import TheSidebar from './components/TheSidebar.vue'
import Publications from './components/Publications.vue'
import SkillsTable from './components/SkillsTable.vue'
import CallToAction from './components/CallToAction.vue'

// import DevHelper from './components/DevHelper.vue'

export default {
  name: 'app',
  components: {TitleCard, Jobs, Education, Activities, Citation, TheSidebar,
    Publications, SkillsTable, CallToAction,
    //DevHelper
  },
}
</script>

<style>
#app {
  background: unset;
}
</style>
