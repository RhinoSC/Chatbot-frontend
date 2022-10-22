<template>
  <v-col align="center">
    <h1>Tracker</h1>
    <v-row justify="center" class="mt-5">
      <v-btn color="primary" class="mr-2" link :to="'/tracker/schedule'">Schedule</v-btn>
      <v-btn color="primary" class="mr-2" link :to="'/tracker/bids'">Bids</v-btn>
      <v-btn color="primary" class="mr-2" link :to="'/tracker/donations'">Donations</v-btn>
      <v-btn color="primary" class="mr-2" link :to="'/tracker/prizes'">Prizes</v-btn>
    </v-row>
    <router-view class="mt-10"></router-view>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Event from '@/utils/types/Event'

export default Vue.extend({
  name: 'tracker-view',

  components: {
  },
  data() {
    return {
      events: [] as Event[]
    }
  },
  async created() {
    const res = await trackerEvent.getEvents(this.axios)
    // console.log('llegue')
    // console.log(res)
    this.events = res
  },
  mounted() {
    // console.log('hola')
  }
})
</script>

<style lang="scss">
// .v-application .ml-16 {
//   margin-left: 0 !important;
// }

// .sidebar-component {
//   display: none;
// }
</style>