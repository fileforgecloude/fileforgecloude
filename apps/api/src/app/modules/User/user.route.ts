import express, { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";

const router: Router = express.Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.userDelete);
export const UserRoutes = router;
