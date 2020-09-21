<template>
  <v-container class=jobContainer>
    <div class="jobsTitle sectionTitle" > {{ title }}</div>
    <v-list v-if=superDense>
      <v-list-item
        v-for="(item, i) of items"
        :key="i"
        :color="null"
        class=superDenseListItem
        >
          <v-list-item-content class=list__content>
            <v-list-item-title class=list__title>
              {{ item.time }}:
              <div class=superDenseJobName>
                <a v-if="typeof(item.name) === 'object'" :href=item.name.link>
                  {{item.name.name}}
                </a>
                <div v-else>
                {{ item.name }}
                </div>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle class=list__subtitle>
              <a v-if="typeof(item.employer) === 'object'" :href=item.employer.link>
                  {{ item.employer.name }}
              </a>
              <span v-else>{{ item.employer }}</span>
            </v-list-item-subtitle>
              <v-list dense>
                <v-list-item v-for="(item, i) of item.description" :key="i">
                  {{item}}
                </v-list-item>
              </v-list>
          </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-timeline
        v-else
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
            <a v-if="typeof(item.name) === 'object'" :href=item.name.link>
              {{item.name.name}}
            </a>
            <div v-else>
            {{ item.name }}
            </div>
            <v-spacer v-if=dense></v-spacer>
            <div v-if=dense> {{ item.time }} </div>
          </v-card-title>
          <v-card-subtitle class=list__subtitle>
            <a v-if="typeof(item.employer) === 'object'" :href=item.employer.link>
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
      var x = window.matchMedia("(max-width: 900px)")
      return x.matches
    },
    superDense: function () {
      var x = window.matchMedia("(max-width: 550px)")
      return x.matches
    }
  }
}
</script>

<style>
.jobsTitle {
  font-size: 4em;
  font-weight: 700;
  margin-top: 5%;
  margin-bottom: 5%;
}

.jobContainer {
  margin-top: 5%;
}

.v-timeline-item__dot .v-timeline-item__inner-dot {
  background-color: var(--primary) !important;
}

.list__content {
}

.superDenseListItem {
  margin: 16px;
  padding: 8px;
  box-shadow: 2px 5px 7px rgba(0,0,0,0.2);
}

.superDenseJobName {
  font-weight: 600;
  white-space: pre-line;
}
</style>
