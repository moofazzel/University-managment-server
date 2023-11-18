import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemesterZodValidation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterZodValidation.createUserZodSchema),
  AcademicSemesterController.createUser,
);

export const AcademicSemesterRoutes = router;
