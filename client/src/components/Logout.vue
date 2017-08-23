<template>
    <div class="logout">
    
    </div>
</template>

<script>
import api from "@/api";
export default {
    name: 'logout',
    methods: {
        logout() {
            this.$root.logout();
        }
    },
    created() {
        this.logout();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

