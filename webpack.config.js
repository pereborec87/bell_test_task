const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';
const ENV_WATCH = 'watch';
const NODE_ENV = process.env.NODE_ENV || ENV_DEVELOPMENT;

module.exports =  {
    mode: NODE_ENV === ENV_PRODUCTION ? ENV_PRODUCTION : ENV_DEVELOPMENT,
    optimization: {
        minimize: NODE_ENV === ENV_PRODUCTION
    },
    watch: NODE_ENV === ENV_WATCH,
    watchOptions: {
        aggregateTimeout: 100
    },
    entry: {
        main: "./src/index.ts"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
            test: /\.(html)$/,
            loader: 'raw-loader'
        }, {
            test: /\.ts$/,
            use: [{
                loader: require.resolve('ts-loader'),
                options: {
                    compilerOptions: {
                        composite: true
                    },
                    projectReferences: true,
                    appendTsSuffixTo: [/\.vue$/],
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                esModule: true
            }
        }]
    }
};

