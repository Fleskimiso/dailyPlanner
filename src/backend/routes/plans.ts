import express, {Request, Response} from "express";
import { postPlanController } from "../controllers/plan.js";

const plansRouter = express.Router();

//should validate plan
plansRouter.post("/plan",postPlanController);

export default plansRouter;