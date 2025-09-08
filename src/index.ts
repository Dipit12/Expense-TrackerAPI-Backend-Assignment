require("dotenv").config()
import express from 'express'
import mainRoutes from './routes/main.routes'
import authRoutes from './routes/auth.routes'
const app = express()
app.use(express.json())
app.use(mainRoutes)
app.use(authRoutes)
const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log('Server is listening on port', PORT)
})