Package.describe({
  name: 'q42:fontcustom',
  version: '0.0.2',
  summary: "Automatically compile FontCustom when you change SVG's",
  git: 'https://github.com/Jpunt/meteor-fontcustom.git',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "fontcustom",
  sources: [
    'fontcustom.js'
  ],
  npmDependencies: {
    "yamljs": "0.2.3",
    "fontcustom": "0.0.3",
    "underscore": "1.8.3"
  }
});
