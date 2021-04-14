module.exports = {
  // filenameHashing: false,
  // chainWebpack: config => {
  //   config.plugins.delete('html')
  //   config.plugins.delete('preload')
  //   config.plugins.delete('prefetch')
  // }
  devServer: {
    proxy: 'http://localhost:4000',
  },
};
