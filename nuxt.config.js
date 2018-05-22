require('dotenv').config();

module.exports = {
  build: {
    vendor: ['moment', 'lodash'],
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: ['@nuxtjs/dotenv'],
  env: {
    WS_HOST: process.env.WS_HOST || 'localhost:8000'
  }
};
