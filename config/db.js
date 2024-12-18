const mongoose = require('mongoose')

async function connectTODB() {
    try {
        await mongoose
            .connect(process.env.DB_URL)
        console.log('Connected To MongoDB...')
    } catch (error) {
        console.log('Connection Failed To MongoDB!', error)
    }


}
module.exports = {
    connectTODB
};