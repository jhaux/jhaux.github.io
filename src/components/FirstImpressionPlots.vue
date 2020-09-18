<template>
    <div class=firstLookContainer>
      <div class="sectionTitle jobsTitle impressionHeader">
        What I know
      </div>
      <Webster
          name=top
          v-model=selectedAxis
          cap
          class=impressionContent
      />

      <div class="sectionTitle jobsTitle impressionHeader">
        What I do
      </div>
      <Blobby
          name=top
          class=impressionContent
      />
    </div>
</template>

<script>
import Webster from './Webster.vue'
import Blobby from './Blobby.vue'

export default {
  props: {
    data: {type: Array, required: true}
  },
  data: function () {
    return {
      selectedAxis: this.data
    }
  },
  components: {Webster, Blobby},
  watch: {
    data: {
      deep: true,
      handler(changedData) {
        this.selectedAxis = changedData
      }
    }
  }
}
</script>

<style>

.impressionHeader {
  grid-row: 1 / 2;
}

.impressionContent {
  grid-row: 2 / 3;
}

.firstLookContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 10fr;
  align-content: center;
  gap: 4px;
}
</style>
