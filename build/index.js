// 引用
let express = require("express"),
    proxy   = require("express-http-proxy"),
    bodyParser = require("body-parser"),
    path = require("path");

// 配置项
let app = express(),
    port = 9099,
    proxyUrl = "http://60.205.13.50";

// 代理API
let apiProxy = proxy(proxyUrl,{
    forwardPath : function(req,res){
        return req._parsedUrl.path;
    }
});

// 代理接口地址
app.use("/proxy/*",apiProxy);
app.use(express.static(path.join(__dirname.replace("\\build",""))));

app.listen(port);

console.log("serve is runing at :" + port);
