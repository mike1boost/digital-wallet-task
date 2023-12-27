import express from 'express';
import { createTransactionController } from '../controllers/transaction';

const router = express.Router();

router.post('/transactions', createTransactionController);

export default router;