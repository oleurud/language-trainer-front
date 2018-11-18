<template>
    <div class="row">
        <div class="col-lg-3">
            <CourseMenu active="user"></CourseMenu>
        </div>
        <div class="col-lg-9" v-if="topic">
            <CourseContent></CourseContent>
        </div>
    </div>
</template>

<script>
import ws from '@/services/webservice'
import CourseMenu from './CourseMenu'
import CourseContent from './CourseContent'

export default {
    name: 'course',
    computed: {
        user() {
            return this.$store.state.user
        },
        token() {
            return this.$store.state.token
        },
        topic() {
            return this.$route.params.topic
        }
    },
    components: {
        CourseMenu,
        CourseContent
    }
}
</script>
