var db = require('../database.js');
var parser = require('body-parser').urlencoded({ extended: false });

var router = function (app) {

  app.get('/skills', function(req, res) {
    db.cypher(
      { query: 'MATCH (skill:Skill) return skill' },
      function(err, results) {
        if (err) throw err;
        res.json(results.map(function(e) { return e.skill; }));
      }
    );
  });

  app.post('/skills', parser, function(req, res) {
    db.cypher({
        query: 'create (a:Skill { name: {name} })',
        params: { name: req.body.name }
      }, function(err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.delete('/skills/:name', function(req, res) {
    db.cypher({
        query: 'create (a:Skill { name: {name} })',
        params: { name: req.body.name }
      }, function(err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });

};

module.exports = router;


// elasticsearch.host_name=http://localhost:9200
// elasticsearch.index_spec=people:Person(first_name,last_name), places:Place(name)
