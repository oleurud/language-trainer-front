<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
            <div class="container">
                <router-link class="navbar-brand" to="/">Language trainer</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="mainNavbar">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'Courses'}">Courses</router-link>
                        </li>
                        <li class="nav-item" v-if="course && topic">
                            <router-link class="nav-link" :to="{ name: 'CourseTopics', params: {course: course.slug}}">Topics</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav" v-if="user">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                {{user.username}}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <router-link class="dropdown-item" to="/account/user">Account</router-link>
                                <li class="dropdown-divider"></li>
                                <a class="dropdown-item" v-on:click="logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav" v-else>
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-toggle="modal" data-target="#login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-toggle="modal" data-target="#signUp">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <Login></Login>
        <SignUp></SignUp>
    </div>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import router from '@/router'

export default {
    name: 'TheHeader',
    components: {
        Login,
        SignUp
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        course() {
            if(this.$route.params.course) {
                console.log(1)
                return this.$store.getters.getCurrentCouse(this.$route.params.course)
            }
        },
        topic() {
            if (this.$route.params.topic) {
                console.log(2)
                return this.$store.getters.getCurrentTopic(this.$route.params.topic)
            }
        }
    },
    methods: {
        logout() {
            this.$store.commit('logout')
            router.push('/')
        }
    }
}
</script>
