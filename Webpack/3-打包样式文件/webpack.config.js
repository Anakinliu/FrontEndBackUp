/**
 * 
 * 此配置文件指示Webpack干什么活
 * 
 * 构建共具都是基于NodeJS平台的,注意与项目本身区分开来.
 * NodeJSm默认用CommonJS
 */
const path = require('path')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle')
    },

    // loder配置
    module: {
        rules: [
            // 详细的loader配置
            {
                test: /\.css$/,  // 正则表达式,匹配.css结尾的文件

                // use: 需要的loader数组
                // use中的执行顺序是从后到前, 先'css-loader', 后'style-loader'
                use: [
                    // 作用:创建style标签, 将JS中的样式资源插入head中
                    'style-loader',
                    // 作用:将CSS文件变为commonjs模块加载到js中,里面内容是样式的字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                // use中的执行顺序是从后到前
                use: [
                    'style-loader',
                    'css-loader',

                    // 将less编译成css文件,npm需要下载less和less-loader
                    'less-loader'
                ]
            }
        ]
    }
}