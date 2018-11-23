'use strict'

import axios from 'axios'
import router from '@/router'
import store from '@/store'
import getDeviceInfo from './deviceInfo'
import parameters from '../../config/parameters'

const { host, port } = parameters.backend
const config = {
    baseURL: `${host}:${port}`,
    timeout: 10000,
    headers: {
        'X-device': getDeviceInfo()
    }
}

const AUTH_FAILED_CODES = [10001, 10002, 10003, 10004]

export default {
    request(method, endpoint, params = null, token = null) {
        if (token) {
            config.headers['Authorization'] = token
        }

        const instance = axios.create(config)

        return new Promise((resolve, reject) => {
            instance[method.toLowerCase()](endpoint, params)
                .then((response) => {
                    resolve(response.data.data)
                })
                .catch((error) => {
                    if (!error.response) {
                        reject(error.message)
                    } else {
                        if (AUTH_FAILED_CODES.indexOf(error.response.data.error.code) > -1) {
                            this.handleAuthFailed()
                            resolve()
                        } else {
                            if (error.response.data.error.data && error.response.data.error.data.error)
                                reject(error.response.data.error.data.error)
                            else
                                reject(error.response.data.error.message)
                        }
                    }
                })
        })
    },

    handleAuthFailed() {
        // save the next route
        store.commit('setNextRoute', router.currentRoute.fullPath)

        // send user to login
        store.commit('logout')
        router.push('/')
        // $('#login').modal('show')
    }
}
