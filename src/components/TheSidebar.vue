<template>
  <v-navigation-drawer
    app
    :mini-variant=collapsed
    >
    <v-list
      dense
      nav
      >
      <v-list-item
        key=menu
        >
        <v-list-item-icon
        @click="collapsed_ = !collapsed_"
        >
          <v-icon>
          mdi-menu
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Johannes Haux</v-list-item-title>
          <v-list-item-subtitle>For hire!</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="(item, i) of navItems"
        :key="'nav_' + i"
        link
        :href="item.link"
        >
        <v-list-item-icon>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> {{ item.name }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: function () {
    return {
      navItems: [
        {name: "Work Experience", link: "#work", icon: "mdi-briefcase"},
        {name: "Education", link: "#education", icon: "mdi-school"},
        {name: "Publications", link: "#publication", icon: "mdi-file-document"},
        {name: "Activities", link: "#activites", icon: "mdi-nature-people"},
        {name: "Skills", link: "#skillztable", icon: "mdi-head-lightbulb"},
      ],
      collapsed_: true
    }
  },
  computed: {
    collapsed: function () {
      return this.collapsed_
    }
  }
}
</script>

<style scoped>
</style>
