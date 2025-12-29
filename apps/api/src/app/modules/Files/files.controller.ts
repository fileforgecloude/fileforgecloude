import { Request, Response } from "express";
import httpStatus from "http-status";
import { FileService } from "./files.service";
import sendResponse from "src/app/utils/sendResponse";

const createFile = async (req: Request, res: Response) => {
  const result = await FileService.createFileIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File metadata created successfully",
    data: result,
  });
};

const getFiles = async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (!userId) {
    throw new Error("userId is required");
  }
  const result = await FileService.getFilesFromDB(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Files fetched successfully",
    data: result,
  });
};

const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;
  if (!userId) {
    throw new Error("userId is required");
  }
  const result = await FileService.deleteFileFromDB(id, userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File deleted successfully",
    data: result,
  });
};

export const FileController = {
  createFile,
  getFiles,
  deleteFile,
};
