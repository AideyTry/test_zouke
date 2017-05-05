const { DEBUG } = require('../../config');
const webpack = require('webpack');

process.env.UV_THREADPOOL_SIZE = 2;

module.exports = {
    plugins: DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug:false
        })
    ],

    devtool: 'inline-source-map',
    performance: {
        hints: DEBUG ? false : 'warning'
    },
    stats: {
        maxModules: 0
    },
    watch: DEBUG,
    watchOptions: {
        ignored: /node_modules/
    }
}