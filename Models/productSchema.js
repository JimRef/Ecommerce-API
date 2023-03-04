const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	productName:{
		type: String,
		required: [true, "productName is required"]
	},
	description:{
		type: String,
		required: [true, "description is required"]
	},
	price: {
		type: Number,
		required: [true, "price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn:{
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("Product", productSchema);