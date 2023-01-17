const { defineConfig } = require("@vue/cli-service");

const isDevelop = process.env.NODE_ENV === 'development';

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: isDevelop ? '/' : '/docs/dist'
});
