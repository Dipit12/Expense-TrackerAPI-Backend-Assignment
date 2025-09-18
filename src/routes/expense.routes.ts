import express from 'express'
import { authMiddleware } from '../middleware/verifyToken'
import { addExpense,updateExpense,deleteExpense,getAllExpenses,getSpecificExpense,getLastWeekExpenses,getLastMonthExpenses,getLastQuarterExpenses,getExpensesByDateRange} from '../controller/expense.controller'
const router = express.Router()

// all are JWT protected routes
router.post("/api/v1/expenses",authMiddleware,addExpense)
router.get("/api/v1/expenses",authMiddleware,getAllExpenses)
router.get("/api/v1/expenses/:id",authMiddleware,getSpecificExpense)
router.put("/api/v1/expenses/:id",authMiddleware,updateExpense)
router.delete("/api/v1/expenses/:id",authMiddleware,deleteExpense)

// expense filtering routes - all JWT protected
router.get("/api/v1/expenses/filter/week",authMiddleware,getLastWeekExpenses)
router.get("/api/v1/expenses/filter/month",authMiddleware,getLastMonthExpenses)
router.get("/api/v1/expenses/filter/quarter",authMiddleware,getLastQuarterExpenses)
router.get("/api/v1/expenses/filter/custom", authMiddleware, getExpensesByDateRange);


export default router;