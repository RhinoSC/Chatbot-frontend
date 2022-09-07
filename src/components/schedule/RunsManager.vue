<template>
    <v-col>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title primary-title>
                        Runs list
                    </v-card-title>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Runner
                                        </th>
                                        <th class="text-left">
                                            Juego
                                        </th>
                                        <th class="text-left">
                                            Estimado
                                        </th>
                                        <th class="text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>runner</td>
                                        <td>juego</td>
                                        <td>10:10:10</td>
                                        <td>Accion</td>
                                    </tr>
                                    <!-- <tr v-for="item in desserts" :key="item.name">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.calories }}</td>
                                    </tr> -->
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title primary-title>
                        Schedule overview
                    </v-card-title>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Tiempo
                                        </th>
                                        <th class="text-left">
                                            Runner
                                        </th>
                                        <th class="text-left">
                                            Juego
                                        </th>
                                        <th class="text-left">
                                            Estimado
                                        </th>
                                        <th class="text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr v-for="(item, i) in scheduleRows" :key="i">
                                        <td>{{ item.runner }}</td>
                                        <td>{{ item.runner }}</td>
                                        <td>{{ item.game }}</td>
                                        <td>Acciones</td>
                                    </tr> -->
                                    <template v-for="(item, i) in scheduleRows">
                                        <template v-if="item.newDay">
                                            <tr :key="item.row.start" style="background-color: #2196f3;">
                                                <td></td>
                                                <td></td>
                                                <td class="d-flex justify-center align-center" style="color: white;">
                                                    {{item.dayText}}
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </template>
                                        <!-- eslint-disable-next-line -->
                                        <tr :key="i">
                                            <td>{{ item.row.time }}</td>
                                            <td>{{ item.row.runner }}</td>
                                            <td>{{ item.row.game }}</td>
                                            <td>{{ item.row.estimate }}</td>
                                            <td>Acciones</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-btn color="info" @click="addRun">text</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerSchedule from '@/api/marathon/schedule'
import trackerEvent from '@/api/marathon/event'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'
import { MStoStringTime, stringTimeToMS } from '@/utils/parsers'

export default Vue.extend({
    name: 'run-manager-component',

    components: {
    },
    data() {
        return {
            show: false,
            startDate: {} as Date,
            startTime: "",
            startTimeMS: 0,
            actualTimeMS: 0,
            scheduleRows: [] as any
            // scheduleRows: [{ time: "", runner: 'runer', game: 'game', estimate: '24:10:10', }, { time: "", runner: 'runer', game: 'game', estimate: '24:10:10', }]
        }
    },
    async created() {
        const date = new Date('October 30, 2022 00:00:00')
        this.startDate = date
        this.startTimeMS = date.getTime()
        this.startTime = date.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
    },
    methods: {
        getDay(item: any, firstDay: boolean) {
            let newDate;
            if (firstDay) {
                newDate = new Date(this.startTimeMS)
            }
            else {
                newDate = new Date(item.row.start)
            }
            return newDate.toLocaleDateString('en-US', { dateStyle: 'medium' })
        },
        addRun() {
            const run = { newDay: false, dayText: "", row: { time: "", runner: 'runer', game: 'game', estimate: '08:10:10', start: 0 } }
            if (this.scheduleRows.length == 0) {
                const runEstimateMS = stringTimeToMS(run.row.estimate)
                this.actualTimeMS = this.startTimeMS + runEstimateMS

                run.row.start = this.startDate.getTime()
                run.row.time = this.startDate.toLocaleString('en-US', { hour12: false, timeStyle: 'short' })

                run.newDay = true
                run.dayText = this.getDay(run, true)

                this.scheduleRows.push(run)
            } else {
                const oldStartDate = new Date(this.actualTimeMS - stringTimeToMS(this.scheduleRows[this.scheduleRows.length - 1].row.estimate))
                const oldEndDate = new Date(this.actualTimeMS)

                const timeInMS = stringTimeToMS(run.row.estimate)
                this.actualTimeMS += timeInMS

                run.row.start = oldEndDate.getTime()
                run.row.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

                if (oldStartDate.getDate() != oldEndDate.getDate()) {
                    run.newDay = true
                }

                run.dayText = this.getDay(run, false)
                this.scheduleRows.push(run)
            }
        }
    },
})
</script>
  