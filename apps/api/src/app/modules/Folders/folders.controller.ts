import { Request, Response } from "express";
import httpStatus from "http-status";
import { FolderService } from "./folders.service";
import sendResponse from "src/app/utils/sendResponse";

const createFolder = async (req: Request, res: Response) => {
  const result = await FolderService.createFolderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Folder created successfully",
    data: result,
  });
};

const getFolders = async (req: Request, res: Response) => {
  const { userId, parentId } = req.query;
  if (!userId) {
    throw new Error("userId is required");
  }
  const result = await FolderService.getFoldersFromDB({
    userId: userId as string,
    parentId: parentId as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Folders fetched successfully",
    data: result,
  });
};

const updateFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;
  const result = await FolderService.updateFolderInDB(id, userId as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Folder updated successfully",
    data: result,
  });
};

const deleteFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;
  const result = await FolderService.deleteFolderFromDB(id, userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Folder deleted successfully",
    data: result,
  });
};

const getFolderPath = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FolderService.getFolderPathFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Folder path fetched successfully",
    data: result,
  });
};

const resolvePath = async (req: Request, res: Response) => {
  const { userId, path } = req.query;
  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "userId is required",
      data: null,
    });
  }
  const pathSegments = ((path as string) || "").split("/").filter(Boolean);
  const result = await FolderService.resolvePathToId(userId as string, pathSegments);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Path resolved successfully",
    data: result,
  });
};

const getRecursiveFiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FolderService.getRecursiveFiles(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recursive files fetched successfully",
    data: result,
  });
};

export const FolderController = {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
  getFolderPath,
  resolvePath,
  getRecursiveFiles,
};
