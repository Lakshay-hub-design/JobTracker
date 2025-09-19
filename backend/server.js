require('dotenv').config();
const app = require('./src/app')
const connectDb = require('./src/db/db')

connectDb()

app.listen(3000, function(){
    console.log('server is rounning on Port 3000')
})