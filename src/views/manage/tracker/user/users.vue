<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Users</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'users/add'">Add</v-btn>
            </v-row>
            <v-list>
                <v-list-item v-for="user in users" :key="user._id" link :to="`users/edit/${user._id}`">
                    <v-list-item-content>
                        {{ user.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerUser from '@/api/marathon/user'
import User from '@/utils/types/User'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            users: [] as User[]
        }
    },
    async created() {
        try {
            const res = await trackerUser.getUsers(this.axios)
            this.users = res
        } catch (error) {
            this.$router.push('/')
        }
    },
})
</script>
  