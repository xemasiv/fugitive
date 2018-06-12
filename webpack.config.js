const Uglify = require('uglifyjs-webpack-plugin');

const fugitive = (env, argv) => {
  console.log('fugitive', '@', argv.mode);
  let config = {
    entry: [
      './src/fugitive.js',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'fugitive.min.js',
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

const fugitive_worker = (env, argv) => {
  console.log('fugitive.worker', '@', argv.mode);
  let config = {
    entry: [
      './src/fugitive.worker.js',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'fugitive.worker.min.js',
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

module.exports = [fugitive, fugitive_worker];
