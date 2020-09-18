<template>
  <div class=CTAContainer>
    <span class="callout">
      Hire me!
    </span>
    <div class=noBullshit>
      <v-btn
        @click=onPdfCvClick
        large
        text
        elevation=0
        :color=secondary
      >
        <v-icon :color="primary">
          mdi-pdf-box
        </v-icon>
        <span class=CTAIcon>
          CV as pdf | You have better things to do!
        </span>
      </v-btn>
    </div>
    <div class=IconBar>
      <v-btn icon @click=onMailClick outlined large :color=primary>
        <v-icon class=CTAIcon >mdi-email</v-icon>
      </v-btn>
      <v-btn icon @click=onLiInClick outlined large :color=primary>
        <v-icon class=CTAIcon>mdi-linkedin</v-icon>
      </v-btn>
      <v-btn icon @click=onXingClick outlined large :color=primary>
        <v-icon class=CTAIcon>mdi-xing</v-icon>
      </v-btn>
      <v-btn icon @click=onGithClick outlined large :color=primary>
        <v-icon class=CTAIcon>mdi-github</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>

import Colors from '@/mixins/Colors.js'

export default {
  mixins: [Colors],
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
    },
    onPdfCvClick() {
      window.open('/cv_johannes.pdf')
    }
  }
}
</script>

<style scoped>
.CTAContainer {
  padding: 3%;
  background-color: var(--secondary);
  color: var(--primary);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 2fr;
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
</style>

<style>
.CTAIcon {
  color: var(--primary) !important;
}
</style>
