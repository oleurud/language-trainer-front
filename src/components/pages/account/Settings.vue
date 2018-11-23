<template>
    <div class="row">
        <div class="col-lg-3">
            <AccountMenu active="settings"></AccountMenu>
            <br>
        </div>
        <div class="col-lg-9">
            <h4>Sound</h4>
            <hr>
            <form>
                <div class="form-group form-check">
                    <input class="form-check-input" type="checkbox" id="sound" checked v-if="settings.sound">
                    <input class="form-check-input" type="checkbox" id="sound" v-else>
                    <label class="form-check-label">Sound active</label>
                </div>

                <br>
                <button type="submit" class="btn btn-primary" v-on:click="saveChanges">Save settings</button>
            </form>
        </div>
    </div>
</template>

<script>
import AccountMenu from './AccountMenu'

export default {
    name: 'settings',
    computed: {
        settings() {
            return this.$store.state.settings
        }
    },
    methods: {
        saveChanges(event) {
            event.preventDefault()

            const settings = {
                sound: $('#sound').is(':checked')
            }

            this.$store.commit('setSettings', settings)
        }
    },
    components: {
        AccountMenu
    }
}
</script>
