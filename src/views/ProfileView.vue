<template>
    <div>
        <div>
            <img :src="$auth.user.picture" />
            <h2>{{ $auth.user.name }}</h2>
            <p>{{ $auth.user.email }}</p>
        </div>

        <!-- <div>
            <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import HelloWorld from '../components/HelloWorld.vue'

export default Vue.extend({
    name: 'profile-view',

    components: {
        // HelloWorld,
    },
    mounted() {
        // console.log(this.$auth)
    }

})
</script>