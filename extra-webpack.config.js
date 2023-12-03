module.exports = {
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".ts"],
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
      a: false,
    },
  },
  mode: "production",
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        loader: "base64-loader",
        type: "javascript/auto",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
};
