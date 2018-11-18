<template>
    <div>
    <div class="row" v-for="sentence in sentences" :key="sentence.id">
        <div class="col-sm-6">
            <Sentence :sentence="sentence.source" lang="es-ES"></Sentence>
        </div>
        <div class="col-sm-6">
            <Sentence :sentence="sentence.translation" lang="en-US"></Sentence>
        </div>
    </div>
    </div>
</template>

<script>
import ws from '@/services/webservice'
import Sentence from './Sentence'

export default {
    name: 'courseContent',
    created() {
        ws.request('get', `/sentence/content/${this.$route.params.course}/topic/${this.$route.params.topic}`, null, this.token)
            .then((response) => {
                this.$store.commit('setSentences', response.sentences)
            })
            .catch((error) => {
                console.log('error getting sentences', error)
            })
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        token() {
            return this.$store.state.token
        },
        sentences() {
            return this.$store.state.sentences
        }
    },
    components: {
        Sentence
    }
}
</script>
