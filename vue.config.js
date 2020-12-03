module.exports = {
  publicPath: process.env.NETLIFY === true ? "" : "/mygeneset.info-website/",
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
