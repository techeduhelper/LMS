import express from "express";
import { createApplication } from "../controller/applicationController.js";
const router = express.Router();

router.post("/applications", createApplication);

export default router;
