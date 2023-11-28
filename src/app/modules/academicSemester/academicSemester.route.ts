import { NextFunction, Request, Response } from 'express';
import { paginationFields } from '../../../conastants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
    next();
  },
);

const getAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions,
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemesters(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Semester retrieved successfully',
      data: result,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getSingleSemester,
  getAcademicSemester,
};
