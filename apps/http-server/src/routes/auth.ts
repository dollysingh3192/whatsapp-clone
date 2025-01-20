import express from "express";
import { prisma } from '@repo/database';  // Import the Prisma singleton instance
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../constants";
import { createUserShema, signinUserShema } from "@repo/common/types";

const auth = express.Router();

auth.post("/signin", async (req, res) => {
    const parsedData = signinUserShema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: parsedData.error
        })
        return;
    }

    const { email, password } = parsedData.data;

    //Find the user in the database
    const data = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    console.log(data);

    if (!data) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: data.id }, secret);

    res.status(200).json({ token });
});

auth.post("/signup", async (req, res) => {

    const parsedData = createUserShema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(500).json({ message: parsedData.error });;
    }

    const { name, email, password } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });
        //TODO: No need to send complete user
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });    
    }
    
});
        


export default auth;