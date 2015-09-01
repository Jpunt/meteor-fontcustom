var path = Npm.require('path');
var fs   = Npm.require('fs');

var _ = Npm.require('underscore');
var yaml = Npm.require('yamljs');

var fontcustom;
try {
  fontcustom = Npm.require('fontcustom');
} catch(err) {
  console.log('Could not load FontCustom');
}

var CONFIG_FILE_NAME = 'fontcustom.yml';
var config;

/*
 * Compile FontCustom
 */
var fontCustomBusy;
function compile(compileStep) {
  if(!config) {
    return;
  }

  if(!fontcustom) {
    return;
  }

  var dir;
  try {
    dir = fs.readdirSync(config.input.vectors);
  } catch(err) {
    compileStep.error({ sourcePath:compileStep.inputPath, message:'Could not read input-dir' });
    return;
  }

  var svgs = _.filter(dir, function(file) {
    return path.extname(file) === '.svg';
  });
  if(svgs.length === 0) {
    compileStep.error({ sourcePath:compileStep.inputPath, message:"Could not find any SVG's to compile" });
    return;
  }

  if(fontCustomBusy) {
    return;
  }

  try {
    fontcustom(config)
      .then(function() {
        fontCustomBusy = false;
      })
      .catch(function(err) {
        fontCustomBusy = false;
      });
  } catch(err) {
    console.log('Failed to compile FontCustom');
  }
}

/*
 * ymlHandler
 * Some *.yml is changed, check if it's fontcustom.yml, read it, then compile
 */
var ymlHandler = function(compileStep) {
  if(compileStep.inputPath !== CONFIG_FILE_NAME) {
    return;
  }

  try {
    config = yaml.parse(compileStep.read().toString('utf8'));
  } catch(err) {
    compileStep.error({ sourcePath:compileStep.inputPath, message:'Could not parse config' });
    return;
  }

  compile(compileStep);
};

/*
 * svgHandler
 * Some *.svg is changed, try to compile
 */
var svgHandler = function(compileStep) {
  compile(compileStep);
};

/*
 * Register source handlers
 */
Plugin.registerSourceHandler("yml", { archMatching: 'web' }, ymlHandler);
Plugin.registerSourceHandler("svg", { archMatching: 'web' }, svgHandler);
