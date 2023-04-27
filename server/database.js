const mongoose = require("mongoose")

const connectToDatabase = async () => {
    try {
        mongoose.set("strictQuery", true)
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB connected ${connect.connection.host}`)
    } catch (error) {
        console.log("Error", error.message)
    }
}
module.exports = connectToDatabase