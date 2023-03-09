import mongoose, {  Types} from "mongoose";

export interface IDayplan {
    _id: Types.ObjectId,
   tasks: {
    startTime: Date,
    endTime: Date,
    name: string,
    isFinished: boolean,
    _id: Types.ObjectId
   }[],
   dayGoals: string[]
}
export interface IDayplanModel extends IDayplan, mongoose.Document {}