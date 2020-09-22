<template>
<div class=toolbarContainer>
    <v-sheet height=1px :color=primary />
    <v-toolbar fixed :color=bgColor>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-for="(item, i) of navItems"
          :key="'nav_' + i"
          :href="item.link"
          text
          :color=bgColor
          class=CTAIcon
          :class=importanceClass(item.importance)
          >
          <v-icon class=CTAIcon>
            {{ item.icon }}
          </v-icon>
          <span class=btnName>
            {{ item.name }}
          </span>
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
    </v-toolbar>
</div>
</template>

<script>
import Colors from '@/mixins/Colors.js'

export default {
  mixins: [Colors], 
  data: function () {
    return {
      navItems: [
        {name: "Home",            link: "#home",        importance: 1, icon: "mdi-home"},
        {name: "Data",            link: "#data1",       importance: 1, icon: "mdi-chart-timeline-variant"},
        {name: "Work Experience", link: "#work",        importance: 0, icon: "mdi-briefcase"},
        {name: "Education",       link: "#education",   importance: 0, icon: "mdi-school"},
        {name: "Publications",    link: "#publication", importance: 1, icon: "mdi-file-document"},
        {name: "Activities",      link: "#activites",   importance: 0, icon: "mdi-nature-people"},
        {name: "Skills",          link: "#skillztable", importance: 1, icon: "mdi-table-large"},
        {name: "Data",            link: "#data2",       importance: 0, icon: "mdi-radar"},
      ],
      collapsed_: true,
      scrollPos: 0
    }
  },
  computed: {
    collapsed: function () {
      return this.collapsed_
    },
    bgColor: function() {
      const style = getComputedStyle(document.body)
      // const color1 = style.getPropertyValue('--primary')
      const color = style.getPropertyValue('--secondary-color')
      const color2 = 'rgba(' + color + ', 1.0)'

      return color2
    }
  },
  methods: {
    importanceClass: function (importance) {
      return importance > 0 ? null : 'unimportantButton'
    }
  },
  mounted: function() {
    window.addEventListener('scroll', function() {
      this.scrollPos = window.scrollY
    })
  }
}
</script>

<style>
.btnName {
  margin: 2px;
}

@media (max-width: 1200px) {
  .btnName {
    display: none;
  }
}

@media (max-width: 530px) {
  .unimportantButton {
    display: none;
  }
}

.toolbarContainer {
}
</style>

<style scoped>
</style>
