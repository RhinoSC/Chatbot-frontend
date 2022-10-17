<template>
    <v-container grid-list-xs>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col class="overflow-y-auto" style="max-height: 400px;">
                                <h3>Runs</h3>
                                <v-expansion-panels v-model="selectedRunIdx">
                                    <v-expansion-panel v-for="(run, i) in event.schedule.rows" :key="i">
                                        <v-expansion-panel-header>
                                            {{run.row.name}}
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row>
                                                <v-col>
                                                    <span>Runners: </span>{{getRunnerString(run.row)}}
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <span>Category: </span>{{run.row.category}}
                                                </v-col>
                                                <v-col>
                                                    <span>Estimate: {{run.row.estimateS}}</span>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                            <v-col class="overflow-y-auto" style="max-height: 400px;">
                                <h3>Bids</h3>
                                <v-expansion-panels v-model="selectedBidIdx">
                                    <v-expansion-panel v-for="(bid, i) in selectedRun.bids" :key="i">
                                        <v-expansion-panel-header>
                                            {{bid.name}}
                                            <v-spacer></v-spacer>
                                            <template v-if="selectedBidIdx === i">
                                                <v-icon color="success">mdi-check-circle</v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row>
                                                <v-col cols="12">
                                                    <span>Description: </span>
                                                    <span class="text-subtitle-2">{{bid.description}}</span>
                                                </v-col>
                                                <v-col class="mt-n7" v-if="bid.type === 0">
                                                    <span class="text-caption">Select your option: </span>
                                                </v-col>
                                                <v-col class="mt-n5" v-else-if="bid.type === 1">
                                                    <span>
                                                        Current: {{currencyFormat(bid.current)}} /
                                                    </span>
                                                    <span>
                                                        Goal: {{currencyFormat(bid.goal)}}
                                                    </span>
                                                </v-col>
                                            </v-row>
                                            <template v-if="bid.type === 0">
                                                <v-row>
                                                    <v-col>
                                                        <v-list-item-group v-model="selectedBidOption" color="primary">
                                                            <v-list-item v-for="(bidOption, j) in bid.bids" :key="j">
                                                                <v-list-item-content>
                                                                    <v-list-item-title>
                                                                        {{bidOption.name}}
                                                                    </v-list-item-title>
                                                                    <v-list-item-subtitle>
                                                                        {{currencyFormat(bidOption.current)}}
                                                                    </v-list-item-subtitle>
                                                                </v-list-item-content>
                                                                <v-spacer></v-spacer>
                                                                <template v-if="selectedBidOption === j">
                                                                    <v-icon color="success" class="mb-1">
                                                                        mdi-check-circle</v-icon>
                                                                </template>
                                                                <template
                                                                    v-if="createdNewBidOption && bid.newBids && j == bid.bids.length-1">
                                                                    <v-list-item-icon>
                                                                        <v-icon color="error"
                                                                            @click="deleteNewBidOption()">
                                                                            mdi-close-circle</v-icon>
                                                                    </v-list-item-icon>
                                                                </template>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                        <template v-if="bid.newBids && !createdNewBidOption">
                                                            <v-container grid-list-xs
                                                                class="d-flex justify-space-between">
                                                                <v-text-field hide-details dense solo
                                                                    v-model="bidOptionName" name="newBidOption"
                                                                    label="Add your option" id="newBidOption"
                                                                    class="shrink">
                                                                </v-text-field>
                                                                <v-btn color="primary" @click="addBidOption()" icon
                                                                    large>
                                                                    <v-icon>mdi-plus-circle</v-icon>
                                                                </v-btn>
                                                            </v-container>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </template>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                                <v-btn color="success" class="mt-5" @click="saveBid()"
                                    :disabled="selectedRunIdx === undefined">Save bid</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Bid from '@/utils/types/Bid'
import { goalType } from '@/utils/enums/goal.enum'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'
import { getRunnerString, currencyFormat } from '@/utils/stringFuncs'

export default Vue.extend({
    name: 'manage-tracker',
    props: {
        event: {
            type: Object,
            required: true
        },
    },

    data() {
        return {
            selectedRunIdx: undefined,
            selectedRun: {} as Run,
            selectedBidIdx: -1,
            createdNewBidOption: false,
            bidOptionName: "",
            selectedBidOption: -1,
            rowTest: [] as any,
        }
    },
    methods: {
        getRunnerString(item: Run) {
            return getRunnerString(item)
        },
        currencyFormat(amount: number) {
            return currencyFormat(amount)
        },
        addBidOption() {
            if (!this.createdNewBidOption) {
                this.selectedRun.bids[this.selectedBidIdx].bids.push({ name: this.bidOptionName, current: 0 })
                this.createdNewBidOption = true
                this.selectedBidOption = this.selectedRun.bids[this.selectedBidIdx].bids.length - 1
                this.bidOptionName = ""
            }
        },
        deleteNewBidOption() {
            this.selectedRun.bids[this.selectedBidIdx].bids.pop()
            this.createdNewBidOption = false
            this.selectedBidOption = -1
        },
        saveBid() {
            // console.log(this.selectedRun.bids[this.selectedBidIdx])
            let output = {
                runId: this.selectedRun._id,
                bidId: this.selectedRun.bids[this.selectedBidIdx]._id,
                selectedBidIdx: this.selectedBidIdx as number | undefined,
                selectedBidOption: undefined as number | undefined,
                addedNewOpt: undefined as boolean | undefined
            }
            if (this.selectedRun.bids[this.selectedBidIdx].type === 0) {
                output.selectedBidOption = this.selectedBidOption
                output.addedNewOpt = this.createdNewBidOption
            }
            console.log(output)
            this.$emit('saveBid', output)
        }
    },
    watch: {
        selectedRunIdx() {
            if (this.selectedRunIdx !== undefined) {
                this.selectedRun = this.event.schedule.rows[this.selectedRunIdx].row
            } else {
                this.selectedRun = {} as Run
            }
        },
        selectedBidIdx() {
            if (this.selectedBidIdx === undefined) return
            if (this.selectedRun.bids[this.selectedBidIdx].type === 0)
                this.selectedRun.bids[this.selectedBidIdx].bids.sort((a: any, b: any) => parseInt(b.current) - parseInt(a.current))
        },
        selectedBidOption() {

            if (this.selectedBidOption !== this.selectedRun.bids.length - 1 &&
                this.createdNewBidOption &&
                this.selectedRun.bids[this.selectedBidIdx].newBids) {

                this.selectedRun.bids[this.selectedBidIdx].bids.pop()
                this.createdNewBidOption = false
                this.bidOptionName = ""
            }
        },
    }
})
</script>
  
<style lang="scss" scoped>
v-col.list-container {
    border: 1px solid black;
    border-radius: 10px;
}
</style>