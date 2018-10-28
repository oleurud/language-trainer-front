<template>
    <div class="row">
        <div class="col-lg-3">
            <CourseMenu active="user"></CourseMenu>
        </div>
        <div class="col-lg-9">
            <h4>Course</h4>
        </div>
    </div>
</template>

<script>
import ws from '@/services/webservice'
import CourseMenu from './CourseMenu'

export default {
    name: 'course',
    computed: {
        user() {
            return this.$store.state.user
        },
        token() {
            return this.$store.state.token
        }
    },
    components: {
        CourseMenu
    }
}
</script>
