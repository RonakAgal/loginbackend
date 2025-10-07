import expressAsyncHandler from "express-async-handler";
import { userCollection } from "../models/user.model.js";



export const seedAdmin = expressAsyncHandler(async ()=> {
    let existingAdmin = await userCollection.findOne({ role: "admin" });

    if(!existingAdmin) {
        userCollection.create({
            userName: process.env.ADMIN_USERNAME,
            email:process.env.ADMIN_EMAIL,
            password:process.env.ADMIN_PASSWORD,
            role:"admin",
        });
        console.log("admin seeded");
    }else {
        console.log("admin already exists");
        
    }
})