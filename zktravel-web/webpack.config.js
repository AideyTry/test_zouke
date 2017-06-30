const merge = require('webpack-merge');
const webpack = require('webpack');
const scriptConfig = require('../webpack-config/script');
const styleConfig = require('../webpack-config/style');
const Md5HashPlugin = require('@local/webpack-plugin-md5-hash');
const StatsWritter = require('@local/webpack-plugin-stats-writter');
const path = require('path');
const { DEBUG } = require('../config');

const src = path.resolve(__dirname, './client-src');
const dist = path.resolve(__dirname, './client');
const utils = require('@local/webpack-lite-utils')(
    src, path.resolve(__dirname, DEBUG ? './.manifest' : './.manifest.next')
);

module.exports = function(name){
    let entry = {};
    switch(name){
        case 'script':
            entry = utils.getEntryFiles('js');
            if(Object.keys(entry).length===0) process.exit();
            return merge(scriptConfig, {
                entry,
                output: {
                    path: dist
                },
                plugins: [
                    new Md5HashPlugin(),
                    new StatsWritter(utils.getStatsPath('script'))
                ],
                watch: false
            });
        case 'style':
            entry = utils.getEntryFiles('scss');
            if(Object.keys(entry).length===0) process.exit();
            return merge(styleConfig, {
                entry,
                output:{
                    path: dist
                },
                plugins: [
                    new Md5HashPlugin(),
                    new StatsWritter(utils.getStatsPath('style'))
                ]
            });
    }
}