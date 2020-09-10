<template>
  <div class=titleContainer ref="container" >
    <div ref="T1" class=titleHeader >Johannes Haux</div>
    <div ref="T2" class=titleSubHeader >Computer Vision | Data Science | python | javascript</div>
    <TheImpactor :key="'title'" class=impactor ref=impactor />
  </div>
</template>

<script>
import TheImpactor from './TheImpactor.vue'

export default {
  components: {TheImpactor},
  mounted: function () {
    const impactor = this.$refs.impactor.$el

    window.addEventListener('scroll', function () {
      const value = window.scrollY
      impactor.style.top = value * 0.25 + 'px'
    })
  }
}
</script>

<style scoped>
.titleContainer {
  position: relative;
  height: 100vh;
  z-index: -1;
}

.impactor {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
}

.titleHeader, .titleSubHeader {
  z-index: 100;
  color: var(--primary);
}

.titleHeader {
  margin-top: 45%;
  margin-left: 5%;
  font-weight: 700;
  font-size: 8em;
  padding: 0px 15px;
}

.titleSubHeader {
  margin-top: 10%;
  margin-left: 15%;
  font-weight: 400;
  font-size: 2em;
  padding: 0px 15px;
}
</style>
