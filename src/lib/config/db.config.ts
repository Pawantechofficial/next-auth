import mongoose from "mongoose";
export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI!,{
            tls: true,
        })
        console.log("Database is connected successfully with" + mongoose.connection.host)
    } catch (error) {
        mongoose.disconnect()
        process.exit(1)
    }
}