import {IDayPlan} from "../../common/types/Dayplan"
export interface ILoginResponse {
    userId: string,
    username: string,
    weekGoals: string[],
    dayPlans: IDayPlan[]
}
export interface IRegisterResponse extends ILoginResponse{}