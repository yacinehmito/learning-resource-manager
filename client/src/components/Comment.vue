<template>
    <div class="comment">
        <p> {{ comment.text }} </p>
        <p> {{ comment }} </p>
        <p> {{ commentID }} </p>
    
    </div>
</template>

<script>
import api from "@/api";
export default {
    name: "comment",
    props: ["commentID"],
    data() {
        return {
            comment: {}
        }
    },

    methods: {
        getComment() {
            api.comments.getOne(commentID).then(comment => { this.comment = comment })

        }
    },
    created() {
        getComment();
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
