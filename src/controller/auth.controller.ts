import {Request,Response} from 'express'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import prisma from '../utils/connectToDB'
import { User } from '../generated/prisma'


const signup = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  // Validation
  if (!userName || !email || !password) {
    return res.status(400).json({
      msg: "Please enter all the credentials",
    });
  }

  try {
    // Hash password
    const hash_pass = await argon2.hash(password);

    // Create user in DB
    const user = await prisma.user.create({
      data: {
        name: userName,
        email: email,
        password_hash: hash_pass,
      },
    });

    return res.status(201).json({
      msg: "User created successfully",
      user,
    });
  } catch (err: any) {
    console.error("Error during signup:", err);

    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default signup;
