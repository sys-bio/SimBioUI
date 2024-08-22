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

  return config;
};
