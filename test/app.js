'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-react-thundr-gae:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['skip-install'])
      .withPrompts({project: 'Test Project'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'pom.xml',
      'webpack.config.js',
      'README.md',
      '.editorconfig',
      '.gitignore',
      '.java-version',
      'tsconfig.json',
      'tslint.json',
      'src/main/java/ApplicationModule.java',
      'src/main/java/controller/Controller.java',
      'src/main/java/controller/Routes.java',
      'src/main/resources/application.properties',
      'src/main/static/images/favicon/original.png',
      'src/main/static/index.ejs',
      'src/main/static/less/mixins/mixins.less',
      'src/main/static/less/mixins/variables.less',
      'src/main/static/less/styles/main.less',
      'src/main/static/typescript/components/App.tsx',
      'src/main/static/typescript/components/Hello.tsx',
      'src/main/static/typescript/globals.d.ts',
      'src/main/static/typescript/index.tsx',
      'src/main/webapp/WEB-INF/appengine-web.xml',
      'src/main/webapp/WEB-INF/datastore-indexes.xml',
      'src/main/webapp/WEB-INF/logging.properties',
      'src/main/webapp/WEB-INF/web.xml',
      'etc/3wks-eclipse-formatter.xml',
      'etc/3wks-eclipse.importorder',
      'etc/3wks-intellij-formatter.xml'
    ]);
  });
});
