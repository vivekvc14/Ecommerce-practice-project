const express = require("express")
const connectToDatabase = require("./database")
require("dotenv").config()

const app = express()
connectToDatabase()
app.use(express.json())

const productRoutes = require("./routes/product")
app.use("/product", productRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})