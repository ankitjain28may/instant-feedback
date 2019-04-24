const config = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins: [
    ["module-resolver", {
      alias: {
        "app": "./src/app",
        "components": "./src/components",
      }
    }]
  ]
};

module.exports = config;
