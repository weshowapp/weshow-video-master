var thinkjs = require('thinkjs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: 'development'
});

app.use(bodyParser.urlencoded({ limit:'50mb',extended:true}));
app.use(bodyParser.json({limit:'50mb'}));

// Build code from src to app directory.
instance.compile({
	log: true,
	presets: [],
	plugins: []
});

instance.run();
