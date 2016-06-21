var mongoose = require('mongoose');
var cls = require('continuation-local-storage');

mongoose.connect('mongodb://localhost/test');

var Location = mongoose.model('Location', { name: String });

var xz = new Location({ name: 'Tibetan' });

var ns = cls.createNamespace('session');

ns.run(function(){
  ns.set('context', 'I am context value, you got it!');
  xz.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved sucessfully');
    }
    var nsGot = cls.getNamespace('session');
    var vGot = nsGot.get('context');
    console.log('value got from cls:' + vGot);
  });
})

