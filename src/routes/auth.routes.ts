import express from 'express'
import signup from '../controller/auth.controller'
const router = express.Router()

router.post("/api/v1/auth/signup",signup)
// router.post("/api/v1/auth/login")
// router.get("/api/v1/auth/profile")

export default router;