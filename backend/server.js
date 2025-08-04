const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()

app.use(cors());
app.use(express.json())

app.get('/',  (req, res) =>{
    res.send("Api is running")
})


const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})
.catch(err => console.log(err))