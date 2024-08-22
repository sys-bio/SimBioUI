const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  // Add Monaco Editor Webpack Plugin
  config.plugins.push(
    new MonacoEditorWebpackPlugin({
      languages: ['javascript', 'json', 'html', 'css', 'antimony'], // Include antimony if required
    })
  );

  // Add fallback for Node.js core modules (e.g., assert)
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve('assert/'), // Ensure 'assert' is resolved
  };

  // Ensure .wasm files are handled correctly
  config.module.rules.push({
    test: /\.wasm$/,
    type: 'asset/resource', // Handles .wasm as a resource to be served by Webpack
  });

  // Override output configuration to ensure the correct base URL is set
  config.output = {
    ...config.output,
    publicPath: '/', // Set this according to your project needs
  };

  return config;
};
