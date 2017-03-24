import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import dialog from './components/dialog.vue';

new Vue({
    el : "#login",
    render : h => h(dialog)
})

/*var vm1 = new Vue({
    el : "#login",
    data : {
        user : "",
        pass : ""
    },
    methods : {
        printMsg : function(){
            console.log(user,pass);
        }
    }
})*/