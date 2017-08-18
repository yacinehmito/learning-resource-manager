<template>
    <div class="item">
        {{ item }}
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong> {{ item.headline }} </strong>
                            <small> @{{ username }} </small>
                            <small> [ score: {{ item.upvotes.length }} ] </small>
                            <br> {{ item.description }}
                        </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item">
                                <span class="icon is-small">
                                    <i class="fa fa-reply" @click="startComment"></i>
                                </span>
                            </a>
                            <a class="level-item">
                                <span class="icon is-small">
                                    <i class="fa fa-retweet" @click="browse"></i>
                                </span>
                            </a>
                            <a class="level-item">
                                <span class="icon is-small">
                                    <i class="fa fa-heart" @click="upvote"></i>
                                </span>
                            </a>
                        </div>
                    </nav>
                </div>
            </article>
        </div>
    
        <div class="box" v-if="commenting">
            <div class="field">
                <div class="control">
                    <textarea class="textarea is-primary" type="text" placeholder="Primary textarea" v-model="currentComment.text"></textarea>
                </div>
            </div>
            <button class="button is-small" @click="postComment">Post</button>
            <button class="button is-small" @click="cancelComment">X</button>
        </div>
    
        <div class="box" v-if="browsing">
            <section class="section">
                <div class="container">
                    <comment :key=comment._id v-for="comment in item.comments" :commentID="comment"></comment>
                </div>
            </section>
        </div>
    
    </div>
</template>

<script>
import api from "@/api";
import comment from "./Comment";
export default {
    name: 'item',
    data() {
        return {
            self: { comments: [123, 456] },
            username: null,
            currentComment: {
                text: "",
                id: null
            },
            commenting: false,
            browsing: false
        }
    },
    props: [
        "item"
    ],
    methods: {

        _getUsername() {
            api.users.getOne(this.item.contributor).then(user => {
                this.username = user.username
            })
        },

        _updateItem() {
            this.item.comments.push(this.currentComment.id);
            api.items.editOne(this.item._id, { comments: this.item.comments });
            this.currentComment.id = null;
            this.currentComment.text = "";

        },

        upvote() {
            this.item.upvotes.push(this.item.contributor);
            api.items.editOne(this.item._id, { upvotes: this.item.upvotes }).catch(err => { alert("problem") })
        },

        startComment() {
            this.commenting = true;
        },

        postComment() {
            this.commenting = false;

            api.comments.postOne({
                author: "5995a8b388f0d588acea8e14",
                text: this.currentComment.text
            }).then(comment => {
                this.currentComment.id = comment._id;
                this._updateItem();

            });
        },

        cancelComment() {
            this.commenting = false;
            this.currentComment.id = null;
            this.currentComment.text = "";
        },

        browse() {
            this.browsing = !this.browsing;
        }


    },
    computed: {




    },
    components: {
        comment
    },

    created() {
        this._getUsername();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
