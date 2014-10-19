"use strict";

var mongoose = require('./../mongoose-promised.js'); // require('mongoose-promised')

var Schema = mongoose.Schema;

var customerSchema = new Schema({
		email: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		address: { type: String, required: false }
	});
customerSchema.index({ email: 1 }, { name: 'key', unique: true });

var CustomerModel = mongoose.model("Customer", customerSchema, "customers");

module.exports = CustomerModel;