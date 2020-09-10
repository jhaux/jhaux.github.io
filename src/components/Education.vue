<template>
  <Timeless title="Education" :items=jobs></Timeless>
</template>

<script>
import Timeless from './Timeless.vue'

export default {
  components: {Timeless},
  data: function () {
    return {
      jobs: [
      {
        time: '2015-2018',
        name: "Master of Science Physics - 1.4",
        employer: {
          link: "https://www.physik.uni-heidelberg.de/",
          name: "Universität Heidelberg"
        },
        description: [
             "Focus on computer vision and artificial intelligence"
        ]
      },
      {
        time: "2011-2015",
        name: "Bachelor of Science Physics - 2.2",
        employer: {
          link: "https://www.physik.uni-heidelberg.de/",
          name: "Universität Heidelberg"
        },
        description: [
              "Thesis in environmental physics"
        ]
      },
      {
        time: "2013",
        name: "Erasmus Internship",
        employer: {linke: "http://www.iaa.es/", name: "IAA-CSIC Granada"},
        description: [
          "Analysis of asteroid spectra searching for traces of water"
        ]
      },
      {
        time: "2000-2009",
        name: "Gymnasium, Abitur -1.9",
        emplyer: "Germany",
        description: [
            "Intensified courses: Mathematics and English"
          ]
      }
        ]
    }
  }
}
</script>
