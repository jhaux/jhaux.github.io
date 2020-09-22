<template>
  <v-container>
    <div class=sectionTitle>
      Skills
    </div>

    <p>
    How well do I match your profile?
    Select the skills you are interested in

    <span v-if="superDense">using the checkbox in the top right of each table
      row</span>
    
    and change the "Required" values to find out. 

    The scale ranges from
    <v-rating
      small
      empty-icon=mdi-checkbox-blank-outline 
      full-icon=mdi-checkbox-blank
      dense
      length=6
      readonly
      :value=1
      class=inlineThingy
      :color=primary
      :background-color=primary
    />
    i.e beginner to 
    <v-rating
      small
      empty-icon=mdi-checkbox-blank-outline 
      full-icon=mdi-checkbox-blank
      dense
      length=6
      readonly
      :value=6
      class=inlineThingy
      :color=primary
    />
    i.e. expert.
    </p>

    <v-data-table
      v-model=selected
      ref=expandableTable
      disable-pagination
      fixed-header
      group-by=category
      :headers=headers
      hide-default-footer
      :items=items
      item-key=skill
      multi-sort
      show-select
      sort-by="[catIndex, subCatIndex, name]"
      >

      <template v-slot:item.level="{ item }">
        <v-rating
          :value="item.level"
          length=6
          empty-icon="mdi-checkbox-blank-outline"
          full-icon="mdi-checkbox-blank"
          dense
          readonly
          >
          <template v-slot:item="props">
              <v-icon
                :class="props.isFilled ? 'filledItem' : 'emptyItem'"
                @click="props.click"
              >
                {{ props.isFilled ? 'mdi-checkbox-blank' : 'mdi-checkbox-blank-outline' }}
              </v-icon>
          </template>
        </v-rating>
      </template>

      <template v-slot:item.required="{ item }">
        <v-rating
          length=6
          empty-icon="mdi-checkbox-blank-outline"
          full-icon="mdi-checkbox-blank"
          dense
          v-model=item.required
          >
          <template v-slot:item="props">
              <v-icon
                :class="props.isFilled ? 'filledItemReq' : 'emptyItemReq'"
                @click="props.click"
              >
                {{ props.isFilled ? 'mdi-checkbox-blank' : 'mdi-checkbox-blank-outline' }}
              </v-icon>
          </template>
        </v-rating>
      </template>

      <template v-slot:item.experience="{ item }">
          {{ getExperience(item.experience) }}
      </template>

      <template v-slot:group.header="{ group, headers, toggle, isOpen }">
        <td :colspan="headers.length">
            <v-btn @click="toggle" small icon :ref="'group-' + group">
                <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
            {{ group }}
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Colors from '@/mixins/Colors.js'

export default {
  mixins: [Colors],
  props: {
    value: {type: Array, default: () => [] }
  },
  data: function () {
    return {
      selected: [],
      headers: [
        { class: 'sticky-header', text: "Skill", value: "skill", groupable: false, align: "right"},
        { class: 'sticky-header', text: "Level", value: "level", groupable: true, align: "center"},
        { class: 'sticky-header', text: "Experience in years", value: "experience", groupable: false, align: "center"},
        { class: 'sticky-header', text: "Required", value: "required", groupable: false, align: "center"},
        ],
      items: [ 
      {skill: "Python",                 selected: true, level: 5, required: 3, experience: new Date(2013, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "Python 2.7",             level: 4, required: 3, experience: new Date(2013, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "Python 3.5-3.8",         level: 5, required: 3, experience: new Date(2015, 7), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "c++ 11, 17",             level: 2, required: 3, experience: new Date(2016, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "c#",                     level: 2, required: 3, experience: new Date(2017, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "javascript",             level: 2, required: 3, experience: new Date(2017, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "shell scripting (bash)", level: 4, required: 3, experience: new Date(2014, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "latex",                  level: 4, required: 3, experience: new Date(2013, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},


      {skill: "tensorflow < 2.0"    , selected: false, level: 4, required: 3, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "tensorflow > 2.0"    , selected: false, level: 3, required: 3, experience: new Date(2019, 6), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "pytorch"             , selected: true,  level: 5, required: 3, experience: new Date(2018, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "Matplotlib"          , selected: true,  level: 5, required: 3, experience: new Date(2013, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "multiprocessing"     , selected: false, level: 4, required: 3, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "scipy"               , selected: false, level: 4, required: 3, experience: new Date(2013, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "numpy"               , selected: false, level: 5, required: 3, experience: new Date(2013, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "pytest"              , selected: false, level: 4, required: 3, experience: new Date(2019, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "sqlalchemy"          , selected: false, level: 2, required: 3, experience: new Date(2020, 6), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "fastapi"             , selected: false, level: 2, required: 3, experience: new Date(2020, 6), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},

      {skill: "Vue.js"              , selected: true,  level: 3, required: 3, experience: new Date(2020, 3), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},
      {skill: "d3.js"               , selected: false, level: 2, required: 3, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},
      {skill: "reveal.js"           , selected: false, level: 2, required: 3, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},
      {skill: "three.js"            , selected: false, level: 1, required: 3, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},

      {skill: "anaconda / miniconda", selected: false, level: 4, required: 3, experience: new Date(2018, 1), category: "Frameworks and Libraries", subcategory: "container", catIndex: 1, subCatIndex: 2},
      {skill: "docker"              , selected: false, level: 1, required: 3, experience: new Date(2018, 1), category: "Frameworks and Libraries", subcategory: "container", catIndex: 1, subCatIndex: 2},


      {skill: "vim"                   , selecetd: true, level: 4, required: 3, experience: new Date(2015, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "tmux"                  , selected: false, level: 4, required: 3, experience: new Date(2016, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "git"                   , selected: true, level: 4, required: 3, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "github"                , selected: false, level: 4, required: 3, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "bitbucket"             , selected: false, level: 3, required: 3, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "travis"                , selected: false, level: 3, required: 3, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "inkscape"              , selected: false, level: 4, required: 3, experience: new Date(2008, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "blender"               , selected: false, level: 2, required: 3, experience: new Date(2008, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "gimp"                  , selected: false, level: 3, required: 3, experience: new Date(2008, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "Unity3D"               , selected: false, level: 3, required: 3, experience: new Date(2017, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "google suite"          , selected: false, level: 4, required: 3, experience: new Date(2017, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "microsoft office suite", selected: false, level: 2, required: 3, experience: new Date(2004, 1), category: "Tools", catIndex: 2, subCatIndex: 0},


      {skill: "Linux - Ubuntu"       , level: 4, required: 3, experience: new Date(2015, 1), category: "Operating Systems", catIndex: 3, subCatIndex:0},
      {skill: "Windows XP/Vista/7/10", level: 3, required: 3, experience: new Date(2004, 1), category: "Operating Systems", catIndex: 3, subCatIndex:0},
      {skill: "Mac OS"               , level: 3, required: 3, experience: new Date(2013, 1), category: "Operating Systems", catIndex: 3, subCatIndex:0},
      ]
    }
  },
  mounted: function() {
    for (var item of this.items) {
      if (item.selected) {
        this.selected.push(item)
      }
    }

    console.log(this.$refs.expandableTable)

    if (this.superDense) {
      this.collapseAllGroups()
    }
  },
  methods: {
    getExperience: function(date) {
      const delta = Date.now() - date
      const year = Math.floor(delta / (1000 * 60 * 60 * 24 * 365))

      if (year >= 1) {
        return year
      } else {
        return "< 1"
      }
    },
    collapseAllGroups: function() {
      Object.keys(this.$refs).forEach(k => {
        if (k.startsWith('group-') ) {
          this.$refs[k].$el.click()
        }
      })
    },
  },
  computed: {
    superDense: function () {
      var x = window.matchMedia("(max-width: 700px)")
      return x.matches
    }
  },
  watch: {
    selected: {
      deep: true,
      handler(newValues) {
        this.$emit('input', newValues)
      }
    }
  }
}
</script>

<style scoped>
.filledItem {
  color: var(--primary);
}

.emptyItem {
  color: var(--primary-var);
}

.filledItemReq {
  color: var(--secondary);
}

.emptyItemReq {
  color: var(--secondary-var);
}

.v-data-table /deep/ .sticky-header,
.v-data-table /deep/ .text-start /* this is super hacky! */
{
  position: sticky;
  top: 64px;
}

.v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}

@media (max-width: 599px) {
.v-data-table /deep/ .text-start /* this is super hacky! */
    {
      position: unset;
    }
}

.inlineThingy {
  display: inline;
}

</style>
