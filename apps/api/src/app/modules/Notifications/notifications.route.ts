import { Router } from "express";
import { NotificationController } from "./notifications.controller";

const router: Router = Router();

router.get("/", NotificationController.getNotifications);
router.patch("/read-all", NotificationController.markAllAsRead);
router.patch("/:id/read", NotificationController.markAsRead);
router.delete("/clear-all", NotificationController.clearAll);
router.delete("/:id", NotificationController.deleteNotification);

export const NotificationRoutes = router;
