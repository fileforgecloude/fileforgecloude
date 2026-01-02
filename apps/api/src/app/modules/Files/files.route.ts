import express from "express";
import { FileController } from "./files.controller";

const router: express.Router = express.Router();

router.post("/", FileController.createFile);
router.get("/", FileController.getFiles);
router.patch("/:id", FileController.updateFile);
router.delete("/:id", FileController.deleteFile);

export const FileRoutes = router;
