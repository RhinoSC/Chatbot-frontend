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
                <v-text-field name="name" label="User name" id="userName" v-model="newUser.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="twitch" label="Twitch username" id="twitch" v-model="newUser.social.twitch">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/users'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="addUser">Save</v-btn>
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
import trackerSchedule from '@/api/marathon/schedule'
import User from '@/utils/types/User'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      newUser: {
        name: "",
        teamId: "",
        social: { twitch: "" }
      }
    }
  },
  methods: {
    async addUser() {
      const res = await trackerUser.postUser(this.newUser)
      if (res) {
        console.log(res)
        this.$router.push('/manage/tracker/users')
      }
    },
  },
})
</script>
