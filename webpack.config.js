// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const ROOT = path.resolve(__dirname, '');
const DESTINATION = path.resolve(__dirname, 'dist');
const CONTENT = path.resolve(ROOT, 'public');

module.exports = {
    context: ROOT,

    entry: {
        main: './src/main.ts',
    },

    output: {
        filename: '[name].bundle.js',
        path: DESTINATION,
        publicPath: CONTENT,
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
    devServer: { publicPath: '/', contentBase: CONTENT, port: 3000, inline: true },
};
