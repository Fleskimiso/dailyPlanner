import express, {Request, Response} from "express";
import { getPlansController, postPlanController } from "../controllers/plan.js";

const plansRouter = express.Router();

//should validate plan
plansRouter.get("/plan", getPlansController);
plansRouter.post("/plan",postPlanController);

export default plansRouter;