var db = require('../database/neo4j_connection.js');
var parser = require('body-parser').urlencoded({ extended: false });

var router = function (app) {

  app.get('/skills', function(req, res) {
    db.cypher(
      { query: 'MATCH (skills:Skill) return skills' },
      function(err, results) {
        if (err) throw err;
        res.json(results.map(function(e) { return e.skills; }));
      }
    );
  });

  app.get('/skills/:name', function(req, res) {
    db.cypher({
        query: 'MATCH (n { name: {name} }) return n',
        params: { name: req.params.name }
      }, function(err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.post('/skills', parser, function(req, res) {
    db.cypher({
        query: 'create (n:Skill { name: {name} }) return n',
        params: { name: req.body.name }
      }, function(err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.delete('/skills/:name', function(req, res) {
    db.cypher({
        query: 'MATCH (n { name: {name} }) DETACH DELETE n',
        params: { name: req.params.name }
      }, function(err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });
};

module.exports = router;
