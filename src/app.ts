import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// application routers
app.use('/api/v1/users', UserRoutes);
// academic semester routers
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// testing functions
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully!');
});

// global error handlers
app.use(globalErrorHandler);

export default app;
