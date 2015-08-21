var worlds = require('../../services/worlds');

module.exports = {
  get: function(req, res) {
    worlds.findWorlds(req.query, function(err, worlds) {
      res.json(worlds);
    });
  }
};
