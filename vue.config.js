module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/global/variables.scss";`,
      },
    },
  },
};
