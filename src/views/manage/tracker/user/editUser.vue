<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Add User
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="User name" id="userName" v-model="oldUser.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="twitch" label="Twitch username" id="twitch" v-model="oldUser.social.twitch">
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-spacer></v-spacer>
              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="error" v-bind="attrs" v-on="on" class="mr-5" :disabled="true">
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    Delete user {{ oldUser.name }}
                  </v-card-title>
                  <v-card-text>
                    Do you really want to delete this user?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" link @click="deleteUser">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/users'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="editUser">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerUser from '@/api/marathon/user'
import trackerRun from '@/api/marathon/run'
import Run from '@/utils/types/Run'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      deleteDialog: false,
      oldUser: {
        _id: "",
        name: "",
        social: { twitch: "" }
      },
      newUser: {
        _id: "",
        name: "",
        social: { twitch: "" }
      }
    }
  },
  async created() {
    const res = await trackerUser.getOneUser(this.axios, this.$route.params.id)
    this.oldUser = res[0]
  },
  methods: {
    async deleteUser() {
      const res = await trackerUser.deleteUser(this.axios, this.oldUser._id)
      if (res) {
        // console.log(res)
        this.$router.push('/manage/tracker/users')
      }
    },
    async editUser() {

      const runs: Run[] = await trackerRun.getRuns(this.axios)

      this.newUser = this.oldUser

      runs.forEach(async (run) => {
        let update = false
        run.teams = run.teams.map((team) => {
          team.players = team.players.map((player) => {
            if (player._id == this.newUser._id) {
              player = this.newUser
              update = true
            }
            return player
          })
          return team
        })
        if (update) {
          // console.log(run, update)
          await trackerRun.updateRunWithBidsAndTeams(this.axios, run)
        }
      })

      const res = await trackerUser.updateUser(this.axios, this.newUser)
      if (res) {
        // console.log(res)
        this.$router.push('/manage/tracker/users')
      }
    },
  },
})
</script>
