import catchAsync from "src/app/utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "src/app/utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
// user create
const createUser = async (req: any, res: any) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
};
// user get
const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersFormDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});
// user delete
const userDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
};

export const UserController = {
  getUsers,
  createUser,
  userDelete,
};
