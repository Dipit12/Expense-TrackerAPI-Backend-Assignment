import { Request, Response } from "express";
import prisma from "../utils/connectToDB";

const addExpense = async (req: Request, res: Response) => {
    try {
      const user_id = (req as any).user?.id;
  
      if (!user_id) {
        return res.status(400).json({ error: "User not authenticated" });
      }
  
      const expense = await prisma.expenses.create({
        data: {
          amount: 1000,
          category_id: 2,
          date: new Date("2025-01-23T00:00:00.000Z"),
          notes: "these are notes for this expense",
          user_id: user_id, 
        },
      });
  
      res.json({ message: "Expense added successfully", expense });
    } catch (err) {
      console.error("Error adding expense", err);
      res.status(500).json({ error: "Error adding expense" });
    }
  };
  
const getAllExpenses = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  try {
    const expenses = await prisma.expenses.findMany({
      where: { user_id },
    });
    res.status(200).json(expenses);
  } catch (err) {

    console.log("Error fetching expenses", err);
    return res.status(500).json({
      msg: "Error fetching expenses",
    });
  }
};

const getSpecificExpense = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  const expense_id = parseInt(req.params.id);

  try {
    const expense = await prisma.expenses.findFirst({
      where: { ex_id: expense_id, user_id },
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    return res.status(200).json(expense);
  } catch (err) {
    console.log("Error fetching the expense", err);
    return res.status(500).json({
      msg: "Error fetching the expense",
    });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  const expense_id = parseInt(req.params.id);

  try {
    const expense = await prisma.expenses.findFirst({
      where: { ex_id: expense_id, user_id },
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    const { amount, category_id, date, notes } = req.body;

    const updatedExpense = await prisma.expenses.update({
      where: { ex_id: expense_id },
      data: {
        amount,
        category_id,
        date: date ? new Date(date) : undefined,
        notes,
      },
    });

    return res.status(200).json({
      msg: "Expense updated successfully",
      updatedExpense,
    });
  } catch (err) {
    console.log("Error updating expense", err);
    return res.status(500).json({
      msg: "Error updating expense",
    });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  const expense_id = parseInt(req.params.id);

  try {
    const expense = await prisma.expenses.findFirst({
      where: { ex_id: expense_id, user_id },
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    const deletedExpense = await prisma.expenses.delete({
      where: { ex_id: expense_id },
    });

    res.status(200).json({
      msg: "Expense deleted successfully",
      deletedExpense,
    });
  } catch (err) {
    console.log("Error deleting an expense", err);
    return res.status(500).json({
      msg: "Error deleting an expense",
    });
  }
};

const getLastWeekExpenses = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: (req as any).user?.id,
        date: { gte: lastWeek },
      },
    });

    if (expenses.length === 0) {
      return res.status(200).json({ msg: "You didn’t have any expense in the last 7 days" });
    }

    return res.status(200).json(expenses);
  } catch (err) {
    console.error("Could not get last week expenses: ", err);
    return res.status(500).json({
      msg: "Internal server error - could not get last week expenses",
    });
  }
};

const getLastMonthExpenses = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: (req as any).user?.id,
        date: { gte: lastMonth },
      },
    });

    if (expenses.length === 0) {
      return res.status(200).json({ msg: "You didn’t have any expense in the last 30 days" });
    }

    return res.status(200).json(expenses);
  } catch (err) {
    console.error("Could not get last month expenses: ", err);
    return res.status(500).json({
      msg: "Internal server error - could not get last month expenses",
    });
  }
};

const getLastQuarterExpenses = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const lastQuarter = new Date();
    lastQuarter.setDate(today.getDate() - 90); // Approximate quarter

    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: (req as any).user?.id,
        date: { gte: lastQuarter },
      },
    });

    if (expenses.length === 0) {
      return res.status(200).json({ msg: "You didn’t have any expense in the last 90 days" });
    }

    return res.status(200).json(expenses);
  } catch (err) {
    console.error("Could not get last quarter expenses: ", err);
    return res.status(500).json({
      msg: "Internal server error - could not get last quarter expenses",
    });
  }
};

const getExpensesByDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ msg: "Please provide both startDate and endDate in YYYY-MM-DD format" });
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ msg: "Invalid date format. Use YYYY-MM-DD" });
    }

    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: (req as any).user?.id,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    if (expenses.length === 0) {
      return res.status(200).json({ msg: `No expenses found between ${startDate} and ${endDate}` });
    }

    return res.status(200).json(expenses);
  } catch (err) {
    console.error("Error fetching expenses by custom date range:", err);
    return res.status(500).json({
      msg: "Internal server error - could not fetch expenses by custom date range",
    });
  }
};



export {
  addExpense,
  getAllExpenses,
  getSpecificExpense,
  updateExpense,
  deleteExpense,
  getLastWeekExpenses,
  getLastMonthExpenses,
  getLastQuarterExpenses,
  getExpensesByDateRange
};
