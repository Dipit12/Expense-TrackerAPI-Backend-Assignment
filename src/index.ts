require("dotenv").config()
import express from 'express'
import mainRoutes from './routes/main.routes'
import authRoutes from './routes/auth.routes'
import expenseRoutes from './routes/expense.routes'
import { populateCategoryDB } from './utils/populate_category_db'
const app = express()
app.use(express.json())
app.use(mainRoutes)
app.use(authRoutes)
app.use(expenseRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
   
    console.log('Server is listening on port', PORT)
})