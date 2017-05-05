const { DEBUG } = require('../config');
const merge = require('webpack-merge');
const optimize = require('./partical/optimize');
const resource = require('./partical/resource');

module.exports = merge(resource, optimize, {
    output:{
        filename: DEBUG ? '[name].hash.js': '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|vue)$/,
                loader: '@local/ifdef2-loader',
                options: {
                    DEBUG
                },
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    template: {
                        doctype: "html"
                    },
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test:/\.s?css$/,
                use:['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue']
    }
});
