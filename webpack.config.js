const resolve = require("path").resolve;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const url = require("url");
const publicPath = "";

module.exports = (options = {}) => ({
  // --------------------- vue异步组件 配置
  watch: true, //监听变化自动编译
  // ---------------------
  entry: {
    vendor: "./src/vendor",
    index: "./src/main.js"
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: options.dev ? "[name].js" : "[name].js?[chunkhash]",
    chunkFilename: "[id].js?[chunkhash]",
    publicPath: options.dev ? "/assets/" : publicPath
  },
  module: {
    // ---------------------------------
    // loaders: [
    //   {
    //     test: /\.vue$/, //解析vue模板
    //     loader: "vue-loader"
    //   },
    //   {
    //     test: /\.js$/, //js转换
    //     exclude: /(node_modules)/,
    //     loader: "babel-loader",
    //     query: {
    //       presets: ["es2015"]
    //     }
    //   },
    //   {
    //     test: /\.css$/, //css转换
    //     loader: "vue-style!css"
    //   }
    // ],
    //   vue: {
    //     loaders: {
    //         css: 'vue-style!css',
    //     }
    // }
    // ---------------------------------
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["less-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        // use: ["svg-sprite-loader"],
        //使用这个loader需要下载此模块
        include: [resolve("src/icons")],
        options: {
          symbolId: "icon-[name]"
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  resolve: {
    alias: {
      // "~": resolve(__dirname, "src")
      "@": resolve(__dirname, "src")
    },
    extensions: [".js", ".vue", ".json", ".css"]
  },
  devServer: {
    host: "127.0.0.1",
    port: 8010,
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? "/assets/" : publicPath).pathname
    }
  },
  devtool: options.dev ? "#eval-source-map" : "#source-map"
  // configureWebpack: {
  //   // provide the app's title in webpack's name field, so that
  //   // it can be accessed in index.html to inject the correct title.
  //   name: name,
  //   resolve: {
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   }
  // },
});
