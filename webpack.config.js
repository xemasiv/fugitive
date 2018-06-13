const Uglify = require('uglifyjs-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

const fugitiveClient = (env, argv) => {
  console.log('fugitiveClient', '@', argv.mode);
  let config = {
    entry: [
      './src/fugitive.client.js',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'fugitive.client.min.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
  if (argv.mode !== 'development') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new Uglify({
          parallel: true,
          cache: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
            compress: {
              dead_code: true,
            },
          },
        }),
      ],
    };
  }
  return config;
};

const fugitiveServer = (env, argv) => {
  console.log('fugitiveServer', '@', argv.mode);
  let config = {
    entry: [
      './src/fugitive.server.js',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'fugitive.server.min.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    externals: [NodeExternals()],
  };
  if (argv.mode !== 'development') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new Uglify({
          parallel: true,
          cache: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
            compress: {
              dead_code: true,
            },
          },
        }),
      ],
    };
  }
  return config;
};

module.exports = [fugitiveClient, fugitiveServer];
