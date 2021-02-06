module.exports = {
    presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-typescript", "@babel/preset-react"],
    plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"],
    env: {
        production: {
            plugins: ["emotion"],
        },
        development: {
            plugins: [["emotion", { sourceMap: true }]],
        },
    },
};
