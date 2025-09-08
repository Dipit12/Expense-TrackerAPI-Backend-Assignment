import express , {Request, Response} from 'express'

const router = express.Router()

router.get("/api/v1/healthCheck", (req:Request,res:Response) =>{
    res.send("API is up and running")
})

export default router;