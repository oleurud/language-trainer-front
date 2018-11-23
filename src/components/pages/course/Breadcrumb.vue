<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-if="topic">
                <router-link :to="{ name: 'CourseTopics', params: {course: course.slug}}">{{course.name}}</router-link>
            </li>
            <li class="breadcrumb-item" v-else>
                {{course.name}}
            </li>
            <li class="breadcrumb-item" v-if="topic">
                {{topic.name}}
            </li>
        </ol>
        <br>
    </nav>
</template>

<script>

export default {
    name: 'breadcrumb',
    computed: {
        course() {
            return this.$store.getters.getCurrentCouse(this.$route.params.course)
        },
        topic() {
            if (this.$route.params.topic) {
                return this.$store.getters.getCurrentTopic(this.$route.params.topic)
            }
        },
    }
}
</script>
