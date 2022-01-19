const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:dbUser@backend.guc9o.mongodb.net/Backend?retryWrites=true&w=majority"

const connectDB = async() => {
    await mongoose.connect(URI);
    console.log("DB connected!!!....");
}


module.exports = connectDB;