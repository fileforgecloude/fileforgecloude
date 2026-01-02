import { Request, Response } from "express";
import { NotificationService } from "./notifications.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.query;
  const result = await NotificationService.getNotifications(userId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notifications fetched successfully",
    data: result,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  const result = await NotificationService.markAsRead(id, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification marked as read",
    data: result,
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const result = await NotificationService.markAllAsRead(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All notifications marked as read",
    data: result,
  });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;
  const result = await NotificationService.deleteNotification(id, userId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification deleted successfully",
    data: result,
  });
});

const clearAll = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.query;
  const result = await NotificationService.clearAll(userId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All notifications cleared successfully",
    data: result,
  });
});

export const NotificationController = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
};
