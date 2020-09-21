<template>
  <div class=impressumContainer>
    <CTA />
    <div class=impressumTitle >
      <div>
      Johannes Haux
      </div>
    </div>
    <a class=impressumText href="mailto:haux.johannes+hire@gmail.com" >
      haux.johannes+hire@gmail.com
    </a>
  </div>
</template>

<script>
import Colors from '@/mixins/Colors.js'
import CTA from './CallToAction.vue'

export default {
  mixins: [Colors],
  components: {CTA}
}
</script>

<style>
.impressumContainer {
  width: 100%;
  padding: 10px;
  color: var(--primary);
  background: var(--secondary);

  display: flex;
  flex-direction: column;

  align-items: center;
}

.impressumTitle {
  font-size: 46px;
  font-weight: 600;
  display: flex;
  align-content: center;
  justify-content: center;
}

.impressumTitle > div {
  margin: 0px 25px;
}

.jIcon {
  margin: 0px 5px;
}

.impressumText {
  color: var(--primary-var) !important; 
}
</style>
