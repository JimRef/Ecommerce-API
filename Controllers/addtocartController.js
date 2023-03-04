const Product = require("../Models/productSchema.js");
const User = require("../Models/usersSchema.js");
const Cart = require("../Models/addtocartSchema.js")
const auth = require("../auth.js");

module.exports.addToCart = async (request,response) => {
	const userData = auth.decode(request.headers.authorization)

	const productsId = request.params.productId

	const input = request.body

	if (userData.isAdmin === true) {
		return response.send("You don't have access to this page!")
	} else {
		await Cart.findOne({userId: userData._id})
		.then(result =>{
			if (result !== null) {
				Product.findById(productsId)
						.then(result => {
							if (result !== null) {
								let total = input.quantity * result.price;
								
								result.products.push({productId: result._id})
								result.products.push({quantity: input.quantity})
								// result.totalAmount.push({totalAmount: total})

								return result.save()
								
							} else {

								return response.send("Product not found")

							}
						})
					}
		return response.send(result)
		})
	} 
					
}
/*User.findById(userData._id)
				.then(result =>{
					if (result === null) {
						return false*/
		
/*	 else {
						if (userData._id !== null) {
							Cart.findById({userId: userData._id})
							.then(result =>{
								if (result !== null) {
									Product.findById(productsId)
									.then(result => {
										let total = input.quantity * result.price

										result.products.push({productId: result._id, quantity: input.quantity, totalAmount: total})


									})
								}
								return response.send(result)
							})

						}
						
					}

					let order = new Order({
									userId: userData._id,
									products:[{
										productId: result._id,
										quantity: input.quantity
										}],
									totalAmount: result.price * input.quantity	
								})
							return order.save()
							.then(save => response.send(order))
							.catch(error => response.send(error))


*/