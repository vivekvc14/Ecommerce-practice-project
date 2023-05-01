const express = require("express")
const connectToDatabase = require("./database")
require("dotenv").config()

const app = express()
connectToDatabase()
app.use(express.json())

const productRoutes = require("./routes/product")
const userRoutes = require("./routes/user")
const orderRoutes = require("./routes/order")

app.use("/product", productRoutes)
app.use("/user", userRoutes)
app.use("/order", orderRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})