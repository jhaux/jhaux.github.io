<template>
  <v-container class=jobContainer>
    <div class="jobsTitle sectionTitle" > {{ title }}</div>
    <v-timeline
        :dense=dense
        >
      <v-timeline-item
        v-for="(item, i) of items"
        :key="i"
        right
        :color="null"
        >
        <v-card>
          <v-card-title class=list__title>
            <a v-if="typeof(item.name) === 'object'" href=item.name.link>
              {{item.name.name}}
            </a>
            <div v-else>
            {{ item.name }}
            </div>
            <v-spacer v-if=dense></v-spacer>
            <div v-if=dense> {{ item.time }} </div>
          </v-card-title>
          <v-card-subtitle class=list__subtitle>
            <a v-if="typeof(item.employer) === 'object'" href=item.employer.link>
                {{ item.employer.name }}
            </a>
            <span v-else>{{ item.employer }}</span>
          </v-card-subtitle>
          <v-card-text class=list__body>
            <v-list dense>
              <v-list-item v-for="(item, i) of item.description" :key="i">
                {{item}}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <div slot=opposite >{{ item.time }}</div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {type: String, required: true},
    items: {type: Array, default: () => [] }
  },
  computed: {
    dense: function () {
      return true
    }
  }
}
</script>

<style>
.jobsTitle {
  font-size: 4em;
  font-weight: 700;
  font-style: italic;
  margin-top: 5%;
  margin-bottom: 5%;
}

.jobContainer {
  margin-top: 5%;
  width: 75%;
  /* min-height: 100vh; */
}

.v-timeline-item__dot .v-timeline-item__inner-dot {
  background-color: var(--primary) !important;
}
</style>
