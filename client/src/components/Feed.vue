<template>
  <div class="feed">
  
    <section class="section" v-if="$root.welcome">
      <div class="container">
        <p class="subtitle">
          Welcome back
          <span id="user">{{ $root.user.username }}</span> :)
        </p>
      </div>
    </section>
  
    <section class="section" v-if="$root.justContributed">
      <div class="container">
        <p class="subtitle">
          Thanks for contributing!
        </p>
      </div>
    </section>
  
    <div v-if="currentSubject === 'all' || currentSubject === null" class="container">
      <item v-for="item in sortedItems" :key="item._id" :item="item">
      </item>
    </div>
  
    <div v-else class="container">
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
      return this.sortedItems.filter(
        item =>
          item.subject === this.currentSubject
      )
    },
    sortedItems() {
      return this.items.slice(0).sort(
        (first, second) =>
          (second.upvotes.length - first.upvotes.length)
      )

    }
  },
  created() {
    this.getItems();
    this.getSubject();
  },
  components: {
    item
  },

  watch: {
    "$route"(to, from) {
      this.getSubject();
      this.$root.welcome = false;
      this.$root.justContributed = false;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user {
  color: purple;
}
</style>
