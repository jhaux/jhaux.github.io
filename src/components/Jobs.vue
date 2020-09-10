<template>
  <Timeless title="Work Experience" :items=jobs></Timeless>
</template>

<script>
import Timeless from './Timeless.vue'

export default {
  components: {Timeless},
  data: function () {
    return {
      jobs: [
        {
          time: "2018 - 2020",
          name: "Scientific Assistant",
          employer: {link: "https://hciweb.iwr.uni-heidelberg.de/", name: "HCI - University of Heidelberg"},
          description: [
            "Behaviour understanding using deep learning methods",
            "Cooperation with the Computer Vision Group at Robert, Bosch GmbH",
            `Tutor of students during their master or bachelor thesis and of
            practicals`,
            "Establishment and moderation of a weekly student seminar",
            `Stimulation of group internal code exchange through a joint
            software project`,
            ]
        },
        {
          time: "since 2011",
          name: "Member of Team \"Klasse! Wir singen\"",
          employer: {
            link: "www.klasse-wir-singen.de", name: "Klasse! Wir singen"
          },
          description: [
            'Head and coordinator of helper teams of 12 - 50 persons',
            `Job of each team is to ensure the safety of 2000 - 6000 children
            per event for several events over the course of one day`,
            `Klasse! Wir singen % is an annual cultural event, occuring all
            over Germany`
            ]
        },
        {
          time: "2011-2013",
          name: "Freelancer",
          employer: "jomotion",
          description: [
            `Creation of corporate and event films, as well es
            event photography`
            ]
        }
        ]
    }
  }
}
</script>
