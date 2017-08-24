<template>
    <div class="item">
    
        <div :class="{'is-active': prompt.isActive}" class="modal prompt">
            <div class="modal-background" @click="togglePrompt"></div>
            <div class="modal-content">
                {{ prompt.text }}
    
                <div class="notification is-primary">
                    {{ prompt.text }}
                    <button class="button is-small">
                        <span class="icon">
                            <i class="fa fa-check" @click="deleteItem">
                            </i>
                        </span>
                    </button>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    
        <div class="box item-box" v-if="!removed">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
    
                            <strong>
                                <a :href="item.url"> {{ item.headline }} </a>
                            </strong>
                            &nbsp;&nbsp;
    
                            <small> @{{ username }} </small>
    
                            <br>
                            <small> {{ parsedTimestamp }} </small>
                            <br>
                            <a class="link-option" @click="toggleURL"> {{ word }} Full URL </a>
                            <a :href="item.url" v-if="showFullLink">
                                <br>{{ item.url }} </a>
                            <br>
                            <br> {{ item.description }}
                        </p>
                    </div>
                    <br>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item">
                                <span class="icon">
                                    <i class="fa fa-comment" @click="startComment" :class="{'used': commenting}">
                                        &nbsp;
                                    </i>
                                </span>
                            </a>
                            <a class="level-item">
                                <span class="icon">
                                    <i class="fa fa-eye" @click="browse" :class="{'used': browsing || !item.comments.length}">
                                        {{ item.comments.length }}
                                    </i>
                                </span>
                            </a>
                            <a class="level-item">
                                <span class="icon" v-bind:class="{'used': hasVoted}">
                                    <i class="fa fa-thumbs-up" @click="upvote">
                                        {{ item.upvotes.length }}
                                    </i>
                                </span>
                            </a>
    
                        </div>
                        <div class="level-right">
                            <a class="level-item" @click="togglePrompt" v-if="isOfCurrentUser">
                                <span class="icon">
                                    <i class="fa fa-trash"></i>
                                </span>
                            </a>
                        </div>
                    </nav>
                </div>
            </article>
        </div>
    
        <div v-else class="columns">
            <div class="column">
                <div class="section deleted">
                    <div class="notification is-primary is-small">
                        {{ deleted }}
                    </div>
                </div>
            </div>
            <div class="column">
            </div>
        </div>
    
        <div class="box" v-if="browsing && item.comments.length">
            <button class="button is-small is-danger" @click="browse">
                <span class="icon is-small">
                    <i class="fa fa-times"></i>
                </span>
            </button>
    
            <section class="section">
                <comment v-for="comment in item.comments" :commentID="comment" :key="comment._id" v-on:restart="restartBrowsing(this.commentID)"></comment>
            </section>
    
        </div>
    
        <div class="box" v-if="browsing && !item.comments.length">
            <button class="button is-small is-danger" @click="browse">
                <span class="icon is-small">
                    <i class="fa fa-times"></i>
                </span>
            </button>
    
            <section class="section">
                (no comments)
            </section>
    
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
            isOfCurrentUser: false,
            username: null,
            currentComment: {
                text: "",
                id: null
            },
            commenting: false,
            browsing: false,
            placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            commentDefault: "Share your thoughts, ask a question or answer one :) ",
            hasVoted: false,
            showFullLink: false,
            prompt: {
                isActive: false,
                text: "Remove this item?"
            },
            removed: false
        }
    },
    props: [
        "item"
    ],
    methods: {

        _getUsername() {
            api.users.getOne(this.item.contributor).then(user => {
                this.username = user.username
                this.checkOfUser();
            })
        },
        checkOfUser() {
            api.users.getOne(this.item.contributor).then(user => {
                if (user._id === this.$root.user.id) {
                    this.isOfCurrentUser = true;
                }
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
                api.items.editOne(this.item._id, { upvotes: this.item.upvotes })
                    .catch(err => { alert("problem") })
            }

        },

        startComment() {
            /* if (this.browsing) {
                this.browse();
            } */
            if (this.commenting) {
                this.commenting = false;
            } else {
                this.commenting = true;
            }
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
            /* if (this.commenting) {
                 this.cancelComment();
             } */
        },

        checkIfVoted() {
            if (this.item.upvotes.includes(window.localStorage.id)) {
                this.hasVoted = true;
            }
        },
        restartBrowsing(comment) {
            let list = this.item.comments;
            list.splice(list.indexOf(comment), 1);
        },
        toggleURL() {
            this.showFullLink = !this.showFullLink;
        },
        deleteItem() {
            api.items.deleteOne(this.item._id).then(res => {
                this.togglePrompt();
                this.removed = true;
            });
        },
        togglePrompt() {
            this.prompt.isActive = !this.prompt.isActive
        }


    },
    computed: {
        parsedTimestamp() {
            return this.item.timestamp ? dateformat(new Date(this.item.timestamp), "mmmm dS, HH:MM") : null
        },
        word() {
            return this.showFullLink ? "Hide" : "Show"
        },
        deleted() {
            return "" + this.item.headline + " has been removed";
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

.link-option {
    color: rgba(0, 0, 0, 0.3);
    font-size: 0.85em;
}

prompt {
    background-color: red;
}

deleted {
    width: 100px;
    color: red;
}

voted {
    background-color: red;
}
</style>
