const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	userId:{
		type: String,
		required:[true,"userId is required!"]
	},
	products: [
			{
				productId:{
					type: String,
					required: [true, "product id is required"]
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
	},
	purchasedOn:{
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("Order", orderSchema);