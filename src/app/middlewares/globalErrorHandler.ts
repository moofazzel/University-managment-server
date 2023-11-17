/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../error/ApiError';
import handleValidationError from '../../error/handleValidationError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
import handleZodError from '../../error/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (config.env === 'development') {
    console.log('🚀 globalErrorHandler~', error);
  } else {
    errorLogger.error('🚀 globalErrorHandler~', error);
  }

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedErrorMessage = handleValidationError(error);

    statusCode = simplifiedErrorMessage.statusCode;
    message = simplifiedErrorMessage.message;
    errorMessages = simplifiedErrorMessage.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedErrorMessage = handleZodError(error);
    statusCode = simplifiedErrorMessage.statusCode;
    message = simplifiedErrorMessage.message;
    errorMessages = simplifiedErrorMessage.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
