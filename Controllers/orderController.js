const Order = require("../Models/orderSchema.js");
const Product = require("../Models/productSchema.js");
const User = require("../Models/usersSchema.js");
const auth = require("../auth.js");

module.exports.createOrder = async(request, response) => {
	const userData = auth.decode(request.headers.authorization)

	const productsId = request.params.productId

	const input = request.body

	if (userData.isAdmin === true) {
		return response.send(false)
	} else {
		await User.findById(userData._id)
		.then(result =>{
			if (result === null) {
				return response.send(false)
			} else {
				Product.findById(productsId)
				.then(result =>{
					if (result === null) {
						return response.send(false)
					} else {
						let order = new Order({
							userId: userData._id,
							products:[{
								productId: result._id,
								quantity: input.quantity
							}],
							
							totalAmount: result.price * input.quantity					
						})
						
						return order.save()
						.then(order => response.send(order))
						.catch(error => response.send(error))
				}
			})
		}
		})	
	}
}

module.exports.retrieveOrder = (request, response) => {
	const userData = auth.decode(request.headers.authorization)

	if (userData.isAdmin === true) {
		return response.send(false)
	} else if (userData === null) {
		return response.send(false)
	} else {
		Order.find({userId: userData._id})
		.then(result => response.send(result))
		.catch(error => response.send(error))
	}
}

module.exports.retrieveAllOrder = (request, response) => {
	const userData = auth.decode(request.headers.authorization)

	if (!userData.isAdmin) {
		return response.send(false)
	} else {
		Order.find({})
		.then(result => response.send(result))
		.catch(error => response.send(error))
	}
}

