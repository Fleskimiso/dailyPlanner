import { NextFunction, Request, Response } from "express";
import { ISubmitPlanRequest } from "../../common/Requests/PlanRequests"
import { IErrorResponse } from "../Responses/ErrorResponse";
import { ISubmitPlanResponse } from "../../common/Responses/PlanResponses";
import { UserModel } from "../models/UserModel.js";
import { DayPlanModel } from "../models/PlanModel.js";

export const postPlanController = async (req: Request<{}, {}, ISubmitPlanRequest>, res: Response<ISubmitPlanResponse | IErrorResponse>) => {
    console.log(req.body);

    try {
        const user = await UserModel.findById(req.session.user?.id)
        console.log(user);
        
        if (user) {
            const dayPlan = new DayPlanModel({
                dayGoals: req.body.dayGoals,
                tasks: req.body.tasks,
                day: Date.parse(req.body.day)
            })
            await dayPlan.save();
            user.dayPlans.push(dayPlan.id);
            await user.save();
            res.status(200).send(
                {
                    dayPlan: dayPlan
                }
            );
        }
        res.status(404).send({
            message: "Couldn't find the user to submit data"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }

}