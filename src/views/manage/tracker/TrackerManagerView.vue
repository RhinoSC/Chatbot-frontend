<template>
  <v-col align="center">
    <h1>Tracker manager</h1>
    <v-row justify="center" class="mt-5">
      <v-btn color="info" class="mr-2" link :to="'/manage/tracker/events'">Events</v-btn>
      <v-btn color="info" class="mr-2" link :to="'/manage/tracker/users'">Users</v-btn>
      <v-btn color="info" class="mr-2" link :to="'/manage/tracker/schedules'">Schedules</v-btn>
      <v-btn color="info" class="mr-2" link :to="'/manage/tracker/runs'">Runs</v-btn>
      <v-btn color="info" class="mr-2" link :to="'/manage/tracker/prizes'">Prizes</v-btn>
      <v-btn color="info" class="mr-2" link :to="'/manage/tracker/donations'">Donations</v-btn>
      <!-- <v-btn color="info" class="mr-2" link :to="'/manage/tracker/bids'">Bids</v-btn> -->
    </v-row>
    <router-view class="mt-10"></router-view>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Event from '@/utils/types/Event'

export default Vue.extend({
  name: 'manage-tracker',

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
