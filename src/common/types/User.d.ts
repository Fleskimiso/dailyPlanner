import mongoose, { PopulatedDoc, Types} from "mongoose";
import { IDayplan } from "./Dayplan";

export interface IUser {
    username: string
    _id: Types.ObjectId,
    dayPlans:  IDayplan[],
    weekGoals: string[]
}
export interface IUserModel extends IUser, mongoose.Document, Omit<IUser,"dayPlans">  {
    dayPlans: Types.ObjectId[]
}