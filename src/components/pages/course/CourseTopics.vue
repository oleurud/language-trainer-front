<template>
<div>
    <Breadcrumb></Breadcrumb>
    <p><strong>Select a topic:</strong></p>

    <div class="row" v-if="topics && topics.length">
        <div class="col-lg-6" v-for="topic in topics" :key="topic.slug">
            <router-link :to="{ name: 'CourseContent', params: {course, topic: topic.slug}}">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header">Topic {{topic.id}}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{topic.name}}</h5>
                    </div>
                </div>
            </router-link>
            <br>
        </div>
    </div>
</div>
</template>

<script>
import ws from '@/services/webservice'
import Breadcrumb from './Breadcrumb'

export default {
    name: 'courseTopics',
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
    },
    components: {
        Breadcrumb
    }
}
</script>
