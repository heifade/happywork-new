module.exports = function getBabelConfig(modules) {
  return {
    presets: [
      [
        "babel-preset-env",
        {
          modules,
          targets: {
            node: "8.11"
          },
          useBuiltIns: false,
          shippedProposals: true,
          debug: false,
          loose: false
        }
      ]
    ],
    plugins: []
  };
};


