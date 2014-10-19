var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mongoose-promised-test");

var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Zildjian' });

kitty.save(function (err) {
  if (err){
  	console.log(err);
  }

  console.log('meow');
});