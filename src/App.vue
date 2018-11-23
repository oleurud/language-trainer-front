<template>
    <div id="app">
        <mainNav></mainNav>
        <div class="container">
            <router-view></router-view>
            <footer>
                <hr>
                <p>If you see something wrong, <a href="https://github.com/oleurud/language-trainer/issues/new">create an issue</a></p>
            </footer>
        </div>

    </div>
</template>

<script>
import mainNav from '@/components/globals/TheHeader'

export default {
    name: 'app',
    components: {
        mainNav
    }
}
</script>

<style>
#app {
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #343a40;
    margin-top: 90px;
}

footer {
    margin-top: 80px
}
</style>
