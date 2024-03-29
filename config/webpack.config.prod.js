const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

const common = require('./webpack.common')
const paths = require('./paths')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: paths.appIndex
    },
    optimization: {
        minimizer: [new TerserPlugin()],
        // extract css to single file
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // runs less/css files through less-loader & post-css loader first
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            // path: paths.config,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CompressionPlugin({
            test: /\.(js|css|html)$/,
            deleteOriginalAssets: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                GITHUB_CLIENT_ID: JSON.stringify('88ee5c32729990ca3a14')
            }
        }),
        
        // Progressive web app in progress
        // new ManifestPlugin({
        //     fileName: 'asset-manifest.json'
        // })
    ]
})