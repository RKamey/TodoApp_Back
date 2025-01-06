import express from 'express';
import morgan from 'morgan';
// ===== Routes =====
import healthRoutes from 'common/healthcheck/healthcheckRoutes';
import usersRoutes from 'features/users/routes/usersRoutes';
import authRoutes from 'features/auth/routes/authRoutes';
import taskRoutes from 'features/tasks/routes/taskRoutes';
// ===== Middlewares =====
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
app.use('/tasks', taskRoutes);

export default app;
