const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express();
const allowedOrigins = [
  "https://job-tracker-theta-eight.vercel.app",
  "http://localhost:4000"
]; 

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api/auth',  require('./routes/authRoute'))
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/user', require('./routes/userRoutes'))


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