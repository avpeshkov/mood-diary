const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackRules = require("./webpackRules");
const webpack = require("webpack");
const WorkerPlugin = require("worker-plugin");

module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            types: path.resolve(__dirname, "src/types"),
            api: path.resolve(__dirname, "src/api"),
            components: path.resolve(__dirname, "src/components"),
            services: path.resolve(__dirname, "src/services"),
            pages: path.resolve(__dirname, "src/pages"),
            helpers: path.resolve(__dirname, "src/helpers"),
        },
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "./index.js",
        publicPath: "/my-react-js-tutorial/",
        globalObject: "(typeof self!='undefined'?self:global)",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            ...webpackRules,
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new WorkerPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
            "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};
