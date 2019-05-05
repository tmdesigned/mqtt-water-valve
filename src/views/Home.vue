<template>
  <div class="home">
    <WaterValve />
  </div>
</template>

<script>
// @ is an alias to /src
import WaterValve from '@/components/WaterValve.vue'

export default {
  name: 'home',
  components: {
    WaterValve
  }
}
</script>
