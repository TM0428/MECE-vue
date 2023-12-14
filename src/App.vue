<template>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <OpfFileEditor />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import OpfFileEditor from "./pages/OpfFileEditor.vue";

export default {
    name: "App",
    components: {
        // HelloWorld,
        OpfFileEditor,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
