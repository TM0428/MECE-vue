import StartCreateEpub from "./pages/StartCreateEpub.vue";
import OpfFileEditor from "./pages/OpfFileEditor.vue";
import SourceFileImport from "./pages/SourceFileImport.vue";
import TocEdit from "./pages/TocEdit.vue";
import MakeEpubVue from "./pages/MakeEpub.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useEpubStore } from "@/stores/epub_store";

const routes = [
    {
        path: "/",
        name: "StartCreateEpub",
        component: StartCreateEpub,
    },
    {
        path: "/step1",
        name: "OpfFileEditor",
        component: OpfFileEditor,
    },
    {
        path: "/step2",
        name: "SourceFileEditor",
        component: SourceFileImport,
    },
    {
        path: "/step3",
        name: "TocEdit",
        component: TocEdit,
    },
    {
        path: "/step4",
        name: "MakeEpub",
        component: MakeEpubVue,
    },
];

// if useEpubStore().epub is null, redirect to StartCreateEpub
function redirectIfEpubIsNull(to, from, next) {
    if (to.name !== "StartCreateEpub" && !useEpubStore().epub) {
        next({ name: "StartCreateEpub" });
    } else {
        next();
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(redirectIfEpubIsNull);

export default router;
