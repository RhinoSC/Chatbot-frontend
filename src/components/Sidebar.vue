<template>
    <div class="ma-0 pa-0">
        <v-card>
            <v-navigation-drawer permanent expand-on-hover app @transitionend="hideBtn()">
                <v-list>
                    <v-list-item link to="/home">
                        <v-list-item-content>
                            <v-card>
                                <v-img alt="SRE logo" src="../assets/logo_plano.png"
                                    style="background-color: rgb(100,100,100)"></v-img>
                                <!-- <v-card-actions :class="!expanded ? 'd-none' : 'd-flex justify-center'">
                                    <v-btn color="error" x-small @click="logout()">Log out</v-btn>
                                </v-card-actions> -->
                            </v-card>
                            <!-- <v-list-item-title class="text-h6">
                  SRE
                </v-list-item-title> -->
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list nav dense>
                    <template v-if="!$route.meta.public">
                        <v-list-item v-for="(item, index) in items" :key="index" link :to="item.path">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                    </template>
                    <template v-else>
                        <v-list-item v-for="(item, index) in itemsPublic" :key="index" link :to="item.path">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                    </template>
                    <v-list-item @click="logout" v-if="$auth.isAuthenticated">
                        <v-list-item-icon>
                            <v-icon>{{ logOut.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ logOut.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2">
                        <v-switch v-model="$vuetify.theme.dark" inset label="Dark theme" persistent-hint></v-switch>
                    </div>
                </template>
            </v-navigation-drawer>
        </v-card>
    </div>
</template>
  
<script>
import { ref } from 'vue'

import Vue from "vue";
export default Vue.extend({
    name: "Side-bar",
    data() {
        return {
            expanded: false,
            items: [
                // { icon: 'mdi-view-dashboard-edit', name: 'Dashboard', path: '/dashboard' },
                // { icon: 'mdi-console', name: 'Commands', path: '/manage/commands' },
                // { icon: 'mdi-clock', name: 'Timers', path: '/manage/timers' },
                { icon: 'mdi-calendar', name: 'Tracker Manager', path: '/manage/tracker' },
                { icon: 'mdi-calendar-account', name: 'Tracker Visualizer', path: '/tracker' },
                { icon: 'mdi-hand-coin', name: 'Donate', path: '/donate' },

                // { icon: 'mdi-calendar-clock', name: 'Schedule Visualizer', path: '/manage/schedule' },
            ],
            logOut: { icon: 'mdi-logout', name: 'Log out', path: '/' },
            itemsPublic: [
                { icon: 'mdi-calendar-account', name: 'Tracker', path: '/tracker' },
                { icon: 'mdi-hand-coin', name: 'Donate', path: '/donate' },
            ],
        }
    },
    methods: {
        hideBtn() {
            this.expanded = !this.expanded
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        }
    },
});
</script>
  
<style lang="scss" scoped>
// .link {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 0px;

//   position: static;
//   width: 142px;
//   height: 29px;
//   left: 0px;
//   top: 66.33px;

//   /* Inside Auto Layout */

//   flex: none;
//   order: 1;
//   align-self: stretch;
//   flex-grow: 0;
//   margin: 0px 0px;

//   color: var(--light);
//   text-decoration: none;

//   &:visited {
//     color: var(--light);
//   }

//   &:active {
//     color: var(--light);
//   }
// }

// .icons {
//   width: 30px;
//   height: 30px;
//   margin-right: 8px;

//   path {
//     fill: var(--light);
//   }
// }

// .navbar {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: flex-start;
//   padding: 8px 0px;

//   // position: absolute;
//   width: 142px;
//   height: 215px;
//   // left: 21px;
//   // top: 168px;

//   list-style-type: none;
//   font-size: 14px;

//   & span {
//     color: white !important;

//     transition: 0.2s ease-out;

//     &.item-hidden {
//       visibility: hidden;
//     }
//   }

// }

// aside {
//   display: flex;
//   flex-direction: column;
//   width: calc(2rem + 32px);
//   min-width: 32px;
//   min-height: 100vh;
//   overflow: hidden;
//   padding: 1rem;

//   background-color: var(--dark-alt);
//   // background-color: var(--dark);
//   color: var(--light) !important;

//   transition: 0.2s ease-out;

//   &.is-expanded {
//     width: var(--sidebar-width);
//   }

//   @media (max-width: 768px) {
//     position: fixed;
//     z-index: 99;
//   }

// }
</style>