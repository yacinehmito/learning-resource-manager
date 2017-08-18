<template>
  <div class="feed">
    <div class="container">
      <item v-for="item in items" :key="item._id" :item="item">
  
      </item>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import item from "./Item";
export default {
  name: 'feed',
  data() {
    return {
      items: [],
      currentSubject: "FUN"
    }
  },
  methods: {
    getItems() {
      api.items.getAll().then(items => {
        this.items = items
      })
    }
  },
  computed: {
    filterBySubject() {

    },
    sortByVote() {

    }
  },
  created() {
    this.getItems();


  },
  components: {
    item
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
