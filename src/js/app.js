let message = "HELLO message";

let vm = new Vue({
    el : "#box",// 对应的DOM元素 
    data : {// 数据
        message : "HELLO Vue",
        cla : "my-vue-container",
        canUse : false,
        allMessage : ""
    },
    methods : {
        doSomething : function(){
            alert("--Vue--");
        }
    },
    watch : {
        message : function(val){// 主动的监控 某些值的变化
            this.allMessage = val + " From message watch ";
        }
    },
    filters : {// 过滤器
        reverseStr : function(val){
            if(!val) return "";
            return val.toString().split("").reverse().join("");
        }
    },
    computed : {// 计算属性 处理复杂的逻辑
        // 计算属性是基于它们的依赖进行缓存的,只有依赖关系发生变化的时候才会执行，没发生变化的
        // 情况下，从缓存中直接取值
        // 依赖方式的实现 类似于 angular中的依赖注入
        // 计算属性 默认只有 getter（一旦写好之后，就变成只读的了）；
        computedMessage : function(){
            //  this points to vm instance
            let x = this.message;
            console.log(x);
            return message.toString().toUpperCase();
        },
        messageGetSet : {
            get : function(){
                return this.message + "__ from get";
            },
            set : function(newVal){
                let val = newVal.trim();
                this.message =  val;
            }
        }
    }

});
let xx = "HELLOＷＯＲＬＤ";
