const express = require("express");
const mongoose = require("mongoose");
const port = 4000;
const app = express();

const productRoutes = require("./Routes/productRoutes.js");
const userRoutes = require("./Routes/usersRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const addToCartRoutes = require("./Routes/addtocartRoutes.js");
const cors = require("cors");
// const config = process.env
const config = require('./config.js') 
	mongoose.set('strictQuery', true);
	// [MongoDB connection]
	
	mongoose.connect(`mongodb+srv://${config.DBUSER}:${config.DBPASSWORD}@${config.DBHOST}/${config.DBNAME}?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true
	})

	// for error handling
	let db = mongoose.connection;

	db.on('error', () => console.error.bind(console, "Connection Error!"));

	db.once('open', () => console.log ("We are now Connected to the Cloud."))


// [MIDDLEWARE]
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// [ROUTING]

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/cart", addToCartRoutes);



app.listen(port, () => console.log(`Server is running at port ${port}`));