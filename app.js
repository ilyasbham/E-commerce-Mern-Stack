const express = require('express')
const app = express();
const MiddlewareError = require("./middleware/error")
const swaggerDocs = require("./swagger");




app.use(express.json());


//importing routes
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use('/api/v1',product);
app.use('/api/v1',user);

//middleware for error 
app.use(MiddlewareError)

// after defining routes
swaggerDocs(app);

module.exports=app;