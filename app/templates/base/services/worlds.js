var worlds = require('../resources/world-data.json');
var byPropValue = require('array-predicates/byPropValue');

module.exports = {
  findWorldById: function(id, cb) {
    var response = worlds.filter(byPropValue('id', id));
    setTimeout(cb.bind(null, null, response[0]), 500);
  },

  findWorlds: function(query, cb) {
    var response;

    if (query && query.color) {
      response = worlds.filter(byPropValue('color', query.color));
    } else {
      response = worlds;
    }

    setTimeout(cb.bind(null, null, response), 500);
  }
};
