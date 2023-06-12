import { useState } from "react"
import { useAppDispatch } from "../store/hooks";
import { submitDayPlanThunk } from "../store/thunks/SubmitDayPlanThunk";

const CreatorPage = () => {

    const dispatch = useAppDispatch();

    const [currentDay, setCurrentDay] = useState('');
    const [currentTaskName, setCurrentTaskName] = useState('');
    const [currentTaskStartTime, setCurrentTaskStartTime] = useState('');
    const [currentTaskEndTime, setCurrentTaskEndTime] = useState('');
    const [currentDayGoal, setCurrentDayGoal] = useState('');

    const [currentDayPlan, setCurrentDayPlan] = useState<{
        name: string,
        startTime: number,
        endTime: number,
        isFinished: boolean
    }[]>([]);
    const [currentDayGoals, setCurrentDayGoals] = useState<string[]>([]);

    const submitTask = () => {
        if (currentTaskName != "" && currentTaskStartTime != "" && currentTaskEndTime != "") {
            const selectedDate = new Date(currentDay);
            const timeStamp = selectedDate.getTime() - selectedDate.getHours() * 3600 * 1000;
            const taskStartTime = timeStamp
                + Number(currentTaskStartTime.split(":")[0]) * 3600 * 1000
                + Number(currentTaskStartTime.split(":")[1]) * 60 * 1000;
            const taskEndTime = timeStamp
                + Number(currentTaskEndTime.split(":")[0]) * 3600 * 1000
                + Number(currentTaskEndTime.split(":")[1]) * 60 * 1000;
            setCurrentDayPlan([
                ...currentDayPlan, {
                    name: currentTaskName,
                    startTime: taskStartTime,
                    endTime: taskEndTime,
                    isFinished: false
                }
            ]);
            setCurrentTaskName("");
        }
    }
    const submitDayGoal = () => {
        if (currentDayGoal != "") {
            setCurrentDayGoals([currentDayGoal, ...currentDayGoals]);
            setCurrentDayGoal("");
        }
    }

    const submitDayPlan = () =>{
        if(currentDayPlan.length > 0) {
            dispatch(submitDayPlanThunk({
                tasks: currentDayPlan,
                day: currentDay,
                dayGoals: currentDayGoals
            })).then(resp =>{
                console.log("success");
                //TODO Error handling
            }).catch(e =>{
                console.log(e);
            })
        }
    }


    return <div className="container d-flex flex-column  mt-5">
        <div className="d-flex  flex-column flex-md-row justify-content-evenly">
        <div className="d-flex flex-column justify-content-center mb-5 mb-md-0 w-md-50 mt-1 plan-input-container">
            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="day">Day</label>
                <span className="line-break"></span>
                <input className="ms-auto  w-200px  plan-day-input" onChange={e => {
                    setCurrentDay(e.target.value);
                }} value={currentDay} type="date" name="day" id="day" />
            </div>
            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="task">Task name</label>
                <span className="line-break"></span>
                <input className="ms-auto w-md-200px  plan-day-input" type="text" name="task" id="task" value={currentTaskName}
                    onChange={e => {
                        setCurrentTaskName(e.target.value);
                    }} />
            </div>
            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="startTime">Task start time</label>
                <span className="line-break"></span>
                <input className="ms-auto w-md-200px  plan-day-input" type="time" name="startTime" id="startTime" value={currentTaskStartTime}
                    onChange={e => {
                        console.log(e.target.value);
                        setCurrentTaskStartTime(e.target.value);
                    }} />
            </div>

            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="endTime">Task end time</label>
                <span className="line-break"></span>
                <input className="ms-auto w-md-200px  plan-day-input" type="time" name="endTime" id="endTime" value={currentTaskEndTime}
                    onChange={e => {
                        setCurrentTaskEndTime(e.target.value);
                    }} />
            </div>

            <div className="my-2 d-flex flex-row align-items-center justify-content-evenly">
                <div className="w-50 justify-content-center d-flex flex-row label-text">
                    <label htmlFor="">Add task to plan</label>
                </div>
                <div>
                    <button onClick={e => {
                        e.preventDefault();
                        submitTask();
                    }} className="plan-input-button">Submit</button>
                </div>
            </div>

            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="dayGoal">Add day Goal</label>
                <span className="line-break"></span>
                <input className="ms-auto w-md-200px  plan-day-input" type="text" name="dayGoal" id="dayGoal" value={currentDayGoal}
                    onChange={e => {
                        setCurrentDayGoal(e.target.value);
                    }} />
            </div>

            <div className="my-2 d-flex flex-row align-items-center justify-content-evenly">
                <div className="w-50 justify-content-center d-flex flex-row label-text">
                    <label htmlFor="">Add goal for the day</label>
                </div>
                <div>
                    <button
                        onClick={(e) => { e.preventDefault(); submitDayGoal(); }}
                        className="plan-input-button">Submit</button>
                </div>
            </div>

        </div>

        <div className="plan-container mt-1 d-flex flex-column justify-content-between">
            <div>
                <div className="text-center mb-2 text-maroon h5">
                    Current Plan
                </div>
                <div>
                    {currentDayPlan.map(task => {
                        return <div key={task.name} className="text-maroon py-1">
                            {task.name} {" - "} {
                                new Date(task.startTime).getHours()
                                + ":"
                                + (new Date(task.startTime).getMinutes() < 10 ?
                                    "0" + new Date(task.startTime).getMinutes()
                                    : new Date(task.startTime).getMinutes())
                            } {" to "} {
                                new Date(task.endTime).getHours()
                                + ":"
                                + (new Date(task.endTime).getMinutes() < 10 ?
                                    "0" + new Date(task.endTime).getMinutes()
                                    : new Date(task.endTime).getMinutes())
                            }
                        </div>
                    })}
                </div>
            </div>
            <div>
            <div className="text-center mb-2 text-maroon h5">
                    Day goals
                </div>
                <ul>
                    {currentDayGoals.map(goal =>{
                        return <li key={String(goal)} className="text-maroon py-1">
                                {goal}
                        </li>
                    })}
                </ul>
            </div>
        </div>
        </div>

                    <div className="container d-flex flex-row justify-content-center">
                            <div className="m-2 p-2 mt-5">
                            <button onClick={e => {
                                e.preventDefault();
                                submitDayPlan();  
                            }} className="plan-input-button">Send Plan</button>
                            </div>
                    </div>
    </div>
}
export default CreatorPage