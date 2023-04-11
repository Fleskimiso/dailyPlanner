import mongoose, {  Types} from "mongoose";

export interface IDayPlan {
    _id: Types.ObjectId,
   tasks: {
    startTime: Date,
    endTime: Date,
    name: string,
    isFinished: boolean,
    _id: Types.ObjectId
   }[],
   day: Date,
   dayGoals: string[]
}
//model for mongoose
export interface IDayplanModel extends IDayPlan, mongoose.Document {}