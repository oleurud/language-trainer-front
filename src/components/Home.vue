<template>
    <Courses v-if="user"></Courses>
    <div class="home" v-else>
        <h1>Welcome</h1>
    </div>
</template>

<script>
import Courses from '@/components/pages/courses/Courses'

export default {
    name: 'Home',
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    components: {
        Courses
    }
}
</script>
