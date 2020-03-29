
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {

    // // This option controls if and how source maps are generated.
    // // https://webpack.js.org/configuration/devtool/
    // devtool: 'eval-cheap-module-source-map',

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        details: './src/details/details.js',
        history: './src/history/history.js',
        start: './src/start/start.js',
        settings: './src/settings/settings.js'
    },

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        port: 8080,
        writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
    },

    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                    // Please note we are not running postcss here
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            esModule: false,
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                      'file-loader',
                    ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/details/details.html',
            inject: true,
            chunks: ['details'],
            filename: 'details.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/history/history.html',
            inject: true,
            chunks: ['history'],
            filename: 'history.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/start/start.html',
            inject: true,
            chunks: ['start'],
            filename: 'start.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/settings/settings.html',
            inject: true,
            chunks: ['settings'],
            filename: 'settings.html'
        }),
        new HtmlWebpackInlineSVGPlugin(),
    ]
};
