<template>
  <div class="feed">
  
    <div class="message-area" v-if="($root.welcome || $root.justContributed) && $root.user.token">
      <div class="container" v-if="$root.welcome">
        <article class="message is-primary">
          <div class="message-body has-text-centered">
            Welcome back,
            <span id="user">{{ $root.user.username }}</span>
            :)
          </div>
        </article>
      </div>
      <br>
  
      <div class="container" v-if="$root.justContributed">
        <article class="message is-primary">
          <div class="message-body has-text-centered">
  
            Thanks for contributing!
  
          </div>
        </article>
      </div>
      <br>
    </div>
  
    <div class="box" v-if="!filteredItems.length && currentSubject != 'all'">
      <section class="section">
        <small> (No resources yet. Be the first to contribute!) </small>
      </section>
    </div>
  
    <div class="container">
      <transition-group tag="div" name="flip" v-if="currentSubject === 'all' || currentSubject === null" class="container">
        <item v-for="item in sortedItems" :itemID="item._id" :key="item._id" :item="item" :proportion="proportion">
        </item>
      </transition-group>
  
      <div v-else class="container">
        <item v-for="item in filteredItems" :itemID="item._id" :key="item._id" :item="item" :proportion="proportion">
        </item>
      </div>
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
      currentSubject: null,
      proportion: 10
    }
  },
  methods: {
    getItems() {
      api.items.getAll().then(items => {
        this.items = items;
        this.setProportion();
      })
    },
    getSubject() {
      this.currentSubject = this.$route.params.slug;
    },
    setProportion() {
      let max = 0;
      for (let item of this.items) {
        if (item.upvotes.length > max) {
          max = item.upvotes.length;
        }
      }
      this.proportion = max;
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
    },
    slicedFilteredItems_1() {
      let len = this.filteredItems.length;
      let evens = [];
      for (var i = 0; i < len; i += 2) {
        evens.push(this.filteredItems[i]);
      };
      return evens;
      //return this.filteredItems.slice(0, this.filteredItems.length / 2)
    },
    slicedFilteredItems_2() {
      let len = this.filteredItems.length;
      let odds = [];
      for (var i = 1; i < len; i += 2) {
        odds.push(this.filteredItems[i]);
      };
      return odds;

      //return this.filteredItems.slice(this.filteredItems.length / 2, this.filteredItems.length)
    },
    slicedItems_1() {
      let len = this.sortedItems.length;
      let evens = [];
      for (var i = 0; i < len; i += 2) {
        evens.push(this.sortedItems[i]);
      };
      return evens;

      //return this.sortedItems.slice(0, this.sortedItems.length / 2)
    },
    slicedItems_2() {
      let len = this.sortedItems.length;
      let odds = [];
      for (var i = 1; i < len; i += 2) {
        odds.push(this.sortedItems[i]);
      };
      return odds;

      //return this.sortedItems.slice(this.sortedItems.length / 2, this.items.length)
    }
  },
  created() {
    this.$root.redirect();
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
  color: blueviolet;
}

.flip-list-move {
  transition: transform .350s;
}
</style>
