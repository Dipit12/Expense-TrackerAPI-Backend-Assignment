import {Request,Response} from 'express'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import prisma from '../utils/connectToDB'
import { User } from '../generated/prisma'

require("dotenv").config();

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

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check empty fields
  if (!email || !password) {
    return res.status(400).json({ msg: "Enter all the fields" });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Please create an account first" });
    }

    // Verify password
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.user_id }, // use user_id from schema
      process.env.SALT_KEY as string,
      { expiresIn: "1h" } 
    );

    return res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.id; // pulled from JWT
    const user = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile from the DB", err);
    res.status(500).json({ msg: "Server error" });
  }
};


export {signup,login,getProfile};

