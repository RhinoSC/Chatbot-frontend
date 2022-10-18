<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Add Bid
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="Bid name" id="bidName" v-model="oldBid.name">
                </v-text-field>
              </v-col>
              <v-col>
                <!-- <v-text-field name="twitch" label="Twitch bidname" id="twitch" v-model="oldBid.social.twitch">
                </v-text-field> -->
              </v-col>
            </v-row>
          </v-col>
          <v-col>
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
                    Delete bid {{ oldBid.name }}
                  </v-card-title>
                  <v-card-text>
                    Do you really want to delete this bid?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" link @click="deleteBid">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/bids'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="editBid">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerBid from '@/api/marathon/bid'
import Bid from '@/utils/types/Bid'
import bid from '@/api/marathon/bid'
import { goalType } from '@/utils/enums/goal.enum'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      deleteDialog: false,
      oldBid: {
        _id: "",
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        openBid: false
      },
      newBid: {
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        openBid: false
      }
    }
  },
  async created() {
    const res = await trackerBid.getOneBid(this.$route.params.id)
    this.oldBid = res[0]
  },
  methods: {
    async deleteBid() {
      const res = await trackerBid.deleteBid(this.oldBid._id)
      if (res) {
        console.log(res)
        this.$router.push('/manage/tracker/bids')
      }
    },
    async editBid() {

      this.newBid = this.oldBid

      const res = await trackerBid.updateBid(this.newBid)
      if (res) {
        console.log(res)
        //   this.$router.push('/manage/tracker/bids')
      }
    },
  },
})
</script>
