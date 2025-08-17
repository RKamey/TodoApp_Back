import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// ===== Routes =====
import healthRoutes from 'common/healthcheck/healthcheckRoutes';
import usersRoutes from 'features/users/routes/usersRoutes';
import authRoutes from 'features/auth/routes/authRoutes';
import taskRoutes from 'features/tasks/routes/taskRoutes';
import profilesRoutes from 'features/profiles/routes/profilesRoutes';
import chatbotRoutes from 'features/chatbot/routes/chatbotRoutes';
import weatherRoutes from 'features/weather/routes/weatherRoutes';
import emailRoutes from 'features/email/routes/emailRoutes';
// ===== Middlewares =====
import { verifyToken, validateToken } from '@common/middleware/authMiddleware';
import path from 'path';

// ----[ Configurations ]----
const app = express();

// ----[ Allowed Origins ]----
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://rkamey-taskify.netlify.app',
]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

// ----[ Middlewares ]----
app.use(cors(options));
app.use(morgan('dev'));
app.use(express.json());

// ----[ Static Files ]----
app.use('/assets', express.static(path.join(__dirname, './public/assets')));

app.options('*', cors(options));

// ----[ Public Routes ]----
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/email', emailRoutes);

// ----[ Protected Routes ]----
app.use(verifyToken);
app.use('/users', validateToken, usersRoutes);
app.use('/tasks', validateToken, taskRoutes);
app.use('/profiles', validateToken, profilesRoutes);
app.use('/chatbot', validateToken, chatbotRoutes);
app.use('/weather', validateToken, weatherRoutes);

export default app;
