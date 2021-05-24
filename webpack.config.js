const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');
var helpers = require('./config/helper');
// import { AngularWebpackPlugin } from '@ngtools/webpack';
var angularWebpack = require('@ngtools/webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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

    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/, require.resolve('./src/index.html')],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    },
                },
            },
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            }


        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'src/index.html',
            minify: false
        }),
        new webpack.optimize.SplitChunksPlugin({
            name: ['app', 'vendor', 'polyfill']
        }),
        new angularWebpack.AngularWebpackPlugin({
            tsconfig: './tsconfig.json',
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
    }, optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
};