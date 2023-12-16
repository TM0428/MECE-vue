import StartCreateEpub from './pages/StartCreateEpub.vue';
import OpfFileEditor from './pages/OpfFileEditor.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'StartCreateEpub',
        component: StartCreateEpub,
    },
    {
        path: '/step1',
        name: 'OpfFileEditor',
        component: OpfFileEditor,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;