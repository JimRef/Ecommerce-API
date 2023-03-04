const mongoose = require("mongoose");

const addtocartSchema = new mongoose.Schema({
	userId:{
		type: String,
		required:[true,"userId is required!"]
	},
	products: [
			{
				productId:{
					type: String
					
				},
				quantity:{
					type: Number,
					default: "1"
				}
			}
		],
	totalAmount:{
		type: Number,
		default: 0
	}
})

module.exports = mongoose.model("Cart", addtocartSchema);