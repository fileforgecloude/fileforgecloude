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
  const { userId, search, type, sort, folderId } = req.query;
  if (!userId) {
    throw new Error("userId is required");
  }
  const result = await FileService.getFilesFromDB({
    userId: userId as string,
    search: search as string,
    type: type as "image" | "pdf" | "code",
    sort: sort as "name" | "modified",
    folderId: folderId as string,
  });

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

const updateFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;
  const result = await FileService.updateFileInDB(id, userId as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File updated successfully",
    data: result,
  });
};

export const FileController = {
  createFile,
  getFiles,
  deleteFile,
  updateFile,
};
