<template>
  <v-container>
    <div class=jobsTitle>
      Skills
    </div>
  <v-data-table
    :headers=headers
    :items=items
    item-key=name
    disable-pagination
    height=400
    fixed-header
    multi-sort
    hide-default-footer
    group-by=category
    sort-by="[catIndex, subCatIndex, name]">

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

    <template v-slot:item.experience="{ item }">
        {{ getExperience(item.experience) }}
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      headers: [
        { class: 'sticky-header', text: "Skill", value: "skill", groupable: false, align: "right"},
        { class: 'sticky-header', text: "Level", value: "level", groupable: true, align: "center"},
        { class: 'sticky-header', text: "Experience in years", value: "experience", groupable: false, align: "center"},
        ],
      items: [ 
      {skill: "Python",                 level: 5, experience: new Date(2013, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "Python 2.7",             level: 4, experience: new Date(2013, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "Python 3.5-3.8",         level: 5, experience: new Date(2015, 7), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "c++ 11, 17",             level: 2, experience: new Date(2016, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "c#",                     level: 2, experience: new Date(2017, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "javascript",             level: 2, experience: new Date(2017, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "shell scripting (bash)", level: 4, experience: new Date(2014, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},
      {skill: "latex",                  level: 4, experience: new Date(2013, 1), category: 'Programming Languages', catIndex: 0, subCatIndex: 0},


      {skill: "tensorflow < 2.0"             , level:  4, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "tensorflow > 2.0"             , level:  3, experience: new Date(2019, 6), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "pytorch"                      , level:  5, experience: new Date(2018, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "Matplotlib"                   , level:  5, experience: new Date(2013, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "multiprocessing"              , level:  4, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "scipy"                        , level:  4, experience: new Date(2013, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "numpy"                        , level:  5, experience: new Date(2013, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "pytest"                       , level:  4, experience: new Date(2019, 1), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "sqlalchemy"                   , level:  2, experience: new Date(2020, 6), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},
      {skill: "fastapi"                      , level:  2, experience: new Date(2020, 6), category: "Frameworks and Libraries", subcategory: "python", catIndex: 1, subCatIndex: 0},

      {skill: "Vue.js"                       , level:  3, experience: new Date(2020, 3), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},
      {skill: "d3.js"                        , level:  2, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},
      {skill: "reveal.js"                    , level:  2, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},
      {skill: "three.js"                     , level:  1, experience: new Date(2017, 1), category: "Frameworks and Libraries", subcategory: "web", catIndex: 1, subCatIndex: 1},

      {skill: "anaconda / miniconda"         , level:  4, experience: new Date(2018, 1), category: "Frameworks and Libraries", subcategory: "container", catIndex: 1, subCatIndex: 2},
      {skill: "docker"                       , level:  1, experience: new Date(2018, 1), category: "Frameworks and Libraries", subcategory: "container", catIndex: 1, subCatIndex: 2},


      {skill: "vim"                   , level: 4, experience: new Date(2015, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "tmux"                  , level: 4, experience: new Date(2016, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "git"                   , level: 4, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "github"                , level: 4, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "bitbucket"             , level: 3, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "travis"                , level: 3, experience: new Date(2013, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "inkscape"              , level: 4, experience: new Date(2008, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "blender"               , level: 2, experience: new Date(2008, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "gimp"                  , level: 3, experience: new Date(2008, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "Unity3D"               , level: 3, experience: new Date(2017, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "google suite"          , level: 4, experience: new Date(2017, 1), category: "Tools", catIndex: 2, subCatIndex: 0},
      {skill: "microsoft office suite", level: 2, experience: new Date(2004, 1), category: "Tools", catIndex: 2, subCatIndex: 0},


      {skill: "Linux - Ubuntu"       , level: 4, experience: new Date(2015, 1), category: "Operating Systems", catIndex: 3, subCatIndex:0},
      {skill: "Windows XP/Vista/7/10", level: 3, experience: new Date(2004, 1), category: "Operating Systems", catIndex: 3, subCatIndex:0},
      {skill: "Mac OS"               , level: 3, experience: new Date(2013, 1), category: "Operating Systems", catIndex: 3, subCatIndex:0},
      ]
    }
  },
  methods: {
    getExperience: function(date) {
      const delta = Date.now() - date
      const year = Math.floor(delta / (1000 * 60 * 60 * 24 * 365))

      if (year > 1) {
        return year
      } else {
        return "< 1"
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

.v-data-table /deep/ .sticky-header {
  position: sticky;
  top: 0;
}

.v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}
</style>
