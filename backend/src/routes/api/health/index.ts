import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

router.get('/', async (req: any, res: any) => {
  if (mongoose.connection.readyState) {
    res.send({ healthy: true });
  }
});

export default router;
