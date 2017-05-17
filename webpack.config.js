var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: './main.jsx',
    output: {
        path: resolve('dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    // resolve: {
    //     extensions: ['.jsx']
    // },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('index.html'),
            inject: true
        })
    ]
}