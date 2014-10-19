# mongoose-promised

[Mongoose][mongoose] with [Q promise][q] support.

For example consider the following [Mongoose][mongoose] code:

	var mongoose = require('mongoose');
	mongoose.connect("mongodb://localhost/test");

	var Cat = mongoose.model('Cat', { name: String });
	var kitty = new Cat({ name: 'Zildjian' });

	kitty.save(function (err) {
	  if (err){
	  	console.log(err);
	  }

	  console.log('meow');
	});

Instead of calling the default mongoose `save` method you can call mongoose-promised `saveQ` method that returns a [Q promise][q] :

	var mongoose = require('mongoose-promised')
	mongoose.connect("mongodb://localhost/test");

	var Cat = mongoose.model('Cat', { name: String });
	var kitty = new Cat({ name: 'Zildjian' });

	kitty.saveQ()
		.then(function(){
			console.log('meow');
		})
		.fail(function (err) {
			console.log(err);
	  });


## Callback to promise

For each [Mongoose][mongoose] async methods that returns a callback *mongoose-promised* creates an equivalent method with the Q suffix (like saveQ, findQ, ...) that using `Q.npost` returns the corresponding promise. See [Q promise][q] for more info about `npost`.

Usually a callback with the following signature `function (err, result)` is converted into a promise that when resolved returns the result. For example 

	var cat = Cat
		.where({name: 'Zildjian'})
		.findOneQ();

`cat` variable is a promise that when resolved will contain the actual cat document.

*NOTE*: Some mongoose callbacks have a different signature, with multiple arguments. For example the `save` method has the following callback signature `function (err, document, numberAffected)`.
In this case the returned promise returns an array of 2 elements with `document` and `numberAffected`. Usually in these cases you can use the `Q.spread` method that convert the array into arguments:

	var kitty = new Cat({ name: 'Zildjian' });
	var cat = kitty.saveQ()
		.spread(function (document, numberAffected){
			return document;
		});

See [Mongoose API documentation](http://mongoosejs.com/docs/api.html) for information about callback and to understand what kind of promise is available.

## Connect to mongo database

A special case of asynchronous method is a the `connect` method. Usually with mongoose you don't have to wait that the connection is ready. You can simply call the `connect` method and then at the first access if the connection is still not ready the operation will automatically wait. Otherwise you should use the `mongoose.connection.on/once` method. For a better consistency I have also added a `connectQ` method that like any other async method returns a promise resolved when the connection is ready.

	var connected = mongoose.connectQ("mongodb://localhost/database-name");

	connected.then(function(){
			// connection is ready
		});

## Converted methods

Currently the following async methods are available:

mongoose.Query.prototype:

- findQ
- findOneQ
- countQ
- removeQ

mongoose.Model.prototype

- saveQ
- removeQ

Other methods can be easily added and will be available soon.

## Full example

Here a complete example

	// reference mongoose-promised
	var mongoose = require('mongoose-promised');

	// create a sample customer schema and model
	var Schema = mongoose.Schema;
	var customerSchema = new Schema({
			email: { type: String, required: true },
			firstName: { type: String, required: true },
			lastName: { type: String, required: true }
		});
	customerSchema.index({ email: 1 }, { name: 'key', unique: true });
	var CustomerModel = mongoose.model("Customer", customerSchema, "customers");	

	// connect to mongodb
	var connected = mongoose.connectQ("mongodb://localhost:27017/database-name");

	connected.then(function(){
		var model = new CustomerModel({
			email:"davide.icardi@gmail.com",
			firstName:"Davide",
			lastName:"Icardi"
		});

		var customer = model.saveQ()
			.spread(function (document, numberAffected){
				return document;
			});
	});



## License

The MIT License (MIT)

Copyright (c) 2014 Davide Icardi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




[mongoose]: http://mongoosejs.com/
[q]: https://github.com/kriskowal/q
[mongoose-q]: https://github.com/iolo/mongoose-q
