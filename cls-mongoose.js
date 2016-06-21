var mongoose = require('mongoose');
var cls = require('continuation-local-storage');
var clsMongoose = require('cls-mongoose');

mongoose.connect('mongodb://cls_test:cls_test@localhost:27017/cls_test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected');
});

var Location = mongoose.model('Location', {name: String});

var xizang = new Location({name: 'Tibetan'});

var ns = cls.createNamespace('session');
clsMongoose(ns);

ns.run(function () {
    console.log('saving context value');
    ns.set('context', 'I am context value, you got it!');
    xizang.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved sucessfully');
        }
        var nsGot = cls.getNamespace('session');
        var vGot = nsGot.get('context');
        console.log('reading context value');
        console.log('value got from cls:' + vGot);
    });
});

