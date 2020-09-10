<template>
  <div class=helper>
    <v-container :style="{background: 'var(--primary)', height: '50px', width: '50px'}">
    </v-container>
    <v-container :style="{background: 'var(--primary-var)', height: '50px', width: '50px'}">
    </v-container>
    <v-container :style="{background: 'var(--secondary)', height: '50px', width: '50px'}">
    </v-container>
    <v-container :style="{background: 'var(--secondary-var1)', height: '50px', width: '50px'}">
    </v-container>
    <v-container :style="{background: 'var(--secondary-var2)', height: '50px', width: '50px'}">
    </v-container>
  </div>
</template>
<script>
export default {
}
</script>

<style>
.helper {
  position: fixed;
  top: 0;
  display: flex;
}
</style>
