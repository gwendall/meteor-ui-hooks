Package.describe({
  name: 'gwendall:ui-hooks',
  summary: 'A simpler API for Blaze _uihooks',
  git: 'https://github.com/gwendall/meteor-ui-hooks.git',
  version: '0.1.6'
});

Package.onUse(function (api, where) {

  api.use([
    'templating@1.1.1',
    'jquery@1.11.3_2'
  ], 'client');

  api.addFiles([
    'lib.js',
  ], 'client');

});
