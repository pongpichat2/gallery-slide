import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/config';
import imageRoutes from './routes/imageRoutes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});