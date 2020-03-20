const Path    = require('path');
const Webpack = require('webpack');
const merge   = require('webpack-merge');
const common  = require('./webpack.common.js');

module.exports = merge(common, {
    mode       : 'development',
    devtool    : 'cheap-eval-source-map',
    output     : {
        chunkFilename: 'js/[name].chunk.js'
    },
    devServer  : {
        https: true,
        port   : 4000,
        host: "192.168.0.104",
        inline : true,
        proxy: [
            {
                context: ['/api', '/data'],
                target: "https://moda-optic.ru",
                changeOrigin: true,
                withCredentials: true,
            },
        ],
        overlay: {
            warnings: true,
            errors  : true
        }
    },
    plugins    : [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module     : {
        rules: [
            {
                test   : /\.(js|vue)$/,
                include: Path.resolve(__dirname, '../src'),
                enforce: 'pre',
                loader : 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    emitWarning: true,
                }
            },
            {
                test   : /\.js$/,
                include: Path.resolve(__dirname, '../src'),
                loader : 'babel-loader'
            },
            {
                test: /\.s?css$/i,
                use : ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
            }
        ]
    }
});
