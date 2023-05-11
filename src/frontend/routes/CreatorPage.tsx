import { useState } from "react"

const CreatorPage = () => {

    const [currentDay, setCurrentDay] = useState('');
    const [currentTaskName, setCurrentTaskName] = useState('');
    const [currentTaskStartTime, setCurrentTaskStartTime] = useState('');
    const [currentTaskEndTime, setCurrentTaskEndTime] = useState('');
    const [currentDayGoal, setCurrentDayGoal] = useState('');

    const [currentDayPlan, setCurrentDayPlan] = useState<{
        taskName: string,
        taskStartTime: number,
        taskEndTime: number,
        completed: boolean
    }[]>([])

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
                    taskName: currentTaskName,
                    taskStartTime,
                    taskEndTime,
                    completed: false
                }
            ]);
            setCurrentTaskName("");
        }
    }

    return <div className="container d-flex flex-row justify-content-evenly mt-5">
        <div className="d-flex flex-column justify-content-center w-50 mt-1 plan-input-container">
            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="day">Day</label>
                <span className="line-break"></span>
                <input className="ms-auto w-200px plan-day-input" onChange={e => {
                    setCurrentDay(e.target.value);
                }} value={currentDay} type="date" name="day" id="day" />
            </div>
            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="task">Task name</label>
                <span className="line-break"></span>
                <input className="ms-auto w-200px plan-day-input" type="text" name="task" id="task" value={currentTaskName}
                    onChange={e => {
                        setCurrentTaskName(e.target.value);
                    }} />
            </div>
            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="startTime">Task start time</label>
                <span className="line-break"></span>
                <input className="ms-auto w-200px plan-day-input" type="time" name="startTime" id="startTime" value={currentTaskStartTime}
                    onChange={e => {
                        console.log(e.target.value);
                        setCurrentTaskStartTime(e.target.value);
                    }} />
            </div>

            <div className="my-2 d-flex flex-row align-items-center">
                <label className="label-text" htmlFor="endTime">Task end time</label>
                <span className="line-break"></span>
                <input className="ms-auto w-200px plan-day-input" type="time" name="endTime" id="endTime" value={currentTaskEndTime}
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
                <input className="ms-auto w-200px plan-day-input" type="text" name="dayGoal" id="dayGoal" value={currentDayGoal}
                    onChange={e => {
                        setCurrentDayGoal(e.target.value);
                    }} />
            </div>

            <div className="my-2 d-flex flex-row align-items-center justify-content-evenly">
                <div className="w-50 justify-content-center d-flex flex-row label-text">
                    <label htmlFor="">Add goal for the day</label>
                </div>
                <div>
                    <button className="plan-input-button">Submit</button>
                </div>
            </div>

        </div>

        <div className="plan-container mt-1 d-flex flex-column justify-content-start">
            <div className="text-center mb-2 text-maroon h5">
                Current Plan
            </div>
            <div>
                {currentDayPlan.map(task => {
                    return <div key={task.taskName} className="text-maroon py-1">
                        {task.taskName} {" - "} {
                            new Date(task.taskStartTime).getHours()
                            + ":"
                            + (new Date(task.taskStartTime).getMinutes() < 10 ?
                                "0" + new Date(task.taskStartTime).getMinutes()
                                : new Date(task.taskStartTime).getMinutes())
                        } {" to "} {
                            new Date(task.taskEndTime).getHours()
                            + ":"
                            + (new Date(task.taskEndTime).getMinutes() < 10 ?
                            "0" + new Date(task.taskEndTime).getMinutes()
                            : new Date(task.taskEndTime).getMinutes())
                        }
                    </div>
                })}
            </div>
        </div>

    </div>
}
export default CreatorPage