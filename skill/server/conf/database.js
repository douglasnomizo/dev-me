var YAML = require('yamljs');
var neo4j = require('neo4j');

var config = YAML.load('neo4j.yaml');
var connection = new neo4j.GraphDatabase(config);

module.exports = connection;
