const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const paths = require('./paths')

module.exports = {
    // where webpack resolves files relative to
    context: paths.appRoot,
    entry: {
        vendor: [
            '@babel/polyfill',
            'styled-components',
            'react',
            'react-dom',
            'redux'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        // where app is built to
        path: paths.public,
        // where app is served from
        publicPath: '/',
    },
    resolve: {
        extensions: ['.jsx', '.js', '.less'],
        modules: [paths.nodeModules],
        // commonly imported directories ie. import Row from 'styles'
        alias: {
            scripts: paths.scripts,
            styles: paths.styles,
            components: paths.components,
            pages: paths.pages,
            public: paths.public,
            reducers: paths.reducers
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.htmlRoot,
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public',
                ignore: ['*.less']
            },
            // Copy the manifest and the icons to /public
            {
                from: paths.source + '/manifest.json',
                to: paths.public + '/manifest.json',
                toType: 'file'
            },
            {
                from: paths.source + '/images/launchericon_192x192.png',
                to: paths.public + '/launchericon_192x192.png',
                toType: 'file'
            },
            {
                from: paths.source + '/images/launchericon_512x512.png',
                to: paths.public + '/launchericon_512x512.png',
                toType: 'file'
            }
        ]),
        // Create a JSON file with the listed assets webpack created at bundle time
        new ManifestPlugin({
            fileName: 'asset-manifest.json', // Not to confuse with manifest.json
        }),
        // SW plugin configuration
        // The following option parameters and configuration are directly taken from react-create-app
        // as it's a production ready configuration that works pretty well for our needs.
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true, // minify and uglify the script
            navigateFallback: '/index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                include: paths.source,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(c|le)ss$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                    'url-loader'
                ]
            },
            {
                include: /\.json$/,
                loader: 'json-loader',
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        // show asset information
        assets: true,
        // add chunk information
        chunks: true,
        // add chunkGroups information
        chunkGroups: true,
        colors: true,
    }
}
