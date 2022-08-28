<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Add Run
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="Run name" id="runName" v-model="newRun.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-select :items="schedules" item-text="name" return-object label="Schedule" v-model="selectedSchedule">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/runs'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="addRun">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerRun from '@/api/marathon/run'
import trackerSchedule from '@/api/marathon/schedule'
import Run from '@/utils/types/Run'
import Team from '@/utils/types/Team'
import Schedule from '@/utils/types/Schedule'
import run from '@/api/marathon/run'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      schedules: [] as Schedule[],
      selectedSchedule: {} as Schedule,
      newRun: {
        name: "",
        start: 0,
        estimate: "",
        estimateS: 0,
        setup: 0,
        teams: [] as Team[],
        bids: [] as string[],
        scheduleId: "",
        category: "",
        platform: "",
        note: "",
      }
    }
  },
  async created() {
    const res = await trackerSchedule.getSchedules()
    this.schedules = res
  },
  methods: {
    async addRun() {
      // if (this.selectedSchedule) {
      //   this.newRun.start = this.selectedSchedule.start
      //   this.newRun.end = this.selectedSchedule.end
      //   if (this.selectedSchedule._id)
      //     this.newRun.scheduleId = this.selectedSchedule._id
      // }
      // console.log(this.newRun)
      const res = await trackerRun.postRun(this.newRun)
      if (res) {
        console.log(res)
        this.$router.push('/manage/tracker/runs')
      }
    },
  },
})
</script>
