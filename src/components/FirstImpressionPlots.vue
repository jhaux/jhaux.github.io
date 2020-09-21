<template>
    <v-container class=firstLookContainer>
        <v-overlay v-if=showHelp>
          <v-card light class=help>
            <v-card-title>
              Additional Info
              <v-spacer />
                <v-btn icon @click="closeHelp">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text v-if=web>
              This Web Plot shows some of my skills and the level of
              proficiency I think I have in them. The scale is from 1 =
              Beginner Level to  6 = Senior Expert.
            </v-card-text>
            <v-card-text v-if=blob>
              This Line Plot shows the number of line of code I have written
              since I started using git. The values displayed are collected
              from all my git repositories private and public using the command
              <code>
              git --author="My Name"  --numstat --pretty=tformat:%ct --all
              </code>.
            </v-card-text>
          </v-card>
        </v-overlay>

      <v-container class=webster>
        <div class="sectionTitle jobsTitle " >
          What I know
        </div>
          <Webster
             name=top
             v-model=selectedAxis
             cap
             />
      </v-container>

      <v-card class=webText>
        <v-card-title>
          Skills
          <v-spacer />
            <v-btn icon href="#data2">
              <v-icon>
                mdi-arrow-down-circle-outline
              </v-icon>
            </v-btn>
          <v-btn icon @click="onHelpClick('web')" >
            <v-icon>
              mdi-help-circle-outline
            </v-icon>
          </v-btn>
        </v-card-title>
          <v-card-text>
            My self-estimated skill level of some of my skills. Find a
            more extensive list below, which you can customize and compare with
            you needs.
          </v-card-text>
      </v-card>

      <v-container class=blobby >
        <div class="sectionTitle jobsTitle" >
          What I do
        </div>
          <Blobby
             name=top
             :width=700
             :height=700
             />
      </v-container>

      <v-card class=blobText>
        <v-card-title>
          Lines of code
          <v-spacer />
          <v-btn icon @click="onHelpClick('blob')">
            <v-icon>
              mdi-help-circle-outline
            </v-icon>
          </v-btn>
        </v-card-title>
          <v-card-text>
            To give you an idea of what my actual coding experience looks like I
            present the number of lines of code I have ever written while using
            git.
          </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
import Webster from './Webster.vue'
import Blobby from './Blobby.vue'

export default {
  props: {
    data: {type: Array, required: true}
  },
  data: function () {
    return {
      selectedAxis: this.data,
      showHelp: false,
      web: false,
      blob: false,
    }
  },
  components: {Webster, Blobby},
  methods: {
    onHelpClick: function (which) {
      this.showHelp = true
      switch (which) {
        case 'web':
          this.web = true
          break
        case 'blob':
          this.blob = true
          break
      }
    },
    closeHelp: function () {
      this.showHelp = false
      this.web = false
      this.blob = false
    }
  },
  watch: {
    data: {
      deep: true,
      handler(changedData) {
        this.selectedAxis = changedData
      }
    }
  }
}
</script>

<style>

.webText {
  grid-area: wtext;
}

.blobText {
  grid-area: btext;
}

.webster {
  grid-area: web;
}

.blobby {
  grid-area: blob;
}

.firstLookContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 80% minmax(auto 20%);
  grid-template-areas:
   "web blob"
   "wtext btext";
  align-content: center;
  gap: 4px;
}

.help {
  margin: auto;
  max-width: 50%;
}

@media (max-width: 1200px) {
  .firstLookContainer {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto 1fr auto;
  grid-template-areas:
   "web"
   "wtext"
   "blob"
   "btext";
  }

    .help {
      max-width: 80%;
    }
}
</style >
