Package.describe({
  name: 'q42:fontcustom',
  version: '0.0.1',
  summary: 'Compile FontCustom as soon as your SVGs change.',
  git: '',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "fontcustom",
  sources: [
    'fontcustom.js'
  ],
  npmDependencies: {
    "yamljs": "0.2.3",
    "fontcustom": "0.0.3"
  }
});

Package.onUse(function(api) {
  api.use('isobuild:compiler-plugin@1.0.0');
});
