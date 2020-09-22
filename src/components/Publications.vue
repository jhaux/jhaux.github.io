<template>
  <Timeless title="Publications" :items=jobs></Timeless>
</template>

<script>
import Timeless from './Timeless.vue'

export default {
  components: {Timeless},
  data: function () {
    return {
      jobs: [
        {
          time: '2019',
          name: {
            link: "https://compvis.github.io/robust-disentangling/",
            name: `Unsupervised Robust Disentangling Of Latent Characteristics
                 For Image Synthesis`
          },
          employer: {link: "https://arxiv.org/pdf/1910.10223", name: "[pdf]"},
          description: [],
          image: 'https://media.githubusercontent.com/media/jhaux/jhaux.github.io/master/files/page-1-of-1910-10233.png'
        },
        {
          time: '2018',
          name: {
            link: "https://compvis.github.io/hbugen2018/",
            name: "Towards Learning A Realistic Rendering Of Human Behavior"
          },
          employer: {
            link: "https://compvis.github.io/hbugen2018/images/rerender.pdf",
            name: "[pdf]"
          },
          description: [],
          image: 'https://media.githubusercontent.com/media/jhaux/jhaux.github.io/master/files/page-1-of-rerender.pdf.png'
        },
        {
          time: "2018",
          name: {
            name: `Master Thesis: DRAMA - Understanding and Advancing the Deep
                Recurrent Attention Model`,
            link: "https://drive.google.com/open?id=1fKd6-YajT6kZAgjw3t-XL9FmO8jfjsJS"
          },
          employer: {
            link: "https://drive.google.com/open?id=1fKd6-YajT6kZAgjw3t-XL9FmO8jfjsJS",
            name: "[pdf]"
          },
          description: [],
          image: 'https://media.githubusercontent.com/media/jhaux/jhaux.github.io/master/files/page-44-of-thesis.png'
        },
        {
          time: "2015",
          name: {
            name: "Bachelor Thesis: Density induced transport in a Hele-Shaw Cell",
            link: "http://ts.iup.uni-heidelberg.de/research/the-lode/#c1448"
          },
          employer: {
            link: "http://ts.iup.uni-heidelberg.de/fileadmin/user_upload/Johannes_Haux/15-haux-johannes.pdf",
            name: "[pdf]"
          },
          description: [],
          image: 'https://media.githubusercontent.com/media/jhaux/jhaux.github.io/master/files/page-18-of-15-haux-johannes.png'
        }
        ]
    }
  }
}
</script>
