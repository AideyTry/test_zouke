"use strict";
var loaderUtils = require('loader-utils');
var preprocessor_1 = require("./preprocessor");
module.exports = function (source, map) {
    this.cacheable && this.cacheable();
    var data = loaderUtils.getOptions(this);
  
    try {
        source = preprocessor_1.parse(source, data);
        this.callback(null, source, map);
    }
    catch (err) {
        var errorMessage = "ifdef-loader error: " + err;
        this.callback(new Error(errorMessage));
    }
};
