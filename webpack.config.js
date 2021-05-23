const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        app: './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            process: "process/browser"
         } 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    
    module:{
        rules:[
            {
                test: /\.ts$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'tsconfig.json')
                        }
                    },
                    'angular2-template-loader'
                ],
                exclude: [/node_modules/]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Development',
          template:'src/index.html'
        }),
        new webpack.optimize.SplitChunksPlugin({
            name: ['app', 'vendor', 'polyfill']
        }),
      ],
    devServer: {
        contentBase: "./dist",
        // hot: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};