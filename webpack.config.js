const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MomentLocalsPlugin = require('moment-locales-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = path.resolve(__dirname, 'src/assets/js');
const OUT_DIR = path.resolve(__dirname, 'dist');

const entryPoint = glob.sync(SRC_DIR + '/**.js').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj;
}, {});

module.exports = {
    entry: entryPoint,
    devtool: 'inline-source-map',
    output: {
        path: OUT_DIR,
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css?[contenthash]',
            chunkFilename: '[name]/[id].css'
        }),
        new MomentLocalsPlugin({
            localesToKeep: ['vi-vn']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'global.jQuery': 'jquery',
            'window.jQuery': 'jquery',
            jQueryUi: 'jQueryUi',
            _: 'lodash',
        }),
        new HtmlWebpackPlugin({
            title: 'Home',
            template: path.resolve(__dirname, 'src/views/landingpage.html'), // template file
            filename: 'index.html', // output file
        }),
        new CleanWebpackPlugin(),
    ],
}