const babelJest = require('babel-jest');
const babelConfig = require('./babel-config');

// babelConfig.presets.push(require.resolve('babel-preset-jest'));

module.exports = babelJest.createTransformer(babelConfig);
