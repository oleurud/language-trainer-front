<template>
    <div v-if="courses">
        <p><strong>Select a course:</strong></p>

        <div class="row" v-if="courses && courses.length">
            <div class="col-lg-6" v-for="course in courses" :key="course.slug">
                <router-link :to="{ name: 'CourseTopics', params: {course: course.slug}}">
                    <div class="card text-white bg-primary mb-3">
                        <div class="card-header">Course</div>
                        <div class="card-body">
                            <h5 class="card-title">{{course.name}}</h5>
                        </div>
                    </div>
                </router-link>
                <br>
            </div>
        </div>
        <p v-else>You don't have courses</p>
    </div>
</template>

<script>
import ws from '@/services/webservice'
export default {
    name: 'course',
    created() {
        ws.request('get', '/content', null, this.token)
            .then((response) => {
                this.$store.commit('setCourses', response.contents)
            })
            .catch((error) => {
                console.log('error', error)
            })
    },
    computed: {
        token() {
            return this.$store.state.token
        },
        courses() {
            return this.$store.state.courses
        }
    }
}
</script>
