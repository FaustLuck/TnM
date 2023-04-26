import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.resolve();
const mode = process.env.NODE_ENV;
const isProd = mode === "production";

export default {
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    publicPath: isProd ? "./" : "",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
      watch: true,
    }
  },
  stats: {
    children: true
  },
  ...(!isProd && {devtool: "source-map"}),
  mode,
  target: (isProd) ? "browserslist" : "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_module/,
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (isProd) ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env"
                ]
              }
            }
          },
          "sass-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: false,
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      scriptLoading: "module",
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    })
  ]
};