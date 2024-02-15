const mongoose = require('mongoose')
 
require("dotenv").config()

exports.dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( () => {console.log("DB Conncted Successfully")})
    .catch( (error) => {
        console.log("DB Connection issue");
        console.error(error);
        process.exit(1);
    });

}