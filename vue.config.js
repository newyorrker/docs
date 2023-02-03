const { defineConfig } = require('@vue/cli-service')

const isDevelop = process.env.NODE_ENV === 'development';

module.exports = defineConfig({
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: '',
  pages: {
    documents: {
      entry: 'src/entries/documents.ts'
    },
    applications: {
      entry: 'src/entries/applications.ts'
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
});
