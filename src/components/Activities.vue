<template>
  <Timeless title="Other Activites" :items=jobs></Timeless>
</template>

<script>
import Timeless from './Timeless.vue'

export default {
  components: {Timeless},
  data: function () {
    return {
      jobs: [
        {
          time: 'since 2018',
          name: "Co-developer of an open source framework",
          employer: {
            link: "https://github.com/pesser/edflow",
            name: "edflow"
          },
          description: [
            "Data driven framework for training machine learning algorithms",
            "Active developement with weekly team meetings",
            "Documentation, tests and CI/CD"
          ]
        },
        {
          time: "2018-2020",
          name: "Cash Auditor",
          employer: {link: "http://www.vega-astro.de/", name: "VEGA e.V."}, 
          description: [
            "Yearly cash audition with report to the assembly"
            ]
        },
        {
          time: "2008-2013",
          name: "Workshop Organization",
          employer: {
            link: "http://www.vega-astro.de",
            name: "Astronomics Summer School"
          },
          description: [
            `Organisation of a workshop tasked with creating a short film
            within two weeks`,
            `Creative coordination to funnel the ideas of up to 20
            participants into a movie`,
            `Technical support`
            ]
        },
        ]
    }
  }
}
</script>
