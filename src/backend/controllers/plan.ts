import { NextFunction, Request, Response } from "express";
import { IGetPlanRequest, ISubmitPlanRequest } from "../../common/Requests/PlanRequests"
import { IErrorResponse } from "../Responses/ErrorResponse";
import { IGetPlanResponse, ISubmitPlanResponse } from "../../common/Responses/PlanResponses";
import { UserModel } from "../models/UserModel.js";
import { DayPlanModel } from "../models/PlanModel.js";
import { IDayPlan } from "../types/Dayplan";

export const postPlanController = async (req: Request<{}, {}, ISubmitPlanRequest>,
    res: Response<ISubmitPlanResponse | IErrorResponse>) => {
    try {
        const user = await UserModel.findById(req.session.user?._id)
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
        } else {
            res.status(404).send({
                message: "Couldn't find the user to submit data"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}
export const getPlansController = async (req: Request<{}, {}, {}, IGetPlanRequest>,
    res: Response<IGetPlanResponse | IErrorResponse>) => {
    try {
        const user = UserModel.findById(req.session.user?._id);
        if (user) {
            console.log(req.query);
            const populatedUser = await user.populate<{ dayPlans: IDayPlan[] }>("dayPlans", {
            });
            // to do returning filtered populated plan
            console.log(populatedUser);

            if (populatedUser) {
                res.status(200).send({
                    dayPlan: populatedUser?.dayPlans[0]
                })
            } else {
                res.status(400).send({
                    message: "Couldn't get the plan"
                });
            }
        } else {
            res.status(404).send({
                message: "Couldn't find the user"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}