const mongoose = require("mongoose");

module.exports = {
    connectDb: async () => {
        try {
            let connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
            console.log(`Connected to mongodb ${connectionInstance}`)
            // console.log(connectionInstance)
        } catch (err) {
            console.log("Not able to connect to database" + err)
            process.exit(1);
        }
    }
}