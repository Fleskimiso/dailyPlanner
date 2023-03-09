import mongoose from "mongoose";
import { IDayplanModel } from "../../common/types/Dayplan";

const dayPlanSchema = new mongoose.Schema<IDayplanModel>({
    tasks: [{
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        isFinished: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    dayGoals: [String]
});

export const DayPlanModel = mongoose.model<IDayplanModel>("DayPlan", dayPlanSchema);
