module.exports = {
    presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript", "@babel/preset-react"],
    plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties"],
    env: {
        production: {
            plugins: ["emotion"],
        },
        development: {
            plugins: [["emotion", { sourceMap: true }]],
        },
    },
};




