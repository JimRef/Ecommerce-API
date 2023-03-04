const Product = require("../Models/productSchema.js");
const auth = require("../auth.js");


module.exports.addProduct = (request, response) =>{
	const userData = auth.decode(request.headers.authorization);
	// console.log(userData)
	if (userData.isAdmin === true) {

		let input = request.body

		let newProduct = new Product({
			productName: input.productName,
			description: input.description,
			price: input.price
		})
		return newProduct.save()
		.then(product =>{
			response.send(product);
		})
		.catch(error => {
			
			return response.send(false);
		})

	} else {

		return response.send(false);
	}
}

module.exports.getAllActiveProduct = (request, response) => {
	
	Product.find({isActive: true})
	.then(result =>{
		return response.send(result)
	})
	.catch(error =>{
		return response.send(error);
	})
}

module.exports.getOneProduct = (request, response) =>{
	let productId = request.params.productId

	Product.findById(productId)
	.then(result =>{
		if (result.isActive === true) {
			return response.send(result)
		} else {
			return response.send(false)
		}
		
	})
	.catch(error => {
		return response.send(error)
	})
}

module.exports.updateProduct = async (request, response) => {
	const userData = auth.decode(request.headers.authorization)
	const productId = request.params.productId;
	const input = request.body;
	if (!userData.isAdmin) {
		return response.send(false)
	} else {
		await Product.findById(productId)
		.then(result =>{
			if (result === null) {
				return response.send(false);
			} else {
				let updatedProduct = {
					productName: input.productName,
					description: input.description,
					price: input.price
				}
				Product.findByIdAndUpdate(productId, updatedProduct, {new:true})
				.then(result => {
					return response.send(result)
				})
				.catch(error => response.send(error))
			}
		})
		.catch(error => response.send(error))
	}
}

module.exports.archiveProduct = (request, response) => {
	const userData = auth.decode(request.headers.authorization)
	const productId = request.params.productId
	const input = request.body

	if (!userData.isAdmin) {
		return response.send(false)
	} else {
		Product.findById(productId)
		.then(result => {
			if (result === null) {
				return response.send(false)
			} else  {
			if (result.isActive === true) {
				let unavail = {isActive:false}		
				Product.findByIdAndUpdate(productId, unavail, {new:true})
				.then(result => response.send(true))
				.catch(error => response.send(false))					
			} else {
				let avail = {isActive:true}
				Product.findByIdAndUpdate(productId, avail, {new:true})
				.then(result => response.send(true))
				.catch(error => response.send(false))		
					}		
			} 
		})
		.catch(error => response.send(false))
	}
}

module.exports.retrieveAllProduct = (request, response) => {
	const userData = auth.decode(request.headers.authorization)

	if (!userData.isAdmin) {
		return response.send(false)
	} else {
		Product.find({})
		.then(result => response.send(result))
		.catch(error => response.send(error))
	}
}