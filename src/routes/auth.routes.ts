import express from 'express'
import {signup,login,getProfile} from '../controller/auth.controller'
import { get } from 'http'
import {authMiddleware}  from '../middleware/verifyToken'
const router = express.Router()

router.post("/api/v1/auth/signup",signup)
router.post("/api/v1/auth/login",login)
// protected route
router.get("/api/v1/auth/profile",authMiddleware,getProfile)

export default router;