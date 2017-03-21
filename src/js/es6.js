// class 声明模式 class是prototype的语法糖，使用Class之后更加明确
// 不会有变量提升，必须先声明后使用
class Model {
    constructor(v){
            Object.defineProperty(this,"val",{
            get : function(){
                return v;
            },
            set : function(newVal){
                if(v != newVal){
                    v = newVal;
                    this.change(newVal);
                }
            }
        });
    }

    change(nval){
        console.log("value is changed; " + nval);
    }
};
// class name is myClass ，'Me' 可以在内部使用
const myClass = class Me {
    
}

class Logger {
    constructor(name = 'china'){
        this.name = name;
        // this.printName = this.printName.bind(this);// 使用bind 绑定死 this
        this.printName = (name = "china") => {
            this.print(`my name is ${name}`);
            // sorrow function 箭头函数中的this 和函数在哪里执行无关，和函数定义有关
        }
    }

    printName(name = 'China'){
        this.print(`my name is ${name}`);
    }
    print(text){
        console.log(text);
    }
}

const logger = new Logger();

const {printName} = logger;

printName();// 此时this 指向发生错误