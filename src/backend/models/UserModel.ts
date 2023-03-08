import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import {IUser} from "../../common/types/User"

const UserSchema = new mongoose.Schema<IUser>({
    dayPlans: [{
        type: mongoose.Types.ObjectId,
        ref: "DayPlan"
    }],
    weekGoals: [String]
});

UserSchema.plugin(passportLocalMongoose);

export const UserModel = mongoose.model<IUser>("User", UserSchema);