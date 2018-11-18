<template>
    <div v-if="topics && topics.length">
        <ul class="nav flex-column" v-for="topic in topics" :key="topic.slug">
            <li class="nav-item">
                <router-link :to="{ name: 'CourseContent', params: {course, topic: topic.slug}}">{{topic.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import ws from '@/services/webservice'

export default {
    name: 'CourseMenu',
    created() {
        ws.request('get', `/content/${this.$route.params.course}/topic`, null, this.token)
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
        },
        course() {
            return this.$route.params.course
        }
    }
}
</script>
