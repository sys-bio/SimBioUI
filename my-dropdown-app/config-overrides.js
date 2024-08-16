const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add Monaco Editor Webpack Plugin
  config.plugins.push(
    new MonacoEditorWebpackPlugin({
      languages: ['javascript', 'json', 'html', 'css'],
    })
  );

  // Add fallback for Node.js core modules
  config.resolve.fallback = {
    assert: require.resolve('assert/'),
    // Add other Node.js polyfills as needed, e.g.,
    // fs: false, // If you encounter issues with fs
    // path: require.resolve('path-browserify') // Example fallback for path
  };

  return config;
};
