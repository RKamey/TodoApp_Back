import express from 'express';
import morgan from 'morgan';
import healthRoutes from '@routes/healthRoutes';
import usersRoutes from '@routes/usersRoutes';

// ----[ Configurations ]----
const app = express();

// ----[ Middlewares ]----
app.use(morgan('dev'));
app.use(express.json());

// ----[ Routes ]----
app.use('/health', healthRoutes);
app.use('/users', usersRoutes);

export default app;