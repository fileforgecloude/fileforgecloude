import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { FileRoutes } from "../modules/Files/files.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
