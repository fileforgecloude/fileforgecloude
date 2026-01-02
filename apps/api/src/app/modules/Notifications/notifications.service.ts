import { prisma } from "@repo/database";
import { INotification } from "./notifications.interface";

const createNotification = async (data: INotification) => {
  const result = await prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
    },
  });
  return result;
};

const getNotifications = async (userId: string) => {
  const result = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const markAsRead = async (id: string, userId: string) => {
  const result = await prisma.notification.update({
    where: {
      id,
      userId,
    },
    data: {
      read: true,
    },
  });
  return result;
};

const markAllAsRead = async (userId: string) => {
  const result = await prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
  return result;
};

const deleteNotification = async (id: string, userId: string) => {
  const result = await prisma.notification.delete({
    where: {
      id,
      userId,
    },
  });
  return result;
};

const clearAll = async (userId: string) => {
  const result = await prisma.notification.deleteMany({
    where: {
      userId,
    },
  });
  return result;
};

export const NotificationService = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
};
