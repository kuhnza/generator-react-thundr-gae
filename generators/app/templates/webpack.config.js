const path = require('path');
const webpack = require('webpack');

const staticDir = path.resolve(__dirname, 'src/main/static');

// Environment flags
const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

/**
 * Base Webpack configuration.
 */
const webpackConfig = {
    entry: [
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
            },
			'DEVELOPMENT': isDevelopment
        })
    ],

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },

            // Load Less files
            {
                test: /\.less$/,
                include: [
                    path.resolve(staticDir, 'less')
                ],
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [require('autoprefixer')];
							}
						}
					},
                    { loader: 'less-loader', options: { sourceMap: true } }
                ]
            },

			// Image loading. Inlines small images as data URIs (i.e. < 10k).
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					name: 'images/[name].[hash].[ext]',
					limit: 10000
				}
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
};

if (isDevelopment) {
	webpackConfig.entry.unshift(
		'react-hot-loader/patch', // activate HMR for React

        'webpack-dev-server/client?http://localhost:3000',  // bundle the client for webpack-dev-serve

        'webpack/hot/only-dev-server' // bundle the client for hot reloading
	);

	webpackConfig.plugins.push(
		// Enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

		// Prints more readable module names in the browser console on HMR updates
		new webpack.NamedModulesPlugin()
	);

	webpackConfig.module.rules.push(
		// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
		{
			test: /\.tsx?$/,
			include: path.resolve(staticDir, 'typescript'),
			use: [
				'react-hot-loader/webpack',  // Enable HMR support in loader chain
				'awesome-typescript-loader'
			]
		}
	);

	webpackConfig.devServer = {
        port: 3000,
        contentBase: path.resolve(__dirname, 'src/main/webapp'),
        hot: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    };
} else {
	webpackConfig.module.rules.push(
		// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
		{
			test: /\.tsx?$/,
			include: path.resolve(staticDir, 'typescript'),
			use: [
				'awesome-typescript-loader'
			]
		}
	);

	webpackConfig.plugins.push(
		// Minify JS in non-development environments
		new webpack.optimize.UglifyJsPlugin()
	);
}

module.exports = webpackConfig;
