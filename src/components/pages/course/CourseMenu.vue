<template>
    <div class="card">
        <div class="card-header">
            Topics
        </div>
        <div class="row" v-if="topics && topics.length">
            <ul class="list-group list-group-flush" v-for="topic in topics" :key="topic.slug">
                <router-link to="/account/user">{{topic.name}}</router-link>
            </ul>
        </div>
        <p v-else>Loading topics...</p>
    </div>
</template>

<script>
import ws from '@/services/webservice'

export default {
    name: 'CourseMenu',
    created() {
        ws.request('get', `/content/${this.$route.params.slug}/topic`, null, this.token)
            .then((response) => {
                this.$store.commit('setTopics', response.topics)
            })
            .catch((error) => {
                console.log('error getting topics', error)
            })
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        token() {
            return this.$store.state.token
        },
        topics() {
            return this.$store.state.topics
        }
    }
}
</script>
