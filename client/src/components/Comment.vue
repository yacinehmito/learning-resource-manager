<template>
    <div class=" comment is-info">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong> </strong>
                        <small> @some-user </small>
                        <br>
                        <small> {{ parsedTimestamp }} </small>
                        <br>
                        <p> {{ comment.text }} {{ placeholder }}
                        </p>
                    </p>
                </div>
    
            </div>
        </article>
    
    </div>
</template>

<script>

import api from "@/api";
import dateformat from "dateformat";
export default {
    name: "comment",
    props: ["commentID"],
    data() {
        return {
            comment: {},
            placeholder: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum.`
        }
    },

    methods: {
        getComment() {
            api.comments.getOne(this.commentID).then(comment => { this.comment = comment })
        }
    },
    computed: {
        parsedTimestamp() {
            let stamp = this.comment.timestamp;
            return stamp ? dateformat(stamp, "mmmm dS, HH:MM") : null
        }

    },
    created() {
        this.getComment();
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
