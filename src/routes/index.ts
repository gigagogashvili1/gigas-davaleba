import express from "express";
import { asyncController, syncController } from "../controllers";

const router = express.Router();

router.get("/async", asyncController);
router.get("/sync", syncController);

export default router;
