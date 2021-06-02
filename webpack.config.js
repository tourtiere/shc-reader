const webpack = require("webpack");
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (env, args) => {
    const isProduction = args && args["mode"] === "production";
    console.log("");
    console.log(isProduction ? "PRODUCTION BUILD" : "DEVELOPMENT BUILD");
    console.log("");

    const config = {
        entry: {
            "scripts/main": path.resolve("./src/bootstrap.tsx"),
        },
        output: {
            path: path.resolve("./docs"),
        },
        target: "web",
        devtool: isProduction ? false : "source-map",
        optimization: {
            splitChunks: {
                // always create vendor.js
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "scripts/vendor",
                        chunks: "initial",
                        enforce: true,
                    },
                },
            },
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".html", ".txt"],
            plugins: [
                new TsconfigPathsPlugin({
                    /* options: see below */
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
            ],
        },

        watchOptions: {
            aggregateTimeout: 100,
            ignored: /node_modules/,
            poll: 300,
        },

        devServer: {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            contentBase: "./docs",
            publicPath: "/",
            compress: false,
            port: 5000,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: "normal",
            clientLogLevel: "error",
        },

        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: isProduction ? "production" : "development",
                DEBUG: !isProduction,
            }),

            new CopyWebpackPlugin({
                patterns: [
                    // static files to the site root folder (index and robots)
                    {
                        from: "**/*",
                        to: path.resolve("./docs/"),
                        context: "./src/static/",
                    },
                ],
            }),
        ],

        experiments: {
            asyncWebAssembly: true,
        },
    };

    if (isProduction) {
        config.optimization.minimize = true;
        config.optimization.minimizer = [new TerserPlugin({ extractComments: false })];
    }

    return config;
};
