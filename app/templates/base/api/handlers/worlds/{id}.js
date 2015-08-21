var worlds = require('../../../services/worlds');

module.exports = {
  get: function(req, res) {
    worlds.findWorldById(req.params.id, function(err, world) {
      res.json(world);
    });
  }
};
