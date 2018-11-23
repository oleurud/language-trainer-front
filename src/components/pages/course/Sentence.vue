<template>
    <div class="col-lg-12">
        <div class="card" @click="doAction">
            <ul class="list-group list-group-flush">
                <li class="list-group-item text-white bg-primary" :style="{ fontSize: '20px', textAlign: 'center' }">
                    {{sentence.source}}
                </li>
                <li class="list-group-item" v-if="mustShow" :style="{ fontSize: '20px', textAlign: 'center' }">
                    {{sentence.translation}}
                </li>
                <li class="list-group-item" v-else>
                    <br>
                </li>
            </ul>
        </div>
        <br><br>
    </div>
</template>

<script>

export default {
    name: 'courseContent',
    data() {
        return {
            synth: window.speechSynthesis,
            showingText: false
        }
    },
    props: {
        sentence: {
            type: Object
        }
    },
    computed: {
        sound() {
            return this.$store.state.settings.sound
        },
        getVoice() {
            const voices = this.synth.getVoices()
            return voices.find(v => v.lang == "en-US")
        },
        mustShow() {
            return this.showingText
        }
    },
    methods: {
        doAction() {
            if(!this.showingText) {
                this.showingText = true
            }
            this.speak()
        },
        speak() {
            if(this.sound) {
                const msg = new SpeechSynthesisUtterance(this.sentence.translation)

                msg.voice = this.getVoice
                msg.rate = 1
                msg.pitch = 1

                this.synth.speak(msg)
            }
        },
    }
}
</script>
