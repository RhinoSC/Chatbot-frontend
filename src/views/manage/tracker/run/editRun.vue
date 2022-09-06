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
                  v-model="oldRun.estimate">
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
              <TeamComponent v-bind="{ numOfTeams: numOfTeams, editTeams: oldRun.teams }" @saveTeams="saveTeams($event)"
                @populateTeams="verifyTeams($event)"></TeamComponent>
            </v-row>
            <v-row class="my-8">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <h2>Bids info</h2>
            </v-row>
            <v-row v-if="isReady">
              <BidComponent v-bind="{ gameName: oldRun.name, editBids: oldRun.bids }"
                @populateBids="populateBids($event)" @clearBids="clearBids($event)"></BidComponent>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
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
import trackerRun from '@/api/marathon/run'
import trackerSchedule from '@/api/marathon/schedule'
import Run from '@/utils/types/Run'
import Team from '@/utils/types/Team'
import Schedule from '@/utils/types/Schedule'
import run from '@/api/marathon/run'
import { stringTimeToMS, MStoStringTime } from '@/utils/parsers'
import Bid from '@/utils/types/Bid'


export default Vue.extend({
  name: 'manage-tracker',

  components: {
    TeamComponent,
    BidComponent
  },
  data() {
    return {
      isReady: false,
      numOfTeams: 1,
      teamSizeOpts: [1, 2, 3, 4],
      teamsSaved: false,
      isRace: false,
      schedules: [] as Schedule[],
      selectedSchedule: {} as Schedule,
      setupAsString: "",
      oldRun: {
        _id: "",
        name: "",
        gameTwitch: "",
        start: 0,
        estimate: "",
        estimateS: 0,
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
        estimate: "",
        estimateS: 0,
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

    const run = await trackerRun.getOneRun(this.$route.params.id)

    this.oldRun = run[0]
    const schedule = await trackerSchedule.getOneSchedule(this.oldRun.scheduleId)
    this.selectedSchedule = schedule[0]
    const res = await trackerSchedule.getSchedules()
    this.schedules = res

    this.setupAsString = MStoStringTime(this.oldRun.setup)

    this.oldRun.teams.length > 1 ? this.isRace = true : this.isRace = false
    this.numOfTeams = this.oldRun.teams.length

    this.isReady = true

  },
  methods: {
    async editRun() {
      if (!this.teamsSaved) {
        alert('Add runners to all teams and save')
        return
      }
      this.newRun = this.oldRun
      this.newRun.setup = stringTimeToMS(this.setupAsString)
      this.newRun.estimateS = stringTimeToMS(this.newRun.estimate)
      if (this.selectedSchedule._id)
        this.newRun.scheduleId = this.selectedSchedule._id

      // console.log(this.newRun)

      const res = await trackerRun.updateRun(this.newRun)
      if (res) {
        console.log(res)
        //   this.$router.push('/manage/tracker/schedules')
      }
    },
    saveTeams($event: Team[]) {
      this.oldRun.teams = $event
      this.teamsSaved = true
    },
    verifyTeams($event: boolean) {
      if (!$event)
        this.teamsSaved = false
      else
        this.teamsSaved = true
    },
    populateBids($event: Bid[]) {
      this.oldRun.bids = $event
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
