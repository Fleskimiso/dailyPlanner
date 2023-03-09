import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import {IUserModel} from "../../common/types/User"

//declaration merging for the passport plugin
declare global {
    namespace Express {
      interface User extends IUserModel {
      }
    }  
}
declare module 'express-session' {
  interface SessionData {
    user?: IUserModel;
  }
}


const UserSchema = new mongoose.Schema<IUserModel>({
    dayPlans: [{
        type: mongoose.Types.ObjectId,
        ref: "DayPlan"
    }],
    weekGoals: [String]
});

UserSchema.plugin(passportLocalMongoose);

export const UserModel = mongoose.model<IUserModel>("User", UserSchema);