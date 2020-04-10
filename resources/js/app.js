require("./bootstrap");

import Vue from "vue";
import router from "./router.js";
import store from "./store.js";
import App from "./App.vue";

import { mapActions, mapGetters } from "vuex";

new Vue({
    el: "#app",
    router,
    store,
    components: {
        App,
    },
    computed: {
        ...mapGetters(["isAuth"]),
    },
    methods: {
        ...mapActions("user", ["getUserLogin"]),
    },
    created() {
        if (this.isAuth) {
            this.getUserLogin(); //REQUEST DATA YANG SEDANG LOGIN
        }
    },
});
