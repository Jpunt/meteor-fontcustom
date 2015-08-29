var _ = Npm.require('underscore');
var yaml = Npm.require('yamljs');
var fontcustom = Npm.require('fontcustom');

Plugin.registerCompiler({
  extensions: ["svg"],
  filenames: ["fontcustom.yml"]
}, function () {
  var compiler  = new FontCustomCompiler();
  return compiler;
});

function FontCustomCompiler() {}

FontCustomCompiler.prototype.processFilesForTarget = function(files) {
  var self = this;

  if(self.busy) return;
  self.busy = true;

  var configYml = _.find(files, function(file) {
    return file.getBasename() === 'fontcustom.yml';
  });

  if(!configYml) {
    return; // No config found, fail silently
  }

  var config;
  try {
    config = yaml.parse(configYml.getContentsAsString());
  } catch(err) {
    return configYml.error({ message:'Could not parse config' });
  }

  var svgs = _.chain(files)
    .filter(function(file) {
      return file.getBasename() !== 'fontcustom.yml';
    })
    .filter(function(file) {
      return file.getDirname() === config.input.vectors;
    })
    .value();

  if(svgs.length === 0) {
    return console.log("Could not find any SVG's to compile");
  }

  fontcustom(config)
    .then(function() {
      self.busy = false;
    })
    .catch(function(err) {
      svgs[0].error({ message: 'FontCustom failed:' + err });
      self.busy = false;
    });
};
