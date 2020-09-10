<template>
  <div class=CTAContainer>
    <span class="callout">
      Hire me!
    </span>
    <div class=IconBar>
      <v-btn icon @click=onMailClick outlined large>
        <v-icon class=CTAIcon >mdi-email</v-icon>
      </v-btn>
      <v-btn icon @click=onLiInClick outlined large>
        <v-icon class=CTAIcon>mdi-linkedin</v-icon>
      </v-btn>
      <v-btn icon @click=onXingClick outlined large>
        <v-icon class=CTAIcon>mdi-xing</v-icon>
      </v-btn>
      <v-btn icon @click=onGithClick outlined large>
        <v-icon class=CTAIcon>mdi-github</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onMailClick() {
      window.location.href = 'mailto:haux.johannes+hire@gmail.com'
    },
    onLiInClick() {
      window.open('http://www.linkedin.com/in/jhaux')
    },
    onXingClick() {
      window.open('https://www.xing.com/profile/Johannes_Haux/cv')
    },
    onGithClick() {
      window.open('http://www.github.com/jhaux')
    }
  }
}
</script>

<style scoped>
.CTAContainer {
  margin: 3% 0%;
  padding: 3%;
  background-color: var(--primary);
  color: var(--secondary);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  gap: 10% 0px
}

.callout {
  font-size: 32px;
}

.IconBar {
  min-width: 50%;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-evenly;
}

.CTAIcon {
  color: var(--secondary) !important;
}
</style>
