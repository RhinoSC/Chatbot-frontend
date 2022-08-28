<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Agregar evento
      </v-card-title>
      <v-card-text>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="Event name" id="eventName"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="targetAmount" label="Target amount" id="targeAmount"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="minDonation" label="Minimum donation" id="minDonation"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- <v-text-field name="date" label="Date" id="date"></v-text-field> -->
                <v-menu ref="menu" v-model="dateMenu" :close-on-content-click="false" :return-value.sync="newEvent.date"
                  transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="newEvent.date" label="Date" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" @click="getMinDate()"></v-text-field>
                  </template>
                  <v-date-picker v-model="newEvent.date" no-title scrollable :min="minDate">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateMenu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu?.save(newEvent.date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field name="time" label="Time" id="Time"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="timezone" label="Timezone" id="timezone"></v-text-field>
              </v-col>
            </v-row>
            <v-checkbox label="Allow donations" v-model="allowDonations"></v-checkbox>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
          <v-col>
            <v-row>
              <h2>Paypal info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="reciever" label="Reciever" id="recieverPaypal"></v-text-field>
              </v-col>
              <v-col>
                <v-select :items="currencyItems" item-text="name" return-object label="Currency"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="paypalLogo" label="Paypal logo URL" id="paypalLogo"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="warning" class="mr-5" link :to="'/manage/tracker'">Cancel</v-btn>
            <v-btn color="success" class="mr-5">Save</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      allowDonations: false,
      currencyItems: [{ name: "US Dollar" }, { name: "Euro" }],
      minDate: "",
      dateMenu: false,
      newEvent: {
        name: "",
        targetAmount: 0,
        minDonation: 0,
        date: "",
        time: "",
        timezone: "",
        allowDonations: true,

      }
    }
  },
  mounted() {
    console.log('hola')
  },
  methods: {
    // addEvent() {

    // },
    getMinDate() {
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      this.minDate = `${yyyy}-${mm}-${dd}`;
    }
  },
})
</script>
