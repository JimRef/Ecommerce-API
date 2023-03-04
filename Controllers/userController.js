const mongoose = require("mongoose");
const User = require("../Models/usersSchema.js");
// const Order = require("../Models/orderSchema.js");
// const Product = require("../Models/productSchema.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

module.exports.userRegister = async (request, response) => {
	let input = request.body;

	await User.findOne({email: input.email})
	.then(result => {
		if (result !== null) {
			return response.send(false)
		} else {
			let newUser = new User({
				firstName: input.firstName,
				lastName: input.lastName,
				email: input.email,
				password: bcrypt.hashSync(input.password, 10),
				mobileNo: input.mobileNo
			})
			newUser.save()
			.then(save => {
				return response.send(true)
			})
			.catch(error =>{
				return response.send(error)
			})
		}
	})
	.catch(error => {
		return response.send(error)
	})
}

module.exports.userAuthentication = (request, response) =>{
	let input = request.body;

	User.findOne({email: input.email})
	.then(result =>{
		if (result === null) {
			return response.send(false)
		} else {
			
			const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

			if (isPasswordCorrect) {
				return response.send({auth: auth.accessToken(result)})
			} else {
				return response.send(false);
			}
		}
	})
	.catch(error => {
		return response.send(error)
	})
}

module.exports.getUserProfile = (request, response) => {
	const userData = auth.decode(request.headers.authorization);

	User.findById(userData._id)
	.then(result => {
		result.password = "";
		return response.send(result);
	})
	.catch(error =>{
		return response.send(error);
	})
}


module.exports.setAsAdmin = (request, response) => {
	const userData = auth.decode(request.headers.authorization)
	const userId = request.params.userId
	const input = request.body

	if (!userData.isAdmin) {
		return response.send(false)
	} else {
		User.findById(userId)
		.then(result =>{
			if (result === null) {
				return response.send(false)
			} else {
				let admin = {
					isAdmin: input.isAdmin
				}
				User.findByIdAndUpdate(userId, admin, {new:true})
				.then(result => {
					result.password ="";
					response.send(result)
				})
				.catch(error => response.send(error))
			}
		})
		.catch(error => response.send(error))
	}
}