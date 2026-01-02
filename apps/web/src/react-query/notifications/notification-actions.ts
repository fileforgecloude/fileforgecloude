import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import * as NotificationEndpoints from "./notification-queries";
import { toast } from "sonner";

export const useNotifications = (userId: string) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => NotificationEndpoints.getNotifications(userId),
    enabled: !!userId,
    refetchInterval: 10000,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) => NotificationEndpoints.markAsRead(id, userId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => NotificationEndpoints.markAllAsRead(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      toast.success("All notifications marked as read");
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) => NotificationEndpoints.deleteNotification(id, userId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });
};

export const useClearAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => NotificationEndpoints.clearAll(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      toast.success("Notification inbox cleared");
    },
  });
};
