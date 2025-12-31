import express, { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";

const router: Router = express.Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
export const UserRoutes = router;
