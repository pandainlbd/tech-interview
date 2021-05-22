const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	resolve: {
		extensions: ['.ts', '.js'],
		modules: ['node_modules'],
		alias: {
			vue: 'vue/dist/vue.js'
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}, {
				test: /\.pug$/,
				loader: 'pug-plain-loader'
			}, {
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}, {
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					}, {
						loader: 'postcss-loader',
					}, {
						loader: 'sass-loader',
						options: {
							sassOptions: {
								fiber: require('fibers'),
								indentedSyntax: true
							}
						}
					},
				]
			}, {
				test: /\.ts$/,
				loader: 'ts-loader',
				options: { appendTsSuffixTo: [/\.vue$/] }
			}
		]
	},
	entry: './src/index.js',
	plugins: [
		new VueLoaderPlugin(),
	],
	devtool: 'eval-source-map'
};
