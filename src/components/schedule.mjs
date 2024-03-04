import { useState, useEffect } from 'react'
import { deleteSchedule, getAllSchedules, putSchedule } from '../lambdas/invoke.mjs'

const ScheduleComponent = () => {
    const [schedulesArray, setSchedulesArray] = useState([])
    const [scheduleId, setScheduleId] = useState('2')
    const [scheduleName, setScheduleName] = useState('cagri')
    const [startTime, setStartTime] = useState('12:00')
    const [wateringDuration, setWateringDuration] = useState('60')
    const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    const [active, setActive] = useState(false)
    const [deviceId, setDeviceId] = useState('2')
    const [schedule, setSchedule] = useState([{}])
   

    const getSchedulesArray = async (id, deviceId) => {
        let message = "";
        if (deviceId === undefined) {
            message = "deviceId is required";
            console.log(message);
            return;
        }
        const response = await getAllSchedules(id, deviceId);
        if (response === null) {
            message = "Could not get schedules";
            console.log(response.statusCode, response.body);
        }
        if(!id){
            let schedulesArray = [];
            console.log("response: ", response);
            const schedules = response.body.schedules;
            for (let key in schedules) {
    
                schedulesArray.push(schedules[key]);
            }
            setSchedulesArray(schedulesArray);
        }
        else{
            console.log("response: ", response);
            const schedule = response.body.schedules;
            setSchedule(schedule);
        }
    };

    
    const putScheduleFunction = async () => {

        let message = "";
        let schedule = {
            id: scheduleId,
            name: scheduleName,
            startTime: startTime,
            wateringDuration: wateringDuration,
            days: days,
            active: active,
        }
        const response = await putSchedule(schedule, deviceId);
        if (response === null) {
            message = "Could not put schedule";
            console.log(message + response.statusCode, response.body);
            return;
        }
        console.log("putscheduleresponse: ", response);

    }
    const deleteScheduleFunction = async (id, deviceId) => {

        deviceId = "2";
        let message = "";
        if (id == null && id === '') {
            return;
        }

        const response = await deleteSchedule(id, deviceId);
        if (response === null) {
            message = "Could not delete schedule";
            console.log(message, response.statusCode, response.body);
        }
        console.log("response: ", response);

        setSchedulesArray(schedulesArray.filter((schedule) => schedule.id !== id));
    }

    useEffect(() => {
        getSchedulesArray(null, deviceId);
    }, [deviceId]);

    useEffect(() => {
        getSchedulesArray(scheduleId, deviceId);
    }, [scheduleId]);

    return (
        <div className="schedule">
            <h1>{deviceId}</h1>
            <input type="text" placeholder="Device ID" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
            <h1>New Schedule</h1>
            <div>
                <input type="text" placeholder="Schedule ID" value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} />
                <input type="text" placeholder="Schedule Name" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
                <input type="time" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <input type="text" placeholder="Watering Duration" value={wateringDuration} onChange={(e) => setWateringDuration(e.target.value)} />
                <input type="text" placeholder="Days" value={days} onChange={(e) => setDays(e.target.value)} />
                <input type="text" placeholder="Active" value={active} onChange={(e) => setActive(e.target.value)} />
                <button onClick={() => putScheduleFunction(scheduleId, deviceId)}>Create Schedule</button>
            </div>
            <h1>Update Schedule</h1>
            <div>
                <input type="text" placeholder="Schedule ID" value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} />
                <button onClick={() => putScheduleFunction(scheduleId, deviceId)}>Update Schedule</button>
                <button onClick={() => getSchedulesArray(scheduleId, deviceId)}>Get Schedule</button>
            </div>
            <h1>Schedule</h1>
            <div>{JSON.stringify(schedule)}</div>

            <h1>Schedules</h1>
            <div>
                <button onClick={() => getSchedulesArray(null, deviceId)}>Get Schedules</button>
                <div>
                    {schedulesArray.map((schedule) => (
                        <div key={schedule.id}>
                            <h2>{schedule.name}</h2>
                            <p>Schedule ID: {schedule.id}</p>
                            <p>Start Time: {schedule.startTime}</p>
                            <p>Watering Duration: {schedule.wateringDuration}</p>
                            <p>Days: {JSON.stringify(schedule.days)}</p>
                            <p>Active: {schedule.active ? 'Yes' : 'No'}</p>
                            <button onClick={() => deleteScheduleFunction(schedule.id, schedule.deviceId)}>Delete Schedule</button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ScheduleComponent