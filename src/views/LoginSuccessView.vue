<template>
  <!-- <hello-world /> -->
  <v-container grid-list-xs class="d-flex align-center justify-center mt-15">
    Success
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'login-success-view',
  mounted() {
    const roles = ["Admin"]

    const multipleExist = this.$auth.user['sre9/roles'].every((value: string) => {
      return roles.includes(value);
    });
    
    if (multipleExist)
      this.$router.push('/manage/tracker')
    else
      this.$router.push('/tracker')
  },
})
</script>
