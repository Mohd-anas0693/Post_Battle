

const dotenv = require('dotenv');

const app = require("./app");

const { connectDb } = require('../src/db/database');

dotenv.config({ path: "./.env" })

connectDb().then(
    app.listen(process.env.PORT, () => {
        console.log(`App is listening At ${process.env.PORT}`)
    })
).catch((err) => {
    console.log("Mongodb connection Error", err)
})