 const path = require('path');
 const HTMLWebpackPlugin = require('html-webpack-plugin');
 
 module.exports = {

    entry: './client/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },

    devServer: {
        compress: true,
        port: 8080,
        proxy: {
            '/': 'http://localhost:3000/',
            '/api': 'http://localhost:3000/api',
            '/*': 'http://localhost:3000/*'
        }
    }

 }