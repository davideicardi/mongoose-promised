var mongoose = require('./../mongoose-promised.js'); // require('mongoose-promised')
mongoose.connect("mongodb://localhost:27017/mongoose-promised-test");

var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Zildjian' });

kitty.saveQ()
	.then(function(){
		console.log('meow');
	})
	.fail(function (err) {
		console.log(err);
  });
