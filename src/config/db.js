import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL

if (process.env.NODE_ENV === "test") {
    MONGO_DB_URL = "mongodb://localhost:27017/tests"
}

export default (done) => {
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
            done()
        }
    });

};