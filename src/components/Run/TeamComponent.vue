<template>
    <v-container grid-list-xs>
        <v-card>
            <v-card-text>
                <v-form>

                    <v-row>
                        <v-col cols="5">
                            <v-row>
                                <v-text-field name="name" label="Team name" id="name" v-model="teamSelectedInfo.name">
                                </v-text-field>
                            </v-row>
                            <v-row>
                                <v-autocomplete :items="users" item-text="name" return-object v-model="userSelected"
                                    label="Runner" @change="addUser">
                                </v-autocomplete>
                            </v-row>
                            <v-row>
                                <v-btn color="success" @click="saveTeams">Save teams</v-btn>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-expansion-panels v-model="teamSelected" v-if="teams.length > 0">
                                <v-expansion-panel v-for="(team, i) in teams" :key="i">
                                    <v-expansion-panel-header color="accent">
                                        {{ team.name }}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content color="accent">
                                        <v-list class="rounded-lg" color="primary">
                                            <v-list-item v-for="(player, i) in team.players" :key="i">
                                                <v-list-item-icon>
                                                    <v-icon>mdi-account</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title> {{ player.name }} </v-list-item-title>
                                                    <v-list-item-subtitle>Twitch: {{ player.social.twitch }}
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                                <v-spacer></v-spacer>
                                                <v-list-item-icon>
                                                    <v-icon @click="removeUser(player)">mdi-close-circle</v-icon>
                                                </v-list-item-icon>
                                            </v-list-item>
                                        </v-list>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
    <!-- <v-container style="width: 80%;">
    </v-container> -->
</template>

<script lang="ts">
import Vue from 'vue'
import trackerRun from '@/api/marathon/run'
import trackerSchedule from '@/api/marathon/schedule'
import trackerUser from '@/api/marathon/user'
import Run from '@/utils/types/Run'
import Team from '@/utils/types/Team'
import Schedule from '@/utils/types/Schedule'
import run from '@/api/marathon/run'
import User from '@/utils/types/User'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    props: {
        numOfTeams: {
            type: Number,
            required: true,
            default: 1
        },
        runId: {
            type: String,
        }
    },
    data() {
        return {
            teamSelected: 0,
            teamSelectedInfo: {} as Team,
            teams: [] as Team[],
            newRunner: {
                _id: "",
                name: "",
            },
            users: [],
            userSelected: {}
        }
    },
    async created() {
        const res = await trackerUser.getUsers()
        this.users = res
        this.createArrayOfTeams()
    },
    methods: {
        addUser() {
            this.teamSelectedInfo.players.push(this.userSelected as User)
            this.userSelected = {}
        },
        removeUser(player: User) {
            let index = this.teamSelectedInfo.players.findIndex((user) => user._id == player._id)
            this.teamSelectedInfo.players.splice(index, 1)
        },
        saveTeams() {
            this.$emit('saveTeams', this.teams)
        },
        createArrayOfTeams() {
            for (let i = 1; i <= this.numOfTeams; i++) {
                this.teams.push({ name: `Team ${i}`, players: [], })
            }
            this.teamSelectedInfo = this.teams[0]
        },
        verifyOneRunnerPerTeam() {
            for (let i = 0; i < this.teams.length; i++) {
                if (this.teams[i].players.length < 1)
                    this.$emit('populateTeams', false)
            }
        }
    },
    watch: {
        teamSelected() {
            if (this.teamSelected != undefined)
                this.teamSelectedInfo = this.teams[this.teamSelected]
        },
        numOfTeams(newValue, oldValue) {
            let dif = Math.abs(newValue - oldValue)
            if (oldValue < newValue) {
                let i = 0
                while (i < dif) {
                    this.teams.push({ name: `Team ${oldValue + i + 1}`, players: [], })
                    i++
                }
            } else {
                while (this.teams.length != newValue) {
                    this.teams.pop()
                    if (this.teams.length == newValue)
                        break
                }
            }
            this.verifyOneRunnerPerTeam()
        }
    }
})
</script>