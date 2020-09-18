<template>
  <div class=heroContainer>
    <TitleCard
        id=home
    />

    <CallToAction 
    />

    <TheAppBar class="sticky" />
  </div>
</template>

<script>
import TitleCard from './TitleCard.vue'
import TheAppBar from './TheAppBar.vue'
import CallToAction from './CallToAction.vue'

import Sticky from 'sticky-js'

export default {
  components: {
    TitleCard,
    TheAppBar,
    CallToAction
  },
  mounted: function () {
    new Sticky('.sticky', {'stickyClass': 'stuck'})
  }
}
</script>

<style scoped>
.heroContainer {
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr auto;
}

.sticky {
  /*
  position: sticky;
  top: 0;
  */
  z-index: 1000;
}
</style>
