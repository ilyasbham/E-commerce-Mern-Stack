const express = require('express')
const app = express();
const MiddlewareError = require("./middleware/error")

app.use(express.json());


//importing routes
const product = require('./routes/productRoute');

app.use('/api/v1',product);

//middleware for error 
app.use(MiddlewareError)



module.exports=app;