import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { API_URL } from '../common/config'

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },
    post(endpoint, params) {
        return Vue.axios.post(`${endpoint}`, params).then(function (response) {
            return response;
        }).catch(function (error) {
            return error.response;
        });
    }
};

export default ApiService;

export const ContantServices = {
    sendContantMessage({ params }) {
        return ApiService.post("message", params);
    }
};
