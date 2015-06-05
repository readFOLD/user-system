var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
  "summary": "User account creation and update methods etc..",
  "version": "0.1.1",
  "git": "https://github.com/readFOLD/user-system",
  "name": "fold:user-system"
});

var packagesJsonFile = path.resolve('./packages.json');
try {
  var fileContent = fs.readFileSync(packagesJsonFile);
  var packages = JSON.parse(fileContent.toString());
  Npm.depends(packages);
} catch (ex) {
  console.error('ERROR: packages.json parsing error [ ' + ex.message + ' ]');
}

Package.onUse(function (api) {
  configure(api);
  api.export('Schema', ['client', 'server']);
});

function configure(api) {
  api.versionsFrom('METEOR@1.1.0.1');
  api.use('aldeed:collection2@2.3.0');
  api.use('lepozepo:cloudinary@3.0.0');
  //meteorhacks:npm                    1.3.0  Use npm modules with your Meteor App
  //mystor:device-detection            0.2.0  Client-Side Device Type Detection & Template Switching with Opti...
  //npm-container                      1.0.0+ Contains all your npm dependencies
  //percolatestudio:segment.io         1.1.1_1* Segment.io integration for Meteor (works on both client and se...
  api.use('reactive-dict@1.1.0');
  api.use('reactive-var@1.0.5');
  api.use('service-configuration@1.0.4');
  api.use('underscore@1.0.3');
  api.use('wizonesolutions:underscore-string@1.0.0');


  api.addFiles([
    'lib/methods.js',
    'lib/collections.js'
  ], ['client', 'server']);

  api.addFiles([
    'server/methods.js',
    'server/publications.js'
  ], ['server']);
}
