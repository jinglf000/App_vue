const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool : 'eval-source-map',// 打包后的文件对应
    resolve : {
        alias:{
            'vue' : 'vue/dist/vue.js'
        }
    },
    entry : {// 打包入口
        app : "./src/index.js",// 应用
        vendor : 'vue'
    },
    output : {// 输出路径
        path : path.resolve(__dirname,'./dist'),//  文件的输出路径
        publicPath : '/dist/',// 最后输出到浏览器端是的url 路径
        filename : '[name].js?[hash]' + new Date().getTime()// 最后输出的文件 path + filename 对应的则是最终的文件地址
    },
    module : {// loader 规则
        rules : [
            {
                test : /\.vue$/,
                use : "vue-loader"
            },
            {   // 使用eslint对js进行语法校验
                enforce : 'pre',
                test : /\.js$/,
                exclude : /node_modules|dist/,
                loader : "eslint"
            },
            {
                test : /\.js$/,
                loader  : 'babel-loader',
                exclude : /node_modules|dist/,
                options: {
                    presets: [ ['es2015', {"loose": true}] ],
                    cacheDirectory: true,
                    plugins: ["transform-runtime"],
                }
            },
            {
                test : /\.html$/,
                use : "html-loader"
            },
            {
                test : /\.css$/,
                // loader : "css-loader"
                // exclude : path.resolve(__dirname,"./src/"), exclude 和 include表示排除或者
                // 包含某些文件（使用include话就是只包含某个文件的目录）
                use : ExtractTextPlugin.extract({
                    use : 'css-loader'
                })
            },  
            {
                test: /\.(png|eot|woff|woff2|ttf|jpg|gif|svg)$/,
                loader : 'url-loader',
                options : {
                    limit: 10000,
                    name : '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('style.css'),// 整合css文件到 style.css
        new webpack.optimize.CommonsChunkPlugin({// 整合公共文件到 vendor
            name : 'vendor'
        }),
        new htmlWebpackPlugin({// copy html 文件
            filename : "index.html",
            template : path.resolve(__dirname,'./src/index.html'),
            chunks : [],
            hash : true,
            xhtml : true
        }),
        new webpack.LoaderOptionsPlugin({ // 压缩
            minimize : true
        }),
        new webpack.HotModuleReplacementPlugin(),// 热替换
        new webpack.LoaderOptionsPlugin({
            options :{
                eslint : {
                    configFile: path.resolve(__dirname,"./.eslintrc"),
                    failOnWarning: true,
                    failOnError: true,
                    cache: true,
                }
            }
        })
    ],
    devServer: { // 开发服务
        contentBase : path.resolve(__dirname,'./dist/'),// 开发服务器静态文件目录
        // colors : true,// 输出终端为彩色
        compress : true,
        port : 9090,
        hot : true,
        host : '127.0.0.1',
        historyApiFallback : true,//
        inline : true, // 实时刷新 
        proxy : { // 代理接口路径配置
            '/api' : {
                target : "http://130.10.9.26:8080",
                changeOrigin : true,
                secure: false
            }
        }
    }
}