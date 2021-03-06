let message = "HELLO message";

let vm = new Vue({
    el : "#box",// 对应的DOM元素 
    data : {// 数据
        message : "HELLO Vue",
        cla : "my-vue-container",
        canUse : false,
        allMessage : "",
        fontSize : 30,
        classStyle : {
            red : true,
            "box-shadow" : true
        },
        pStyle : {
            "color" : "#2997d0",
            "fontSize" : 18,
            "backgroundColor" : "#ccc"
        },
        count : 0,
        list : ["1","2","3","4"],
        keyupModel : ""
    },
    // 更好的方式是：methods 只有纯粹的数据逻辑
    methods : {
        doSomething : function(val,e){
            console.log(val);
            console.log(e);
        },
        printLog : function(val,e){
            console.log(val);
            console.log(e);
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
        },
        pStyleComputed : {
            get : function(){
                return {
                    "fontSize" : parseInt(this.fontSize)
                }
            }
        }
    }

});

// 在元素上绑定事件 是通过 v-on:eventName 来实现的
// 也可以绑定自定义事件 通过 emit（向上传播） 或者 broadcast（向下传播）;
// 在Vue.component 组件里面，Vue构造器的各种选项都可在组件中使用，data是一个例外，data必须是一个函数
Vue.component("todo-item",{
    template: '\<li>\{{title}}\<button v-on:click="$emit(\'remove\')">X</button>\</li>',
    props:['title']
});

let vm2 = new Vue({
    el : "#box2",
    data : {
        // 在实例中添加的data属性是相应式的，在Vue 实例化之后添加的对象则不是
        // 这里的属性被称之为 根基响应式属性 ，即便在 表单元素中使用了v-model 同样也要在
        // Vue实例的data属性里面进行声明；这个限制更利于以后代码阅读和规范
        newTodoText : "",
        todos : [
            "Study ES6 ",
            "Look up vue",
            "Sleep a day"
        ]
    },
    methods : {// 为Vue实例添加 方法
        addNewTodo : function(e){
            let str = this.newTodoText.trim();
            if (str == "") return;
            this.todos.push(this.newTodoText);
            this.newTodoText = "";
        }
    }
});

const trueVal = {
    value : true,
    text  : "是真的"
}
const falseVal = {
    value : false,
    text : "是假的"
}

// 表单元素
let vm3 = new Vue({
    el : "#box3",
    data : {
        lines : "",
        selectContent : [],
        checkedNames : [],
        selected : 120,
        options : [
            {value : 110,text : "警察"},
            {value : 120,text : "救护车"},
            {value : 119,text : "火警"}
        ],
        checkTrue :trueVal,
        checkFalse : falseVal,
        checkValue  : trueVal
    }
});

// 同样也可以通过 保留的component 元素的v-bind:is='ui-dialog' 动态的绑定组件
// 组件也是一个 Vue对象的instance 实例
// 对于复用的Vue组件而言要明确的定义好 组件的API接口
// props  允许外部环境传递数据给组件 props 属性
// Events 允许组件触发外部环境的副作用 触发emit事件
// Slots  允许外部环境将额外的内容组合在组件中。slot  内容分发
Vue.component("uiDialog",{
    template :  "<div class='alert container'><header class='header'><slot name='header'></slot></header>" +
                "<main><slot name='body'></slot><slot></slot></main>" +  "<p>{{helloVue}}</p>"+
                "<button v-on:click='yesCallback' class='btn btn-primary'>Click callback</button>" + "<span  class='num'>{{count}}</span>"  +
                "<button v-on:click='noCallbcak' class='btn btn-danger'>借问酒家何处有？</button>" + 
                "<p>{{message}}</p>" + 
                "</div>",
    data : function(){
        // 为保证 组件的单独，高内聚 低耦合的特性
        let val = {
            count : 0,
            yesCallb : this.yesCallback,
            message : "亚拉锁 这就是青藏高原！！！"
        };
        return val;
    },
    // 父元素所能够传到组件中的对象的接口，接口参数
    // 对于接口参数而言，是元素的属性 驼峰式（yesCallback） 要改写成 中线的形式 yes-callback
    props : {
        yesCallback : Function,
        helloVue : {
            type : [String,Number],
            default : "this is child component 'helloVue' default value"
        }
    },
    methods : {
        noCallbcak : function(){
            this.count ++ ;
            this.$emit('emitchild');
        },
        updateMessage : function(){
            this.message = "修改了我？？？";
        }
    }
    

    
});

// 自定义组件使用
let vm4 = new Vue({
    el : "#box4",
    data : {
        parentVue : "这里是parentVue，是父元素所给予的值",
        count : 0,
        parentVal : "parent 哈哈哈~~~~",
        helloWorld : {
            one : "he"
        }
    },
    methods : {
        addNum : function(){
            this.count ++ ;
        },
        btnClick : function(){
            console.log(this);// 即便函数被传递到组件里了，并且在组件里面运行，但是他的this还是指向了父组件
            // console.log("%c 从父元素中传递过来的函数 btnClick，","font-size:18px;color:#2997d0");
        }
    }

});
// 同样也可以通过Vue.set方法把相应的属性添加到嵌套的对象上（嵌套对象就是已经在 实例化Vue时的data）
// 让实例化的data属性作为一个容器来添加，但是不推荐这样去做
Vue.set(vm4.helloWorld,"two",1562);
vm4.$set(vm4.helloWorld,"three",8936);

vm4.parentVal = "change ++==";
// vm4.$el.textContent = "NEW Value";
Vue.nextTick(function(){
    // vm4.$el.textContent = "NEW Value";
    console.log("DOM 更新完畢")
});

// vm5 DOM的异步更新队列
let vm5 = new Vue({
    el : "#box5",
    data : {
        message : 15
    }
});
vm5.message = "new Message" ;
vm5.$el.textContent === "new Message"; // false 因为是异步更新DOM所以此时 内容不相等
Vue.nextTick(function(){
    vm5.$el.textContent === "new Message";// true
});

Vue.component("example",{
    template : "<span v-on:mouseover.once='updateMessage'>{{message}}</span>",
    data : function(){
        return {
            message : "not updated"
        }
    },
    methods : {
        updateMessage : function(){
            this.message = "updated ";
            console.log(this.$el.textContent);
            this.$nextTick(function(){
                console.log(this.$el.textContent);
            });
        }
    }
});

let vm6 = new Vue({
    el : "#box6"
})