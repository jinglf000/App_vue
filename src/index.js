import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import dialog from './components/dialog.vue';
// import router from './router/router.js';
new Vue({
    el : "#warp",
    data : {
        toChild : "这是 是 父亲的 Vue 组件"
    }
})

new Vue({
    el : "#login",
    render : h => h(dialog)
});
new Vue({
    el : "#hello",
    data : {
        name : "z这是一个name 哈哈哈"
    }
})

var my = "125";
