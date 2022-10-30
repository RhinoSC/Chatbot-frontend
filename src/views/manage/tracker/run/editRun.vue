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
                <v-text-field name="name" label="Run name" id="runName" v-model="oldRun.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="gameTwitch" label="Twitch category" id="gameName" v-model="oldRun.gameTwitch">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="schedules" item-text="name" return-object label="Schedule" v-model="selectedSchedule">
                </v-select>
              </v-col>
              <v-col>
                <v-text-field name="estimate" label="Estimate" id="estimate" placeholder="00:00:00"
                  v-model="oldRun.estimateS">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="setup" label="Setup time" id="setupTime" placeholder="00:00:00"
                  v-model="setupAsString">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="platform" label="Platform" id="platform" v-model="oldRun.platform">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="category" label="Category" id="category" placeholder="any%"
                  v-model="oldRun.category">
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
              <v-textarea outlined name="input-7-4" label="Additional info" v-model="oldRun.note">
              </v-textarea>
            </v-row>
            <v-row class="mb-5">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <h2>Runners info</h2>
            </v-row>
            <v-row v-if="isReady">
              <TeamComponent v-bind="{ numOfTeams: numOfTeams, editTeams: oldRun.teams }"
                @saveTeams="saveTeams($event)"></TeamComponent>
            </v-row>
            <v-row class="my-8">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <h2>Bids info</h2>
            </v-row>
            <v-row v-if="isReady">
              <BidComponent
                v-bind="{ gameName: oldRun.name, editBids: oldRun.bids, currency: event.isCharityData.paypalData.currency }"
                @populateBids="populateBids($event)" @clearBids="clearBids($event)"></BidComponent>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="error" v-bind="attrs" v-on="on" class="mr-5">
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    Delete schedule {{ oldRun.name }}
                  </v-card-title>
                  <v-card-text>
                    Do you really want to delete this run?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" link @click="deleteRun">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/runs'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="editRun">Save</v-btn>
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
import BidComponent from '@/components/Run/BidComponent.vue'
import trackerEvent from '@/api/marathon/event'
import trackerRun from '@/api/marathon/run'
import trackerSchedule from '@/api/marathon/schedule'
import Team from '@/utils/types/Team'
import Schedule from '@/utils/types/Schedule'
import { stringTimeToMS, MStoStringTime } from '@/utils/stringFuncs'
import Bid from '@/utils/types/Bid'
import Event from '@/utils/types/Event'


export default Vue.extend({
  name: 'manage-tracker',

  components: {
    TeamComponent,
    BidComponent
  },
  data() {
    return {
      deleteDialog: false,
      isReady: false,
      numOfTeams: 1,
      teamSizeOpts: [1, 2, 3, 4],
      teamsSaved: false,
      isRace: false,
      schedules: [] as Schedule[],
      selectedSchedule: {} as Schedule,
      setupAsString: "",
      event: {} as Event,
      oldRun: {
        _id: "",
        name: "",
        gameTwitch: "",
        start: 0,
        estimate: 0,
        estimateS: "",
        setup: 0,
        teams: [] as Team[],
        bids: [] as Bid[],
        scheduleId: "",
        category: "",
        platform: "",
        note: "",
      },
      newRun: {
        _id: "",
        name: "",
        gameTwitch: "",
        start: 0,
        estimate: 0,
        estimateS: "",
        setup: 0,
        teams: [] as Team[],
        bids: [] as Bid[],
        scheduleId: "",
        category: "",
        platform: "",
        note: "",
      }
    }
  },
  async created() {

    try {
      const resEvent = await trackerEvent.getEvents(this.axios)
      this.event = resEvent.find((event: { name: any }) => event.name === process.env.VUE_APP_EVENT)

      const run = await trackerRun.getOneRun(this.axios, this.$route.params.id)

      this.oldRun = run[0]
      const schedule = await trackerSchedule.getOneSchedule(this.axios, this.oldRun.scheduleId)
      this.selectedSchedule = schedule[0]
      const res = await trackerSchedule.getSchedules(this.axios)
      this.schedules = res

      this.setupAsString = MStoStringTime(this.oldRun.setup)

      this.oldRun.teams.length > 1 ? this.isRace = true : this.isRace = false
      this.numOfTeams = this.oldRun.teams.length

      this.isReady = true
    } catch (error) {
      console.error(error)
      // this.$router.push('/manage/tracker/runs')
    }
  },
  methods: {
    async deleteRun() {
      const res = await trackerRun.deleteRun(this.axios, this.oldRun._id)
      if (res) {
        // console.log(res)
        this.$router.push('/manage/tracker/runs')
      }
    },
    async editRun() {
      this.verifyTeams()
      if (!this.teamsSaved) {
        alert('Add runners to all teams and save')
        return
      }
      this.newRun = this.oldRun
      this.newRun.setup = stringTimeToMS(this.setupAsString)
      this.newRun.estimate = stringTimeToMS(this.newRun.estimateS)
      console.log(this.newRun.bids)
      if (this.selectedSchedule._id)
        this.newRun.scheduleId = this.selectedSchedule._id
      const res = await trackerRun.updateRunWithBidsAndTeams(this.axios, this.newRun)
      if (res) {
        this.$router.push('/manage/tracker/runs')
      }
    },
    saveTeams($event: Team[]) {
      this.oldRun.teams = $event
      this.teamsSaved = true
    },
    verifyTeams() {
      this.teamsSaved = true
      if (this.oldRun.teams.length !== this.numOfTeams) {
        this.teamsSaved = false
        return
      }

      for (let i = 0; i < this.oldRun.teams.length; i++) {
        if (this.oldRun.teams[i].players.length < 1) {
          this.teamsSaved = false
          return
        }
      }
    },
    populateBids($event: Bid[]) {
      this.oldRun.bids = $event
      this.oldRun.bids.forEach(bid => {
        bid.runId = this.oldRun._id
        bid.eventId = this.event._id ? this.event._id : ""
      })
    },
    clearBids($event: boolean) {
      this.oldRun.bids = []
    }
  },
  watch: {
    isRace() {
      if (!this.isRace) {
        this.numOfTeams = 1
      }
    }
  }
})
</script>
