<template>
  <div class="citationContainer">
      <div class=spacer></div>
    <div class="content">
      <div class=citation>
    <slot>Citation</slot>
      </div>
    <div class="source">
    - <slot name=source>Citation Source</slot>
    </div>
    </div>
      <div class=spacer></div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.citationContainer{
  display: flex;
  margin: 1% 0%;
}

.spacer {
  background: var(--primary);
}

.content {
  display: flex;
  flex-direction: column;
  max-width: 60%;
  margin: 0% 5%;
}

.citation {
  font-size: 32px;
  font-weight: 300;
  font-style: italic;
}

.source {
  font-size: 11px;
  font-weight: 300;
  font-style: italic;
  max-width: 60%;
}

@media (max-width: 900px) {
    .citation {
      font-size: 16px;
    }
    
    .source {
      font-size: 9px;
    }
}
</style>
