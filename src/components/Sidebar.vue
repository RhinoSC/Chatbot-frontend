<template>
  <div class="sidebar-expanded">
    <ul class="navbar">
      <li class="navbar-item">
        <font-awesome-icon class="icons" icon="bars" />
      </li>
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Home' }">
          <font-awesome-icon class="icons" icon="home" />
          Home
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Commands' }">
          <font-awesome-icon class="icons" icon="terminal" />
          Commands
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link class="link" :to="{ name: 'Timers' }">
          <font-awesome-icon class="icons" icon="clock" />
          Timers
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SideBar",
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

  position: absolute;
  width: 142px;
  height: 215px;
  left: 21px;
  top: 168px;

  list-style-type: none;
  color: white;
  font-size: 14px;
}

.sidebar {
  position: absolute;
  width: 80px;
  height: 1024px;
  left: 0px;
  top: 0px;

  background: linear-gradient(
    180deg,
    #000000 72.07%,
    rgba(255, 255, 255, 0) 100%
  );
}

.sidebar-expanded {
  position: absolute;
  width: 168px;
  height: 1024px;
  left: 0px;
  top: 0px;

  background: linear-gradient(
    180deg,
    #000000 72.07%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>