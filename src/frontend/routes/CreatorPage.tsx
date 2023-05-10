import { useState } from "react"

const CreatorPage = () => {

    const [currentDay, setCurrentDay] = useState('');
    const [currentTaskName, setCurrentTaskName] = useState('');
    const [currentTaskStartTime, setCurrentTaskStartTime] = useState('');
    const [currentTaskEndTime, setCurrentTaskEndTime] = useState('');
    const [currentDayGoal, setCurrentDayGoal] = useState('');


    return <div className="container d-flex flex-row justify-content-evenly mt-5">
        <div className="d-flex flex-column justify-content-center w-50">
            <div className="my-2 d-flex flex-row">
                <label htmlFor="day">Day</label>
                <span className="line-break"></span>
                <input className="ms-auto w-25"  onChange={e => {
                    setCurrentDay(e.target.value);
                }} value={currentDay} type="date" name="day" id="day" />
            </div>
            <div className="my-2 d-flex flex-row">
                <label htmlFor="task">Task name</label>
                <span className="line-break"></span>
                <input className="ms-auto w-25" type="text" name="task" id="task" value={currentTaskName}
                    onChange={e => {
                        setCurrentTaskName(e.target.value);
                    }} />
            </div>
            <div className="my-2 d-flex flex-row">
                <label htmlFor="startTime">Task start time</label>
                <span className="line-break"></span>
                <input className="ms-auto w-25" type="time" name="startTime" id="startTime" value={currentTaskStartTime}
                onChange={e =>{
                    console.log(e.target.value);
                    setCurrentTaskStartTime(e.target.value);
                }} />
            </div>

            <div className="my-2 d-flex flex-row">
                <label htmlFor="endTime">Task end time</label>
                <span className="line-break"></span>
                <input className="ms-auto w-25" type="time" name="endTime" id="endTime" value={currentTaskEndTime} 
                onChange={e =>{
                    setCurrentTaskEndTime(e.target.value);
                }} />
            </div>

            <div className="my-2 d-flex flex-row">
                <label htmlFor="dayGoal">Add day Goal</label>
                <span className="line-break"></span>
                <input className="ms-auto w-25" type="text" name="dayGoal" id="dayGoal" value={currentDayGoal}
                onChange={e =>{
                    setCurrentDayGoal(e.target.value);
                }} />
            </div>

        </div>

        <div className="plan-card">
                <div>
                    Current Plan
                </div>
        </div>

    </div>
}
export default CreatorPage