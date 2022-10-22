<template>
    <v-container fluid>
        <v-card>
            <v-card-title primary-title>
                Edit Schedule
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
                        <v-row>

                        </v-row>
                    </v-col>
                    <v-col v-if="isReady">
                        <RunManagerComponent :schedule="oldSchedule" @saveRuns="saveRuns($event)">
                        </RunManagerComponent>
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
                            <v-btn color="success" class="mr-5" @click="editSchedule">Save schedule</v-btn>
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
import trackerEvent from '@/api/marathon/event'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'
import RunManagerComponent from '@/components/schedule/RunsManager.vue'
import ScheduleRow from '@/utils/types/ScheduleRow'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
        RunManagerComponent,
    },
    data() {
        return {
            savedRuns: false,
            isReady: false,
            showCalendar: true,
            deleteDialog: false,
            events: [] as Event[],
            selectedEvent: {} as Event | undefined,
            scheduleId: "",
            oldSchedule: {
                _id: "",
                name: "",
                start: 0,
                end: 0,
                rows: [] as ScheduleRow[],
                availableRuns: [] as Run[],
                eventId: "",
                defaultSetup: 0
            },
            newSchedule: {
                _id: "",
                name: "",
                start: 0,
                end: 0,
                rows: [] as ScheduleRow[],
                availableRuns: [] as Run[],
                eventId: "",
                defaultSetup: 0
            },
        }
    },
    async created() {
        if (this.$route.params.id) this.$router.push('/manage/tracker/schedules')
        
        try {
            const res = await trackerSchedule.getOneSchedule(this.axios, this.$route.params.id)
            this.oldSchedule = res[0]
            const eventRes = await trackerEvent.getEvents(this.axios)
            this.events = eventRes
            let selectedEvent = this.events.find((event: Event) => event._id == this.oldSchedule.eventId)
            this.selectedEvent = selectedEvent
            this.isReady = true
        } catch (error) {
            this.$router.push('/manage/tracker/schedules')
        }
    },
    methods: {
        getSchedule() {
            // eslint-disable-next-line
            return structuredClone(this.oldSchedule)
        },
        async deleteSchedule() {

            this.oldSchedule.availableRuns.forEach(async (row) => {
                if (row._id)
                    await trackerRun.deleteRun(this.axios, row._id)

            })

            this.oldSchedule.rows.forEach(async (scheduleRow) => {
                if (scheduleRow.row._id)
                    await trackerRun.deleteRun(this.axios, scheduleRow.row._id)
            })

            const res = await trackerSchedule.deleteSchedule(this.axios, this.oldSchedule._id)
            if (res) {
                // console.log(res)
                this.$router.push('/manage/tracker/schedules')
            }
        },
        async editSchedule() {
            if (!this.savedRuns) {
                alert('Save first runs before saving schedule')
                return
            }

            this.newSchedule = this.oldSchedule

            // console.log(this.newSchedule)

            const res = await trackerSchedule.updateSchedule(this.axios, this.newSchedule)
            if (res) {
                // console.log(res)
                this.$router.push('/manage/tracker/schedules')
            }
        },
        saveRuns($event: any) {
            this.oldSchedule.rows = $event[0]
            this.oldSchedule.availableRuns = $event[1]

            this.savedRuns = true
        }
    },
})
</script>
  