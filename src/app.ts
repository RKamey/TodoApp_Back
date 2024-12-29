import express from 'express';
import morgan from 'morgan';
import healthRoutes from 'common/healthcheck/healthcheckRoutes';
import usersRoutes from 'features/users/routes/usersRoutes';
import authRoutes from 'features/auth/routes/authRoutes';

// ----[ Configurations ]----
const app = express();

// ----[ Middlewares ]----
app.use(morgan('dev'));
app.use(express.json());

// ----[ Routes ]----
app.use('/health', healthRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

export default app;