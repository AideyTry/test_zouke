const optimize = require('./partical/optimize');
const resource = require('./partical/resource');
const merge = require('webpack-merge');
const { DEBUG } = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(optimize, resource, {
    output: {
        filename: DEBUG ? '[name].hash.css' : '[name].[chunkhash].css'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(DEBUG ? '[name].hash.css' : '[name].[chunkhash].css')
    ]
});