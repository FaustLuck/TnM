import { resolve, join } from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = resolve();
const mode = process.env.NODE_ENV;
const isProd = mode === "production";
export default {
  entry: resolve(__dirname, "./index.js"),
  output: {
    filename: "[name].[contenthash].js",
    path: resolve(__dirname, "docs"),
    publicPath: isProd ? "./" : "",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]"
  },
  devServer: {
    static: {
      directory: join(__dirname, "src"),
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
        type: isProd ? "asset" : "asset/inline",
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