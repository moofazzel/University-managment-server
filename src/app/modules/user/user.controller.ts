import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  });

  next();
});

export const UserController = {
  createUser,
};
