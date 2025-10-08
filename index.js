import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/database.config.js';
import { seedAdmin } from "./seed/admin.seed.js";
import cors from 'cors'

dotenv.config();
if (process.argv[2] === "seedAdmin") {
    seedAdmin();
}
import userRoutes from './routers/user/user.routes.js';
import cookieParser from 'cookie-parser';
import error from './middlewares/Error.middleware.js';
import { authenticate, authorize } from './middlewares/Auth.middlerware.js';


connectDB()
const app = express();

app.use(express.urlencoded({ extended: true }));  // to parse nested data ,by default it is false 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin:"http://localhost:5173",
     origin: process.env.FRONTEND_URL, 
     credentials:true
}));
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});
app.use('/api/users', userRoutes);

app.use(error)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
        console.log('Error while connecting to PORT ${process.env.PORT}');
        return

    }
    console.log(`Server Is Running On PORT ${process.env.PORT}`);

});
