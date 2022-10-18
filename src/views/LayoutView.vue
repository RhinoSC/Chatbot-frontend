<template>
  <main>
    <h1>LAYOUT</h1>
  </main>
</template>

<script>
import API from "../api/index";
export default {
  components: {},
  data() {
    return {
      commands: [],
      itemsPerPage: 5
    };
  },
  methods: {
  },
  mounted: function () {
    API.getCommands().then((response) => {
      this.commands = response.data;
      //   console.log(this.commands.data);
    });
  },
};
</script>

<style lang="scss" scoped>
.sidebar-expanded {
  display: none;
}
</style>