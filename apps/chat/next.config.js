/** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  transpilePackages: ['theme'],
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: "chat",

          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./App": "./src/index.tsx",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};
