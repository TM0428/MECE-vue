import StartCreateEpub from "./pages/StartCreateEpub.vue";
import OpfFileEditor from "./pages/OpfFileEditor.vue";
import SourceFileImport from "./pages/SourceFileImport.vue";
import TocEdit from "./pages/TocEdit.vue";
import { createRouter, createWebHistory } from "vue-router";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
