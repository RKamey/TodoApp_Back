import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import prisma from './prisma';

// ----[ Configurations ]----
const app = express();
dotenv.config({ path: path.resolve(__dirname, '../.env')});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World, im kamey!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});