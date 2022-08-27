<template>
    <v-container grid-list-xs>
        <div class="container">
            <v-simple-table fixed-header>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th v-for="(header, index) in tableHeaders" :key="index">
                                {{ header }}
                            </th>
                        </tr>
                    </thead>
                    <draggable :list="myArray" tag="tbody" @change="log">
                        <tr v-for="(row, index) in myArray" :key="index">
                            <td v-for="(column, index) in row" :key="index">{{column}}</td>
                            <!-- <td> {{ row.time }}</td>
                            <td> {{ row.estimate }}</td>
                            <td> {{ row.game }}</td>
                            <td> {{ row.category }}</td>
                            <td> {{ row.runner }}</td>
                            <td> {{ row.platform }}</td>
                            <td> {{ row.coms }}</td>
                            <td> {{ row.comsTwitch }}</td>
                            <td> {{ row.gameTwitch }}</td>
                            <td> {{ row.runnerTwitch }}</td> -->
                        </tr>
                    </draggable>
                </template>
            </v-simple-table>
            <!-- <v-data-table ref="myTable" v-model="selected" :headers="tableHeaders" :items="myArray" item-key="name"
                class="elevation-1">
                <template #body="props">
                    <draggable :list="myArray" tag="tbody" :move="onMoveCallback" :clone="onCloneCallback"
                        @end="onDropCallback" @change="log">
                        <data-table-row-handler v-for="(item, index) in props.items" :key="index" :item="item"
                            :headers="tableHeaders" :item-class="getClass(item)">

                        </data-table-row-handler>
                    </draggable>
                </template>
            </v-data-table> -->
            <!-- <table>
                <caption>SRE9</caption>
                <thead>
                    <tr>
                        <th v-for="(header, index) in tableHeaders" :key="index">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <draggable :list="myArray" tag="tbody" @change="log">
                    <tr v-for="(row, index) in myArray" :key="index">
                        <td> {{ row.time }}</td>
                        <td> {{ row.estimate }}</td>
                        <td> {{ row.game }}</td>
                        <td> {{ row.category }}</td>
                        <td> {{ row.runner }}</td>
                        <td> {{ row.platform }}</td>
                        <td> {{ row.coms }}</td>
                        <td> {{ row.comsTwitch }}</td>
                        <td> {{ row.gameTwitch }}</td>
                        <td> {{ row.runnerTwitch }}</td>
                    </tr>
                </draggable>
            </table> -->
        </div>
    </v-container>

    <!-- <template #[`item.lock`]="{ item }">
                                <v-icon @click="item.locked = item.locked ? false : true">{{
                                        item.locked ? "mdi-pin-outline" : "mdi-pin-off-outline"
                                }}</v-icon>
                            </template> -->
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import draggable from 'vuedraggable'

// eslint-disable-next-line
import API from "../api/index";

export default {
    // eslint-disable-next-line
    components: { Sidebar, draggable},
    data() {
        return {
            tableHeaders: ['Hora', 'Estimado', 'Juego', 'Categoría', 'Runner/s', 'Plataforma', 'Comentaristas', 'comsTwitch', 'gameTwitch', 'runnerTwitch'],

            myArray: [
                { time: '10:00 PM', estimate: '05:30:00', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Chemigoku', platform: 'ps1', coms: 'chemigoku', comsTwitch: 'chemigoku2', gameTwitch: 'Dark Souls', runnerTwitch: 'chemigoku2' },
                { time: '10:00 PM', estimate: '00:30:10', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Rhino', platform: 'ps1', coms: 'rhino', comsTwitch: 'rhino', gameTwitch: 'Dark Souls', runnerTwitch: 'rhino' },
                { time: '10:00 PM', estimate: '00:45:00', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Hado', platform: 'ps1', coms: 'hado', comsTwitch: 'hado', gameTwitch: 'Dark Souls', runnerTwitch: 'hado' },
            ],
            allowDrag: true,
            selected: [],
        };
    },
    methods: {
        log() {
            console.log(this.myArray[0].runner, this.myArray[1].runner, this.myArray[2].runner)
        },
    },
    mounted: function () {
        // API.getCommands().then((response) => {
        //   this.commands = response.data;
        // //   console.log(this.commands.data);
        // });
    },
};
</script>

<style lang="scss" scoped>
table {
    // margin-bottom: 12px;
    // min-width: 300px;
    // width: 100%;
    // height: fit-content;
    // overflow-y: scroll;
    // border-collapse: collapse;
    // // border: 1px solid #000;

    thead {
        // background-color: var(--dark-var);
        // font-size: 0.875rem;
        // text-transform: uppercase;
        // text-align: left;

        // tr {
        //     margin-bottom: 1rem;
        // }

        // tr th {
        //     // color: var(--light);
        //     color: #185875 !important;
        // }
    }

    // tbody {
    //     margin-top: 1rem;
    // }

    // tr {
    //     border-bottom: 1px solid black;

    //     td {
    //         // padding: 3px 5px;
    //         vertical-align: middle;
    //         // border: 1px solid #000;
    //         padding: 10px;

    //         @media (min-width: 800px) {
    //             display: table-cell;
    //         }
    //     }
    // }
}
</style>