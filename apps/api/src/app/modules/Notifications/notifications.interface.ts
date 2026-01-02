import { NotificationType } from "@repo/database";

export interface INotification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read?: boolean;
}

export type GetNotificationsParams = {
  userId: string;
};
