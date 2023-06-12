import mongoose, { PopulatedDoc, Types} from "mongoose";
import { IDayPlan } from "./Dayplan";

export interface IUser {
    username: string,
    password: string,
    _id: Types.ObjectId,
    dayPlans:  IDayPlan[],
    weekGoals: string[]
}
export interface IUserModel extends IUser, mongoose.Document, Omit<IUser,"dayPlans">  {
    dayPlans: Types.ObjectId[]
}