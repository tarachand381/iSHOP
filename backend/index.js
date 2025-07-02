require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();

const categoryRouter = require('./routers/categoryRouter');
const colorRouter = require('./routers/colorRouter');
const productRouter = require('./routers/productRouter');
const adminRouter = require('./routers/adminRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
server.use(cors(

    {
        origin: 'http://localhost:5173'
    }
));

server.use(express.json());
server.use(express.static('public'));
server.use("/category", categoryRouter);
server.use("/color", colorRouter)
server.use("/product", productRouter)
server.use("/admin", adminRouter)
server.use("/user", userRouter)
server.use("/order", orderRouter)




mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'ISHOP',
}).then(() => {
    console.log('Connected to MongoDB')
    server.listen(
        5000,
        () => { console.log('Server is running on http://localhost:5000') }
    )
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});