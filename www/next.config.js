const withCSS = require('@zeit/next-css'),
  withFonts = require('next-fonts'),
  withImages = require('next-images'),
  withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withCSS,
  withFonts,
  withImages,
  {
    target: 'serverless'
  }
]);
