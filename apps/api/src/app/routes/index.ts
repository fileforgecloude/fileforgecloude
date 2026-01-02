import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { FileRoutes } from "../modules/Files/files.route";
import { FolderRoutes } from "../modules/Folders/folders.route";
import { NotificationRoutes } from "../modules/Notifications/notifications.route";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/files",
    route: FileRoutes,
  },
  {
    path: "/folders",
    route: FolderRoutes,
  },
  {
    path: "/notifications",
    route: NotificationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
