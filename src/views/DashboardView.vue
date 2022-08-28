<template>
  <div>
    <h1>Admin page</h1>
    <p>Este contenido se renderiza en las dos páginas</p>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'tracker-view',

  components: {
  },
})
</script>
