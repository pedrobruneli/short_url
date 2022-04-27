import { config } from '../config/Constants'
import mongoose from 'mongoose'

export class DBConnect{
    public async connect(): Promise<void> {
        try{
            await mongoose.connect(config.MONGO_CONNECTION)
            console.log("Database connected")
        }catch(err) {
            console.log(err.message)
            process.exit(1); 
        }
    }
}