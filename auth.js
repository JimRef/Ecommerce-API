const jwt = require("jsonwebtoken");

const secret = "BogsEservicesAPI";


// [Creation of Access Token]
module.exports.accessToken = (user) => {

	const data = {
		_id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {})
}
// [ For Verifying]
module.exports.verify = (request, response, next) =>{
 	let token = request.headers.authorization;

 	if (typeof token !== "undefined") {

 		token = token.slice(7, token.length);

 		return jwt.verify(token, secret, (error, data) =>{
 			if (error) {
 				return response.send({auth: "Failed"})
 			} else {
 				next();
 			}
 		})
 	} else {
 		return response.send({auth: "failed"});
 	}	
}

// [For Decoding]
module.exports.decode = (token) => {
	if(typeof token !== undefined){
		
		token = token.slice(7, token.length)
		
		return jwt.verify(token, secret, (error, data) => {
			if (error) {
				console.log(error)
				return null
			} else {
				return jwt.decode(token, {complete:true}).payload;
			}
		})
	} else {
		return null
	}
}