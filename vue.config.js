module.exports = {
  publicPath: "/mygeneset.info-website/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/variables.scss";
        `
      }
    }
  }
};
