# mongoose-promised

[Mongoose][mongoose] with [Q promise][q] support.

## Getting started

	// reference mongoose-promised
	var mongoose = require('mongoose-promised');

	// create a sample customer schema and model
	var Schema = mongoose.Schema;
	var customerSchema = new Schema({
			email: { type: String, required: true },
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			address: { type: String, required: false }
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
