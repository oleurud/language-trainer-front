<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{sentence}}</h5>
            <a href="#" class="btn btn-primary" @click="speak">Listen</a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'courseContent',
    data() {
        return {
            synth: window.speechSynthesis
        }
    },
    props: {
        sentence: {
            type: String,
            required: true
        },
        lang: {
            type: String,
            required: true
        },
        hideText: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        getVoice() {
            const voices = this.synth.getVoices()
            return voices.find(v => v.lang == this.lang)
        }
    },
    methods: {
        speak() {
            const msg = new SpeechSynthesisUtterance(this.sentence)

            msg.voice = this.getVoice
            msg.rate = 1
            msg.pitch = 1

            this.synth.speak(msg)
        }
    }
}
</script>
