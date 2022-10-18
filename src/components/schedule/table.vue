<template>
    <v-container fluid>
        <v-simple-table fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-for="(header, index) in tableHeaders" :key="index"
                            style="color: indigo; font-size: 0.9rem;" :class="[
                            header.name == 'time' ? 'sm-col' : '',
                            header.name == 'estimate' ? 'md-col' : '',
                            header.name == 'game' ? 'lg-col' : '']">
                            <span>{{ header.text }}</span>
                        </th>
                    </tr>
                </thead>
                <draggable :list="myArray" tag="tbody" @change="log" :disabled="disableDrag">
                    <tr v-for="(row, rowIndex) in myArray" :key="rowIndex">
                        <td v-for="(column, index) in row" :key="index">
                            <v-text-field full-width v-model="row[index]" :name="`${rowIndex}${index}`" dense
                                @keyup.enter="logRow(row)" @focus="disableDrag = !disableDrag" @blur="disableDragM()">
                            </v-text-field>
                        </td>
                    </tr>
                </draggable>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    // eslint-disable-next-line
    components: { draggable },
    data() {
        return {
            tableHeaders: [
                { text: 'Schedule Time', name: 'start' },
                { text: 'Setup', name: 'setup' },
                { text: 'Estimate', name: 'estimate' },
                { text: 'Game', name: 'game' },
                { text: 'Category', name: 'category' },
                { text: 'Runner', name: 'runner' },

                myArray: [
                    // { start: 12049812,  setup: 600000, estimate: }
                { time: '10:00 PM', estimate: '05:30:00', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Chemigoku', platform: 'ps1', coms: 'chemigoku', comsTwitch: 'chemigoku2', gameTwitch: 'Dark Souls', runnerTwitch: 'chemigoku2', setup: "0h10m00s" },
                    { time: '10:00 PM', estimate: '00:30:10', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Rhino', platform: 'ps1', coms: 'rhino', comsTwitch: 'rhino', gameTwitch: 'Dark Souls', runnerTwitch: 'rhino', setup: "0h10m00s" },
                    { time: '10:00 PM', estimate: '00:45:00', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Hado', platform: 'ps1', coms: 'hado', comsTwitch: 'hado', gameTwitch: 'Dark Souls', runnerTwitch: 'hado', setup: "0h10m00s" },
                ],
                selected: [],
                disableDrag: false
        };
    },
    methods: {
        log() {
            console.log(this.myArray[0].runner, this.myArray[1].runner, this.myArray[2].runner)
        },
        logRow(row) {
            console.log(row)
        },
        disableDragM() {
            console.log('asi entra', this.disableDrag, 'asi sale', !this.disableDrag)
            this.disableDrag = !this.disableDrag
            return
        }
    },
    mounted: function () {
        // API.getCommands().then((response) => {
        //   this.commands = response.data;
        // //   console.log(this.commands.data);
        // });
    },
};
</script>