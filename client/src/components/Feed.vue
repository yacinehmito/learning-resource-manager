<template>
  <div class="feed">
    {{ currentSubject }}
    <div class="container">
      <item v-for="item in filteredItems" :key="item._id" :item="item">
  
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
      currentSubject: null
    }
  },
  methods: {
    getItems() {
      api.items.getAll().then(items => {
        this.items = items
      })
    },
    getSubject() {
      this.currentSubject = this.$route.params.slug;
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.subject === this.currentSubject;
      })
    },
    sortByVote() {

    }
  },
  created() {
    this.getItems();
    this.getSubject();
    console.log(this.currentSubject)


  },
  components: {
    item
  },

  watch: {
    "$route"(to, from) {
      this.getSubject();
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
