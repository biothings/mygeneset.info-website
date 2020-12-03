module.exports = {
  publicPath: process.env.NETLIFY ? "" : "/mygeneset.info-website/",
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
