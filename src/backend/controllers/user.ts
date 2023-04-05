import { NextFunction, Request, Response } from "express";
import { DayPlanModel } from "../models/PlanModel.js";
import { UserModel } from "../models/UserModel.js";
import { IErrorResponse } from "../Responses/ErrorResponse";
import { ILoginResponse, IRegisterResponse } from "../Responses/UserResponse";
import { ILoginRequest, IRegisterRequest } from "../Requests/UserRequests";
import { loginFormSchema, registerFormSchema } from "../validators/user.js";


export const loginController = async (req: Request<{}, {}, ILoginRequest>, res: Response<ILoginResponse | IErrorResponse>) => {
    //logs in the user
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    res.status(404).send({ message: "Error occured during logging in (maybe bad password)" });
                } else {
                    req.session.user = user;
                    res.status(200).send({
                        userId: user._id.toString(),
                        username: user.username,
                        weekGoals: user.weekGoals,
                        dayPlans: [{
                            dayGoals: ["x"],
                            tasks: [{
                                startTime: Date.now(), //dummy data for now
                                endTime: Date.now() + 3600000,
                                name: "example task",
                                isFinished: false
                            }],
                            day: Date.now()
                        }]
                    });

                }
            });
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const registerController = async (req: Request<{}, {}, IRegisterRequest>, res: Response<IRegisterResponse | IErrorResponse>) => {
    try {
        const users = await UserModel.find({ username: req.body.username });
        if (users.length === 0) {
            //create new user
            const newUser = new UserModel({
                weekGoals: ["nothing for now"],
                username: req.body.username,
                password: "dummy pass"
            });
            //create a example daily plan for user
            const userDailyPlanExample = new DayPlanModel({
                dayGoals: ["example day goal"],
                tasks: [{
                    startTime: Date.now(),
                    endTime: Date.now() + 3600000,
                    name: "example task",
                    isFinished: false
                }],
                day: Date.now()
            });
            newUser.dayPlans.push(userDailyPlanExample._id);
            //save the plan
            await userDailyPlanExample.save();
            //register the user
            const registeredUser = await UserModel.register(newUser, req.body.password);
            //save the user
            await registeredUser.save();
            res.status(200).send({
                userId: String(registeredUser._id),
                username: registeredUser.username,
                weekGoals: registeredUser.weekGoals,
                dayPlans: [{
                    dayGoals: userDailyPlanExample.dayGoals,
                    tasks: userDailyPlanExample.tasks,
                    day: userDailyPlanExample.day
                }]
            });
        } else {
            res.status(400).json({ message: "username already in use" });
        }
    } catch (error) {
        //log the error message
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const logoutController = (req: Request, res: Response<IErrorResponse>) => {
    //logout user in case of errors send 500 status
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
            res.status(500).json({ message: "Server error occured while logging out" });
        } else {
            req.session.destroy((sessionError) => {
                if (sessionError) {
                    res.status(500).json({ message: "Server error occured while logging out" });
                } else {
                    res.status(200).json({ message: "Logged out successfully" });
                }
            })
        }
    })
}

export const validateLogin = (req: Request<{}, {}, ILoginRequest>, res: Response<IErrorResponse>, next: NextFunction) => {
    const { error } = loginFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    //bad request code for malformed login and register data
    res.status(400).json({ message: error?.message })
}
export const validateRegistration = (req: Request<{}, {}, IRegisterRequest>, res: Response<IErrorResponse>, next: NextFunction) => {
    const { error } = registerFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    res.status(400).json({ message: error?.message });

}