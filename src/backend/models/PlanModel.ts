import mongoose from "mongoose";
import { IDayplan } from "../../common/types/Dayplan";

const dayPlanSchema = new mongoose.Schema<IDayplan>({
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

export const DayPlanModel = mongoose.model("DayPlan", dayPlanSchema);
