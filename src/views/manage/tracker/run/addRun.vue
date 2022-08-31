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
              <v-col>
                <v-text-field name="estimate" label="Estimate" id="estimate" placeholder="00:00:00"
                  v-model="newRun.estimate">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="setup" label="Setup time" id="setupTime" placeholder="00:00:00"
                  v-model="newRun.setup">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="platform" label="Platform" id="platform" v-model="newRun.platform">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="category" label="Category" id="category" placeholder="any%"
                  v-model="newRun.category">
                </v-text-field>
              </v-col>
              <v-col>
                <v-checkbox label="Is a race?" v-model="isRace"></v-checkbox>
              </v-col>
              <v-col v-if="isRace">
                <v-select :items="teamSizeOpts" label="# of teams" v-model="numOfTeams" @change="teamsSaved = false">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea outlined name="input-7-4" label="Additional info" v-model="newRun.note">
              </v-textarea>
            </v-row>
            <v-row class="mb-5">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <h2>Runners info</h2>
            </v-row>
            <v-row>
              <TeamComponent v-bind="{ numOfTeams: numOfTeams }" @saveTeams="saveTeams($event)"
                @populateTeams="verifyTeams($event)"></TeamComponent>
            </v-row>
            <v-row class="my-8">
              <v-divider></v-divider>
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
import TeamComponent from '@/components/Run/TeamComponent.vue'
import trackerRun from '@/api/marathon/run'
import trackerSchedule from '@/api/marathon/schedule'
import Run from '@/utils/types/Run'
import Team from '@/utils/types/Team'
import Schedule from '@/utils/types/Schedule'
import run from '@/api/marathon/run'


export default Vue.extend({
  name: 'manage-tracker',

  components: {
    TeamComponent
  },
  data() {
    return {
      numOfTeams: 1,
      teamSizeOpts: [1, 2, 3, 4],
      teamsSaved: false,
      isRace: false,
      schedules: [] as Schedule[],
      selectedSchedule: {} as Schedule,
      newRun: {
        name: "",
        start: 0,
        estimate: "",
        estimateS: 0,
        setup: "",
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
      if (!this.teamsSaved) {
        alert('Add runners to all teams and save')
        return
      }

      console.log(this.newRun)
      // if (this.selectedSchedule) {
      //   this.newRun.start = this.selectedSchedule.start
      //   this.newRun.end = this.selectedSchedule.end
      //   if (this.selectedSchedule._id)
      //     this.newRun.scheduleId = this.selectedSchedule._id
      // }
      // const res = await trackerRun.postRun(this.newRun)
      // if (res) {
      //   console.log(res)
      //   // this.$router.push('/manage/tracker/runs')
      // }
    },
    saveTeams($event: Team[]) {
      this.newRun.teams = $event
      this.teamsSaved = true
    },
    verifyTeams($event: boolean) {
      if (!$event)
        this.teamsSaved = false
      else
        this.teamsSaved = true
    }
  },
})
</script>
