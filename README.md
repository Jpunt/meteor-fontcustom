# FontCustom

> Important: This package requires Meteor 1.2 (and it's tested on rc-7)

This package integrates [FontCustom](http://fontcustom.com) with Meteor. It is **not** a replacement for the gem, so you'll still have to install that independently. It uses an awesome [npm-package](https://www.npmjs.com/package/fontcustom) to run the compilation.

## Installation
Make sure you've got FontCustom installed (follow the instructions at: [fontcustom.com](http://fontcustom.com) and run:

```meteor add q42:fontcustom```

## Configuration
The package will be looking for a `fontcustom.yml` in the root of your project. This could be something like this:

```yml
# --------------------------------------------------------------------------- #
# Project Info
#   Defaults shown. Learn more about these options by running
#   `fontcustom help` or visiting <http://fontcustom.com>.
# --------------------------------------------------------------------------- #

font_name: fontcustom
css_selector: .icon-{{glyph}}
preprocessor_path: "/fonts/"
autowidth: false
no_hash: false
force: false
debug: false
quiet: false

# --------------------------------------------------------------------------- #
# Input Paths
# --------------------------------------------------------------------------- #

input:
  vectors: client/svgs

# --------------------------------------------------------------------------- #
# Output Paths
# --------------------------------------------------------------------------- #

output:
  fonts: public/fonts
  preview: public/fonts
  css: client/styles

# --------------------------------------------------------------------------- #
# Templates
#   Included in Font Custom: preview, css, scss, scss-rails
#   Custom templates should be saved in the INPUT[:templates] directory and
#   referenced by their basename.
# --------------------------------------------------------------------------- #

templates:
 - scss
 - preview

```

This will assume that your SVG's are in `client/svgs` and when you run your server, the compiled fonts will be waiting for you in `public/fonts`. An additional `_fontcustom.scss` will be placed in `client/styles` and a nice preview will be available at [localhost:3000/fonts/fontcustom-preview.html](http://localhost:3000/fonts/fontcustom-preview.html).

### Notes
- `fontcustom.yml` should always be in the root of your project
- SVG's should be placed where they get picked up by Meteor, so `public` won't work
- The output-path should be in `public`, so that they'll be statically available for the client
- For more options, refer to [fontcustom.com](http://fontcustom.com)
- This package requires Meteor 1.2 (and it's tested on rc-7)
