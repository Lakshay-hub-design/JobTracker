const mongoose = require('mongoose');

function connectDb (){    
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongodb connected")
    })
    .catch((err)=>{
        console.error(err)
        process.exit(1)
    })
}

module.exports = connectDb