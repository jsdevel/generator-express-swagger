var service = require('../../services/worlds');

describe('worlds service', function() {
  describe('.findWorldById()', function() {
    it('should find a world by id', function(done) {
      service.findWorldById(1,  function(err, world) {
        world.name.should.equal('Earth');
        done(err);
      });
    });
  });

  describe('.findWorlds', function() {
    it('should return all worlds', function(done) {
      service.findWorlds(null, function(err, worlds) {
        worlds.length.should.equal(2);
        done(err);
      });
    });

    it('should ignore an empty query', function(done) {
      service.findWorlds({}, function(err, worlds) {
        worlds.length.should.equal(2);
        done(err);
      });
    });

    it('should find worlds by color', function(done) {
      service.findWorlds({color: 'Orange'}, function(err, worlds) {
        worlds.length.should.equal(1);
        worlds[0].name.should.equal('Saturn');
        done(err);
      });
    });
  });
});
