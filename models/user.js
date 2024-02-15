const mongoose = require("mongoose");



const medicalinfoSchema = new mongoose.Schema({
 

    medicalName:{
        type:String,
        require:true,
        trim:true
     },
    licenceNumber:{
        type:Number,
        require:true,
        trim:true
    },
    countryName:{
        type:String,
        require:true,
        trim:true
    },
    stateName:{
        type:String,
        require:true,
        trim:true
    },
    cityName:{
        type:String,
        require:true,
        trim:true
    },
    postalCode:{
        type:Number,
        require:true,
        trim:true
    },
   
    
});
const stockSchema = new mongoose.Schema({
   
    
    batchNumber:{
        type:String,
        require:true,
        trim:true
    },
    medecineName:{
        type:String,
        require:true,
        trim:true
    },
    category:{
        type:String,
        require:true,
        trim:true
    },
    expiryDate:{
        type:Date,
        require:true,
        trim:true
    },
    maxRetailPrice:{
        type:Number,
        require:true,
        trim:true
    },
    discount:{
        type:Number,
        require:true,
        trim:true
    },
   availablestock:{
    type:Number,
    require:true,
    trim:true
   },
    price:{
        type:Number,
        require:true,
        trim:true
    },
    rackNumber:{
        type:Number,
        require:true,
        trim:true
    },
    description:{
        type:String,
        require:true,
        trim:true
    },
    openStock:{
        type:Number,
        require:true,
        trim:true
    },
  
    reorderLevel:{
        type:Number,
        require:true,
        trim:true
    },
   
   
   
   
   
});




// Parent Schema: personalinfo
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
     },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim:true
    },
    medicalName:{
        type:String,
        require:true,
        trim:true
     },
    licenceNumber:{
        type:String,
        require:true,
        trim:true
    },
    countryName:{
        type:String,
        require:true,
        trim:true
    },
    stateName:{
        type:String,
        require:true,
        trim:true
    },
    cityName:{
        type:String,
        require:true,
        trim:true
    },
    postalCode:{
        type:Number,
        require:true,
        trim:true
    },
    stock:[stockSchema]
  

});




module.exports = mongoose.model("User", userSchema);

