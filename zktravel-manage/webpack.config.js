const merge = require('webpack-merge');
const webpack = require('webpack');
const scriptConfig = require('../webpack-config/script');
const Md5HashPlugin = require('@local/webpack-plugin-md5-hash');
const StatsWritter = require('@local/webpack-plugin-stats-writter');
const path = require('path');
const { DEBUG } = require('../config');

const src = path.resolve(__dirname, './client-src-2');
const dist = path.resolve(__dirname, './client');
const utils = require('@local/webpack-lite-utils')(
    src, path.resolve(__dirname, DEBUG ? './.manifest' : './.manifest.next')
);

module.exports = function(name){
    switch(name){
        case 'vendor':
            return merge(scriptConfig, {
                entry: {
                    vendor: [
                        '@local/babel-helper',
                        'babel-polyfill',
                        'pepjs',
                        'vue',
                        'vue-router',
                        'vuex'
                    ]
                },
                output: {
                    path: dist,
                    library: 'vendor_[chunkhash]'
                },
                plugins: [
                    new Md5HashPlugin(),
                    new webpack.DllPlugin({
                        path: utils.getManifestPath('vendor'),
                        name: 'vendor_[chunkhash]',
                        context: __dirname
                    }),
                    new StatsWritter(utils.getStatsPath('vendor'))
                ],
                watch: false
            });
        case 'app':
            return merge(scriptConfig, {
                entry: {
                    main: path.resolve(src, './main.entry.js')
                },
                output: {
                    path: dist
                },
                resolve:{
                    alias: {
                        root: src
                    }
                },
                plugins: [
                    new Md5HashPlugin(utils.getGitCommitHash()),
                    new StatsWritter(utils.getStatsPath('main')),
                    new webpack.DllReferencePlugin({
                        context: __dirname,
                        manifest: utils.getManifestPath('vendor')
                    })
                ]
            });
    }
}