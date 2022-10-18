<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Schedules</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'schedules/add'">Add</v-btn>
            </v-row>
            <v-list>
                <v-list-item v-for="schedule in schedules" :key="schedule._id" link
                    :to="`schedules/edit/${schedule._id}`">
                    <v-list-item-content>
                        {{ schedule.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
  <script lang="ts">
  import Vue from 'vue'
  import trackerSchedule from '@/api/marathon/schedule'
  import Schedule from '@/utils/types/Schedule'
  
  export default Vue.extend({
      name: 'manage-tracker',
  
      components: {
      },
      data() {
          return {
              schedules: [] as Schedule[]
          }
      },
      async created() {
            const res = await trackerSchedule.getSchedules()
            // console.log('llegue')
            // console.log(res)
            this.schedules = res
      },
      mounted() {
          // console.log('hola')
      }
  })
  </script>
  