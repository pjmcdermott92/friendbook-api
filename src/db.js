const mongoose = require('mongoose');

const connectDB = async () => {
    const db = process.env.MONGO_URI;

    try {
        const conn = await mongoose.connect(db);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB();
