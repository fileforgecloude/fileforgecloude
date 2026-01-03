import axiosInstance from "@/lib/axios";

export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export const getNotifications = async (userId: string) => {
  const response = await axiosInstance.get(`/notifications?userId=${userId}`);
  return response.data.data;
};

export const markAsRead = async (id: string, userId: string) => {
  const response = await axiosInstance.patch(`/notifications/${id}/read`, { userId });
  return response.data.data;
};

export const markAllAsRead = async (userId: string) => {
  const response = await axiosInstance.patch("/notifications/read-all", { userId });
  return response.data.data;
};

export const deleteNotification = async (id: string, userId: string) => {
  const response = await axiosInstance.delete(`/notifications/${id}?userId=${userId}`);
  return response.data.data;
};

export const clearAll = async (userId: string) => {
  const response = await axiosInstance.delete(`/notifications/clear-all?userId=${userId}`);
  return response.data.data;
};
