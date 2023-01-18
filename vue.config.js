const isDevelop = process.env.NODE_ENV === 'development';

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: isDevelop ? '/' : '/pdf-view-app/dist',
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
};
