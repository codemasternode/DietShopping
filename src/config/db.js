import mongoose from "mongoose";
import "dotenv/config"

let MONGO_DB_URL = process.env.MONGO_DB_URL


if (process.env.NODE_ENV === "test") {
    MONGO_DB_URL = "mongodb://localhost:27017/tests"
}

export default (callback) => {
    const dbOptions = {
        poolSize: 4,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
    mongoose.promise = global.promise
    mongoose.connect(MONGO_DB_URL, dbOptions, async err => {
        if (err) {
            throw new Error(`Error while trying to connect MongoDB ${err}`);
        }
        console.log(`Connected to MongoDB`);

        if (process.env.NODE_ENV === "test") {
            mongoose.connection.db.listCollections().toArray(function (err, names) {
                const callbacks = []
                for (let i = names.length; i--;) {
                    mongoose.connection.db.collection(names[i].name, async function (err, collection) {
                        callbacks.push(new Promise((resolve, reject) => {
                            collection.deleteMany({}).then((doc) => {
                                resolve()
                            })
                        }))

                    })
                }
                Promise.all(callbacks).then(() => {
                    console.log("Remove everything from DB")
                    callback()
                })
            })

        }
    });

};