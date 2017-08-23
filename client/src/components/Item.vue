<template>
    <div class="item">
    
        <div class="box item-box">
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
                            <br>
                            <small> {{ parsedTimestamp }} </small>
                            <br>
                            <a :href="item.url"> {{ item.url }} </a>
                            <br> {{ item.description }}
                        </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item">
                                <span class="icon">
                                    <i class="fa fa-comment" @click="startComment" :class="{'used': commenting}"></i>
                                </span>
                            </a>
                            <a class="level-item">
                                <span class="icon">
                                    <i class="fa fa-eye" @click="browse" :class="{'used': browsing}"></i>
                                </span>
                            </a>
                            <a class="level-item">
                                <span class="icon" v-bind:class="{'used': hasVoted}">
                                    <i class="fa fa-thumbs-up" @click="upvote"></i>
                                </span>
                            </a>
                        </div>
                    </nav>
                </div>
            </article>
        </div>
    
        <div class="box" v-if="commenting">
    
            <button class="button is-small is-success" @click="postComment">
                <span class="icon is-small">
                    <i class="fa fa-check"></i>
                </span>
            </button>
            &nbsp;
    
            <button class="button is-small is-danger" @click="cancelComment">
                <span class="icon is-small">
                    <i class="fa fa-times"></i>
                </span>
            </button>
    
            <br>
            <br>
    
            <div class="field">
                <div class="control">
                    <textarea class="textarea is-primary is-medium" type="text" :placeholder="commentDefault" v-model="currentComment.text"></textarea>
                </div>
            </div>
    
        </div>
    
        <div class="box" v-if="browsing && item.comments.length">
            <button class="button is-small is-success" @click="browse">
                <span class="icon is-small">
                    <i class="fa fa-check"></i>
                </span>
            </button>
    
            <section class="section">
                <comment v-for="comment in item.comments" :commentID="comment" :key="comment._id" v-on:restart="restartBrowsing(this.commentID)"></comment>
            </section>
    
        </div>
    
        <div class="box" v-if="browsing && !item.comments.length">
            <button class="button is-small is-success" @click="browse">
                <span class="icon is-small">
                    <i class="fa fa-check"></i>
                </span>
            </button>
    
            <section class="section">
                (no comments)
            </section>
    
        </div>
        <br>
    </div>
</template>

<script>
import api from "@/api";
import dateformat from "dateformat";
import comment from "./Comment";
export default {
    name: 'item',
    data() {
        return {
            username: null,
            currentComment: {
                text: "",
                id: null
            },
            commenting: false,
            browsing: false,
            placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            commentDefault: "Share your thoughts, ask a question or answer one :) ",
            hasVoted: false
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
            if (!this.hasVoted) {
                this.hasVoted = true;
                this.item.upvotes.push(window.localStorage.id);
                api.items.editOne(this.item._id, { upvotes: this.item.upvotes }).catch(err => { alert("problem") })
            }

        },

        startComment() {
            if (this.browsing) {
                this.browse();
            }
            this.commenting = true;
        },

        postComment() {
            this.commenting = false;

            api.comments.postOne({
                author: this.$root.user.id,
                text: this.currentComment.text
            }).then(comment => {
                this.currentComment.id = comment._id;
                this._updateItem();

            });
        },

        cancelComment() {
            if (this.commenting) {
                this.commenting = false;
                this.currentComment.id = null;
                this.currentComment.text = "";
            }

        },

        browse() {
            this.browsing = !this.browsing;
            if (this.commenting) {
                this.cancelComment();
            }
        },

        checkIfVoted() {
            if (this.item.upvotes.includes(window.localStorage.id)) {
                this.hasVoted = true;
            }
        },
        restartBrowsing(comment) {
            let list = this.item.comments;
            list.splice(list.indexOf(comment), 1);
        }


    },
    computed: {
        parsedTimestamp() {
            return this.item.timestamp ? dateformat(new Date(this.item.timestamp), "mmmm dS, HH:MM") : null
        }

    },
    components: {
        comment
    },

    created() {
        this._getUsername();
        this.checkIfVoted();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-box {
    background-color: rgba(186, 166, 170, 0.2);
}

.used {
    color: rgba(0, 0, 0, 0.1);
}
</style>
