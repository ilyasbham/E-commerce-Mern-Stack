const express = require('express')
const app = express();
const MiddlewareError = require("./middleware/error")
const swaggerDocs = require("./config/swagger");
const cookieParser = require('cookie-parser');


//cookie parser
//to get token from cookie
app.use(cookieParser());

//using middleware
//json data ko read krne k liye
app.use(express.json());


//importing routes
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

//using routes
//http://localhost:5000/api/v1/products
app.use('/api/v1',product);
app.use('/api/v1',user);

//middleware for error 
app.use(MiddlewareError)

// after defining routes
swaggerDocs(app);

module.exports=app;