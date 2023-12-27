import { Request, Response } from 'express';
import { createTransaction } from '../services/transaction';

export const createTransactionController = async (req: Request, res: Response) => {
  try {
    const result = await createTransaction(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};