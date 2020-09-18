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
        {name: "Home", link: "#home", icon: "mdi-home"},
        {name: "Data", link: "#data1", icon: "mdi-chart-scatter-plot"},
        {name: "Work Experience", link: "#work", icon: "mdi-briefcase"},
        {name: "Education", link: "#education", icon: "mdi-school"},
        {name: "Publications", link: "#publication", icon: "mdi-file-document"},
        {name: "Activities", link: "#activites", icon: "mdi-nature-people"},
        {name: "Skills", link: "#skillztable", icon: "mdi-head-lightbulb"},
        {name: "Data", link: "#data2", icon:
          "mdi-chart-timeline-variant"},
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

@media (max-width: 900px) {
  .btnName {
    display: none;
  }
}

.toolbarContainer {
}
</style>
