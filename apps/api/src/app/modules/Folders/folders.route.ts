import express from "express";
import { FolderController } from "./folders.controller";

const router: express.Router = express.Router();

router.post("/", FolderController.createFolder);
router.get("/", FolderController.getFolders);
router.get("/resolve-path", FolderController.resolvePath);
router.get("/path/:id", FolderController.getFolderPath);
router.get("/:id/recursive-files", FolderController.getRecursiveFiles);
router.patch("/:id", FolderController.updateFolder);
router.delete("/:id", FolderController.deleteFolder);

export const FolderRoutes = router;
