import express from 'express';
import morgan from 'morgan';
import healthRoutes from 'common/healthcheck/healthcheckRoutes';
import usersRoutes from 'features/users/routes/usersRoutes';
import authRoutes from 'features/auth/routes/authRoutes';
import verifyToken from '@common/middleware/verifyToken';

// ----[ Configurations ]----
const app = express();

// ----[ Middlewares ]----
app.use(morgan('dev'));
app.use(express.json());

// ----[ Public Routes ]----
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

// ----[ Protected Routes ]----
app.use(verifyToken);
app.use('/users', usersRoutes);

export default app;