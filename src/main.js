import { createApp } from "vue";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { mdiAccount, mdiArrowDown, mdiArrowUp } from "@mdi/js";
// VueRouter
import router from "./router.js";
// pinia
import { createPinia } from "pinia";
import i18n from "./i18n.js";

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
        aliases: {
            ...aliases,
            account: mdiAccount,
            arrowup: mdiArrowUp,
            arrpwdown: mdiArrowDown,
        },
        sets: {
            mdi,
        },
    },
});

createApp(App)
    .use(vuetify)
    .use(router)
    .use(i18n)
    .use(createPinia())
    .mount("#app");
