<template>
    <div class="row">
        <div class="col-sm-2">
            <AccountMenu active="settings"></AccountMenu>
            <br>
        </div>
        <div class="col-sm-10">
            <h4>Sound</h4>
            <hr>
            <form>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Sound active</label>
                    <div class="col-sm-10">
                        <input class="form-check-input" type="checkbox" id="sound" checked v-if="settings.sound">
                        <input class="form-check-input" type="checkbox" id="sound" v-else>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" v-on:click="saveChanges">Save changes</button>
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
