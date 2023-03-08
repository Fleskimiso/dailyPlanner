import { PopulatedDoc, Types} from "mongoose";
import { IDayplan } from "./Dayplan";

export interface IUser {
    _id: Types.ObjectId,
    dayPlans: Types.ObjectId | PopulatedDoc<IDayplan>[],
    weekGoals: string[]
}