const presets = [
  ["@babel/preset-env", {
    targets: "defaults, IE 11, not dead",
    useBuiltIns: "entry",
    corejs: "^3",
  }],
];

module.exports = { presets };
// target: ["web", "es5"],
// module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: "babel-loader",
//          exclude: "/node_modules/",
//       },
//     ],
//   },
