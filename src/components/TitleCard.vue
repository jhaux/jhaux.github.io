<template>
  <div class=titleContainer ref="container" >
    <div ref="T1" class="titleHeader" >
      Johannes Haux
    </div>
    <div ref="T2" class="titleSubHeader" >
      Computer Vision | Data Science | python | javascript
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.titleContainer {
  /* position: relative;*/
  z-index: -1;
  background-image: linear-gradient(
        rgba(var(--secondary-color), 0.0) 0%,
        rgba(var(--secondary-color), 0.0) 45%,
        rgba(var(--secondary-color), 1.0) 100%
    ), url(https://media.githubusercontent.com/media/jhaux/jhaux.github.io/master/public/slovakia.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  text-align: center;
}

.titleHeader, .titleSubHeader {
  position: relative;
  z-index: 100;
  color: var(--primary);
  top: 45%;
}

.titleHeader {
  font-size: 6rem;
  font-weight: 700;
}

.titleSubHeader {
  font-size: 1.5rem;
  font-weight: 400;
  padding-top: 3%
}

@media (max-width: 900px) {
  .titleHeader {
    font-size: 64px;
  }
  .titleSubHeader {
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .titleHeader {
    font-size: 36px;
  }
  .titleSubHeader {
    font-size: 14px;
  }
}

</style>
