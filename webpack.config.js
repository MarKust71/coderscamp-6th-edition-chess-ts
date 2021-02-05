// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const ROOT = path.resolve(__dirname, 'public');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        main: './main.ts',
    },

    output: {
        filename: '[name].bundle.js',
        path: DESTINATION,
        publicPath: ROOT,
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ROOT, 'node_modules'],
    },

    module: {
        rules: [
            /****************
             * PRE-LOADERS
             *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader',
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader',
            },

            /****************
             * LOADERS
             *****************/
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader',
            },
        ],
    },

    devtool: 'cheap-module-source-map',
    devServer: { publicPath: '/', contentBase: ROOT, port: 3000, inline: true },
};
