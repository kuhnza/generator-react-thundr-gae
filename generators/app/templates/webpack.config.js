const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch', // activate HMR for React

        'webpack-dev-server/client?http://localhost:3000',  // bundle the client for webpack-dev-serve

        'webpack/hot/only-dev-server', // bundle the client for hot reloading

        './src/main/static/typescript/index.tsx'
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/main/webapp/static'),
        publicPath: '/static/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),

        // Enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // Prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin()
    ],

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src/main/static/typescript'),
                use: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader'
                ]
            },

            // Load Less files
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, 'src/main/static/less'),
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'less-loader', options: { sourceMap: true } }
                ]
            },

            // Inline small woff files and output them at fonts/.
            {
                test: /\.woff2?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 50000,
                    mimetype: 'application/font-woff'
                }
            },

            // Load other font file types at fonts/
            {
                test: /\.(ttf|svg|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash].[ext]'
                }
            }
        ]
    },

    devServer: {
        port: 3000,

        contentBase: path.resolve(__dirname, 'src/main/webapp'),

        hot: true,

        proxy: {
            '/api': 'http://localhost:8080'
        }
    }
};