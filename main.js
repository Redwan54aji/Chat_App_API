const express = require('express')
const dotenv = require('dotenv')
const {
    connectTODB
} = require('./config/db')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth.route');
const messageRouter = require('./router/message.route');
const userRouter = require('./router/user.route')
const app = express();

const port = process.env.PORT || 5000;
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);


app.listen(port, () => {
    connectTODB()
    console.log(`Example app listening on port ${port}!`)
});