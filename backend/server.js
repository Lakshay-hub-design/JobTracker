const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')


dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',  require('./routes/authRoute'))


app.get('/', (req, res) => {
    res.send("api is running")
})


const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb Connected");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err) => console.log(err));