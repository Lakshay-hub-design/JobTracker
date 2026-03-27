require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/error.middleware');

const PORT = process.env.PORT || 3000

const startServer = async () => {
    connectDB()

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer()