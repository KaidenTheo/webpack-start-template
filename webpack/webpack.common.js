const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const SpriteLoaderPlugin   = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const Html                 = require('./Html');
const Entry                = require('./Entry');

const PUBLIC_PATH = path.join(__dirname, '..', '/public', 'assets');
const IMG_PATH = path.join(PUBLIC_PATH, 'images');

module.exports = {
    entry       : {
        ...Entry.create(),
    },
    output      : {
        path    : PUBLIC_PATH,
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename:  'js/[name].js',
    },
    optimization: {
        noEmitOnErrors: true,
        runtimeChunk: 'single',
        splitChunks   : {
            chunks: 'all',
            name: false,

           /* maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `package.${packageName.replace('@', '')}`;
                    },
                },
            }, */
        }
    },
    plugins     : [
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['css/*', 'js/*', 'images/*', 'icons/*', 'fonts/*', '*.html'],
        }),
        /* new CopyWebpackPlugin([
            {from: 'src/images', to: IMG_PATH}
        ]), */
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        ...Html.create(),
        new VueLoaderPlugin(),
    ],
    resolve     : {
        alias: {
            '~': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module      : {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test   : /\.pug$/,
                oneOf: [{
                    resourceQuery: /^\?vue/,
                    use: 'pug-plain-loader'
                }, {
                    use: {
                        loader : 'pug-loader',
                        options: {
                            pretty: true,
                        },
                    }
                }],
            },
            {
                test   : /\.mjs$/,
                include: /node_modules/,
                type   : 'javascript/auto'
            },
            {
                test: /fonts[\\\/].+\.(eot|ttf|woff|woff2)$/,
                use : {
                    loader : 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                },
            },
            {
                test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
                use : [{
                    loader : 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                    }
                },
                    {
                        loader : 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality    : 70
                            },
                            optipng: {
                                enabled: true
                            },
                            pngquant: {
                                quality: [0.7, 0.7],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // webp: {
                            //     quality: 70
                            // }
                        }
                    },
                ],
            },
            {
                test: /icons[\\\/].+\.svg$/i,
                use : [
                    {
                        loader : 'svg-sprite-loader',
                        options: {
                            extract       : true,
                            spriteFilename: 'icons/icons.svg',
                        }
                    },
                    {
                        loader: "svgo-loader"
                    },
                    {
                        loader: path.resolve(__dirname, './svgClean.js'),
                    },
                ]
            }
        ]
    }
};

