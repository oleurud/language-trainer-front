<template>
    <div>
        <nav class="navbar navbar-collapse navbar-expand-md navbar-dark bg-primary fixed-top">
            <div class="container">
                <router-link class="navbar-brand" to="/">Language trainer</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="mainNavbar">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" v-if="user">
                            <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" :to="{ name: 'Courses'}">Courses</router-link>
                        </li>
                        <li class="nav-item" v-if="user && course && topic">
                            <router-link
                                class="nav-link"
                                data-toggle="collapse" data-target=".navbar-collapse.show"
                                :to="{ name: 'CourseTopics', params: {course: course.slug}}">
                                Topics
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav" v-if="user">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                {{user.username}}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <router-link class="dropdown-item" to="/account/user" data-toggle="collapse" data-target=".navbar-collapse.show">Account</router-link>
                                <li class="dropdown-divider"></li>
                                <a class="dropdown-item" v-on:click="logout" data-toggle="collapse" data-target=".navbar-collapse.show">Logout</a>
                            </div>
                        </li>
                        <li class="nav-item" v-if="userIsSuperadmin">
                            <a href="#" class="nav-link" data-toggle="modal" data-target="#signUp">New user</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav" v-else>
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-toggle="modal" data-target="#login">Login</a>
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
        userIsSuperadmin() {
            return this.$store.state.user && this.$store.state.user.role === 'SuperAdmin'
        },
        course() {
            if(this.$route.params.course) {
                return this.$store.getters.getCurrentCouse(this.$route.params.course)
            }
        },
        topic() {
            if (this.$route.params.topic) {
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
