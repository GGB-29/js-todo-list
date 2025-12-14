const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js", 
    output: {
        filename: "main.js", 
        path: path.resolve(__dirname, "dist"), 
        clean: true,
    }, 
    plugins: [
        new HtmlWebpackPlugin({ 
            template: "./src/home.html", 
        }), 
    ], 
    module: {
        rules: [
            {
                test: /\.gif$/,
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                            },
                        },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000, // Inlines files smaller than 10KB as DataURLs
                        },
                    },
                ],
            },
            {
                test: /\.css$/i, 
                use: ["style-loader", "css-loader"], 
            }, 
            {
                test: /\.html$/i, 
                loader: "html-loader", 
            }, 
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, 
                type: "asset/resource", 
            }, 
        ], 
    }, 
};