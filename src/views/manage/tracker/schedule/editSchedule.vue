<template>
    <v-container fluid>
        <v-card >
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
                                <v-text-field name="name" label="Schedule name" id="scheduleName"
                                    v-model="oldSchedule.name">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="events" item-text="name" return-object label="Event"
                                    v-model="selectedEvent">
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-divider></v-divider>
                    </v-col>
                    <v-col>
                        <v-row>
                            <h2>Schedule runs manager</h2>
                        </v-row>
                    </v-col>
                    <v-col>
                        
                    </v-col>
                    <!-- <v-col>
                        <v-sheet >
                            <v-calendar color="primary" type="day">
                                <template v-slot:day-header="{ present }">
                                    Today {{ present }}
                                </template>

                                <template v-slot:interval="{ hour }">
                                    <div class="text-center">
                                        {{ hour }} o'clock
                                    </div>
                                </template>
                            </v-calendar>
                        </v-sheet>
                    </v-col> -->
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
                                        Delete schedule {{ oldSchedule.name }}
                                    </v-card-title>
                                    <v-card-text>
                                        Do you really want to delete this schedule?
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" link @click="deleteSchedule">Delete</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/schedules'">Cancel</v-btn>
                            <v-btn color="success" class="mr-5" @click="editSchedule">Save</v-btn>
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
  
  export default Vue.extend({
      name: 'manage-tracker',
  
      components: {
      },
      data() {
          return {
              showCalendar: true,
  
              deleteDialog: false,
              events: [] as Event[],
              selectedEvent: {} as Event | undefined,
              oldSchedule: {
                  _id: "",
                  name: "",
                  start: 0,
                  end: 0,
                  rows: [] as Run[],
                  eventId: ""
              },
              newSchedule: {
                  _id: "",
                  name: "",
                  start: 0,
                  end: 0,
                  rows: [] as Run[],
                  eventId: ""
              }
          }
      },
      async created() {
          const res = await trackerSchedule.getOneSchedule(this.$route.params.id)
          this.oldSchedule = res[0]
          const eventRes = await trackerEvent.getEvents()
          this.events = eventRes
          let selectedEvent = this.events.find((event: Event) => event._id == this.oldSchedule.eventId)
          this.selectedEvent = selectedEvent
      },
      //   mounted() {
      //   },
      methods: {
          async deleteSchedule() {
              const res = await trackerSchedule.deleteSchedule(this.oldSchedule._id)
              if (res) {
                  console.log(res)
                  this.$router.push('/manage/tracker/schedules')
              }
          },
          async editSchedule() {
  
              this.newSchedule = this.oldSchedule
  
              const res = await trackerSchedule.updateSchedule(this.newSchedule)
              if (res) {
                  console.log(res)
                //   this.$router.push('/manage/tracker/schedules')
              }
          },
      },
  })
  </script>
  