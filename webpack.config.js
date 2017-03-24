const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
        path : path.resolve(__dirname,'./dist'),
        publicPath : '/dist/',
        filename : '[name].js'
    },
    module : {// loader 规则
        rules : [
            {
                test : /\.vue$/,
                use : "vue-loader"
            },
            {
                test : /\.css$/,
                // loader : "css-loader"
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
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'vendor'
        })
    ],
    devServer: {
        contentBase : "./src",// 开发服务器静态文件目录
        colors : true,// 输出终端为彩色
        historyApiFallback : true,//
        inline : true // 实时刷新 
    }
}