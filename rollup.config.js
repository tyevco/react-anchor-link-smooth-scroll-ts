// rollup.config.js
const typescript = require("@rollup/plugin-typescript");

module.exports = {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    dir: "dist",
    format: "cjs",
  },
  plugins: [typescript()],
};
