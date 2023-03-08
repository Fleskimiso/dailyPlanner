import {  Types} from "mongoose";

export interface IDayplan {
    _id: Types.ObjectId,
   tasks: {
    startTime: Date,
    endTime: Date,
    name: string,
    isFinished: boolean,
    id: Types.ObjectId
   }[],
   dayGoals: string[]
}