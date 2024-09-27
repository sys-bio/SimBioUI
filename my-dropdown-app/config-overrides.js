const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  // Add Monaco Editor Webpack Plugin
  config.plugins.push(
    new MonacoEditorWebpackPlugin({
      languages: ['javascript', 'json', 'html', 'css', 'antimony'], // Include 'antimony' if necessary
    })
  );

  // Add fallback for Node.js core modules (e.g., assert)
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve('assert/'),
    path: require.resolve('path-browserify'), // Add path-browserify fallback
  };

  // Add WebAssembly configuration for async loading of .wasm files
  config.module.rules.push({
    test: /\.wasm$/,
    type: 'webassembly/async',
  });

  // Ignore source map warnings (including from plotly.js)
  config.module.rules.push({
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [
      /node_modules\/plotly.js-basic-dist/,  // Exclude Plotly.js source maps
    ],
  });

  // Enable WebAssembly experiments in Webpack
  config.experiments = {
    ...config.experiments, // In case there are existing experiments
    asyncWebAssembly: true,
  };

  return config;
};