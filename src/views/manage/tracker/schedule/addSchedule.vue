<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Add Schedule
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="events" item-text="name" return-object label="Event" v-model="selectedEvent">
                </v-select>
              </v-col>
              <v-col>
                <v-text-field name="name" label="Schedule name" id="scheduleName" v-model="newSchedule.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="defaultSetup" label="Default setup time" id="defaultSetup"
                  v-model="defaultSetupAsString">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/schedules'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="addSchedule">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerSchedule from '@/api/marathon/schedule'
import trackerEvent from '@/api/marathon/event'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'
import { stringTimeToMS } from '@/utils/stringFuncs'
import ScheduleRow from '@/utils/types/ScheduleRow'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      defaultSetupAsString: "",
      events: [] as Event[],
      selectedEvent: {} as Event,
      newSchedule: {
        name: "",
        start: 0,
        end: 0,
        rows: [] as ScheduleRow[],
        availableRuns: [] as Run[],
        eventId: "",
        defaultSetup: 0
      }
    }
  },
  async created() {
    const res = await trackerEvent.getEvents()
    this.events = res
  },
  methods: {
    async addSchedule() {
      if (this.selectedEvent) {
        this.newSchedule.start = this.selectedEvent.start
        this.newSchedule.end = this.selectedEvent.end
        if (this.selectedEvent._id)
          this.newSchedule.eventId = this.selectedEvent._id
      }

      this.newSchedule.defaultSetup = stringTimeToMS(this.defaultSetupAsString)
      // console.log(this.newSchedule)
      const res = await trackerSchedule.postSchedule(this.newSchedule)
      if (res) {
        console.log(res)
        this.$router.push('/manage/tracker/schedules')
      }
    },
  },
})
</script>
