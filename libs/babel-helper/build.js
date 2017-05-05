const path = require('path');
const fs = require('fs');

const helperBuilder = require('babel-core/lib/tools/build-external-helpers');
fs.writeFileSync(path.join(__dirname,'index.js'),helperBuilder());