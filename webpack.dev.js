
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const MediaQueryPlugin = require('media-query-plugin');

module.exports = {
    entry: {
        details: './src/details/details.js',
        history: './src/history/history.js',
        start: './src/start/start.js',
        settings: './src/settings/settings.js'
    },

    devServer: {
        port: 8080,
        writeToDisk: false
    },

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
                    'css-loader',
                    MediaQueryPlugin.loader,
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
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
        new MediaQueryPlugin({
            include: [
                'start',
            ],
            queries: {
                'only screen and (max-width: 824px)': 'mobile'
            }
        })
    ]
};
