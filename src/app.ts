import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// application routers
app.use('/api/v1/', routers);

// testing functions
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully!');
});

// global error handlers
app.use(globalErrorHandler);

export default app;
