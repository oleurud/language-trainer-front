<template>
    <div v-if="courses">
        <div class="row">
            <div class="col-lg-12">
                <h4>Courses</h4>
            </div>
        </div>

        <hr>

        <div class="row" v-if="courses && courses.length">
            <div class="col-lg-3" v-for="course in courses" :key="course.slug">
                <div class="card">
                    <router-link :to="{ name: 'Course', params: {slug: course.slug}}">
                        <img class="card-img-top" src="" alt="">
                        <div class="card-body">
                            <p class="card-text">
                                {{course.name}}
                            </p>
                        </div>
                    </router-link>
                </div>
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
