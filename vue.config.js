// vue.config.js
const process = require("node:process");
// vant
const { VantResolver } = require("unplugin-vue-components/resolvers");

module.exports = function () {
  return import("@unocss/webpack").then(({ default: UnoCSS }) => ({
    publicPath: process.env.NODE_ENV === "development" ? "" : "./",
    transpileDependencies: true,
    devServer: {
      client: {
        overlay: false,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    configureWebpack: {
      devtool: "inline-source-map",
      plugins: [
        require("unplugin-auto-import/webpack").default({
          imports: [
            "vue",
            "vue-router",
            "@vueuse/core",
            "pinia",
            {
              "@iceywu/utils": ["to", "list", "sleep"],
            },
          ],
          resolvers: [],
          dirs: ["./src/composables"],
          dts: "./auto-imports.d.ts",
        }),
        require("unplugin-vue-components/webpack").default({
          resolvers: [VantResolver()],
        }),
        UnoCSS(),
      ],
      optimization: {
        realContentHash: true,
      },
    },
    chainWebpack(config) {
      config.module.rule("vue").uses.delete("cache-loader");
      config.module.rule("tsx").uses.delete("cache-loader");
      config.merge({
        cache: false,
      });
    },
    css: {
      extract:
        process.env.NODE_ENV === "development"
          ? {
              filename: "css/[name].css",
              chunkFilename: "css/[name].css",
            }
          : true,
    },
  }));
};
