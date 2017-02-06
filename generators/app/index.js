'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var slugify = require('slugify');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the supreme ' + chalk.red('generator-react-thundr-gae') + ' generator!'
    ));

    var prompts = [
      {
        name: 'project',
        message: 'What is the name of this project?'
      },
      {
        name: 'gitPath',
        message: 'What is the HTTPS git path for this project?'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var context = Object.assign({
      _: _,
      slugify: slugify
    }, this.props);

    this.fs.copyTpl(
      this.templatePath('_pom.xml'),
      this.destinationPath('pom.xml'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      context
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('java-version'),
      this.destinationPath('.java-version')
    );
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
    this.fs.copy(
      this.templatePath('etc'),
      this.destinationPath('etc')
    );

    mkdirp('src/test/java/');
    mkdirp('src/test/java/');
    mkdirp('src/main/static/');
    mkdirp('src/main/static/fonts');
    mkdirp('src/main/static/images');
  },

  install: function () {
    this.spawnCommand('mvn', ['install']);
  }
});
