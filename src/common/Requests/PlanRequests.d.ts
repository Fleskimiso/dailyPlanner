export interface ISubmitPlanRequest {
    tasks: {
        name: string,
        startTime: number,
        endTime: number,
        isFinished: boolean  
    }[],
    dayGoals: string[],
    day: string
}