<template>
    <div class="card">
        <div class="card-body">
            <div class="card-header">
                <p v-if="mustShow" class="card-title">{{sentence}}</p>
                <button class="btn btn-success" v-else @click="show">Show</button>
            </div>
            <div class="card-body">
                <button class="btn btn-primary" @click="speak">Listen</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'courseContent',
    data() {
        return {
            synth: window.speechSynthesis,
            showText: false
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
        },
        mustShow() {
            if(!this.hideText || this.hideText && this.showText) {
                return true
            }

            return false;
        }
    },
    methods: {
        speak() {
            const msg = new SpeechSynthesisUtterance(this.sentence)

            msg.voice = this.getVoice
            msg.rate = 1
            msg.pitch = 1

            this.synth.speak(msg)
        },
        show() {
            this.showText = true
        }
    }
}
</script>
