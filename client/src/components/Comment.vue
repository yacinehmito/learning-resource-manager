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
                        <small> @{{ authorName }} </small>
                        <br>
                        <small> {{ parsedTimestamp }} </small>
                        <br>
                        <div class="box">
                            <p> {{ comment.text }}
                            </p>
                        </div>
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
            authorName: ""
        }
    },

    methods: {
        getComment() {
            api.comments.getOne(this.commentID).then(comment => {
                this.comment = comment
                api.users.getOne(comment.author).then(user => {
                    this.authorName = user.username;
                })
            })
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
