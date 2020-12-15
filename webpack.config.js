const path = require('path');

//this will contain all the rules
module.exports = {
  //establish entry, first js file in bundle
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    //path -- where bundle goes
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  //mode (package json scripts specify the mode, either development & production)
  //process.env is a global variable
  mode: process.env.NODE_ENV,
  devServer: {
      publicPath: '/build/',
      port: 8080,
      proxy: {
          '/**': {
            target: 'http://localhost:3000',
            // secret: false,
          }
      },
  },
module: {
    rules: [
        {
            test: /\.jsx?$/i,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
              },
              exclude: /node_modules/,
        },
        {
            test: /\.s?css$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
            exclude: /node_modules/,
        },
        //image loaders
        //only needed if an image url is used in a css, sass, or js file (so it needs to be compiled)
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: false,
                    },
                }
            ]
        },
    ],
},
}