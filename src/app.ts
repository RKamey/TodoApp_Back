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
app.use(verifyToken);

// ----[ Routes ]----
app.use('/health', healthRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

export default app;