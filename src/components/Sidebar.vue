<template>
  <aside :class="is_expanded ? 'is-expanded' : ''">
    <div class="logo">

    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <font-awesome-icon class="icons" icon="bars" />
      </button>
    </div>
    <ul class="navbar">
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Home' }">
          <font-awesome-icon class="icons" icon="home" />
          <span :class="!is_expanded ? 'item-hidden' : ''">Home</span>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Schedule' }">
          <font-awesome-icon class="icons" icon="calendar" />
          <span :class="!is_expanded ? 'item-hidden' : ''">Schedule</span>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Commands' }">
          <font-awesome-icon class="icons" icon="terminal" />
          <span :class="!is_expanded ? 'item-hidden' : ''">Commands</span>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Timers' }">
          <font-awesome-icon class="icons" icon="clock" />
          <span :class="!is_expanded ? 'item-hidden' : ''">Timers</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { ref } from 'vue'

import Vue from "vue";
export default Vue.extend({
  name: "SideBar",
  data() {
    return {
      is_expanded: false
    }
  },
  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded
    }
  }
});
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: static;
  width: 142px;
  height: 29px;
  left: 0px;
  top: 66.33px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px;

  color: white;
  text-decoration: none;

  &:visited {
    color: white;
  }

  &:active {
    color: white;
  }
}

.icons {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}

.navbar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0px;

  // position: absolute;
  width: 142px;
  height: 215px;
  // left: 21px;
  // top: 168px;

  list-style-type: none;
  font-size: 14px;

  & span {
    color: white !important;

    transition: 0.2s ease-out;

    &.item-hidden {
      visibility: hidden;
    }
  }

}

aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;

  &.is-expanded {
    width: var(--sidebar-width);
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }

}

// .sidebar-expanded {
//   // position: fixed;
//   // width: 168px;
//   // height: 1024px;

//   // background: linear-gradient(180deg,
//   //     #000000 72.07%,
//   //     rgba(255, 255, 255, 0) 100%);
// }
</style>