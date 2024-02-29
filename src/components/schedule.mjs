import React, { useState, useEffect } from 'react';
import { getAllSchedules, getSchedule, putSchedule, deleteSchedule } from '../lambdas/invoke.mjs';

function Schedule() {

    const [id, setId] = useState('1');
    const [name, setName] = useState('cagri');
    const [startTime, setStartTime] = useState('12:00');
    const [wateringDuration, setWateringDuration] = useState('60');
    const [days, setDays] = useState([]);
    const [active, setActive] = useState(true);
    const [schedule, setSchedule] = useState({ id: 1, name: "test", startTime: "12:00", wateringDuration: 10, days: days, active: true });
    const [schedules, setSchedules] = useState([]);

    const getAllSchedulesFunction = async () => {
        const data = await getAllSchedules();
        let schedules = [];
        for (const key in data) {
            schedules.push(data[key]);
        }
        setSchedules(schedules);

    };
    const getScheduleFunction = async () => {
        const data = await getSchedule(id);
        setSchedule(data);
    }
    const putScheduleFunction = async () => {
        const data = await putSchedule({ id, name, startTime, wateringDuration, days, active });
        setSchedule(data);
    }
    const deleteScheduleFunction = async (id) => {
        console.log(id);
        const data = await deleteSchedule(id);
        setSchedule(data);
    }

    useEffect(() => {
        getAllSchedulesFunction();
    }, []);

    useEffect(() => {
        setSchedule({ id, name, startTime, wateringDuration, days, active });
    }, [id, name, startTime, wateringDuration, days, active]);

    return (
        <div>
            <h1>Schedule</h1>
            <input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="time" onChange={(e) => setStartTime(e.target.value)} />
            <input type="number" placeholder="Watering Duration" onChange={(e) => setWateringDuration(e.target.value)} />
            <div>
                <p>Days</p>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item, index) => (
                    <div key={index}>
                        <input type="checkbox" value={item} onChange={(e) => {
                            if (e.target.checked) {
                                setDays([...days, e.target.value]);
                            } else {
                                setDays(days.filter(day => day !== e.target.value));
                            }
                        }} />
                        <label>{item}</label>
                    </div>

                ))}
            </div>
            <input placeholder='Active' type="checkbox" onChange={(e) => setActive(e.target.checked)} />
            <button onClick={getAllSchedulesFunction}>Get All</button>
            <button onClick={getScheduleFunction}>Get</button>
            <button onClick={putScheduleFunction}>Add</button>
            <p>{JSON.stringify(schedule)}</p>

            <div>{schedules.map((item, index) => (
                <div key={index}>
                    <p>{item.id} yes no     </p>
                    <p>{item.deviceId}</p>
                    <p>{item.name}</p>
                    <p>{item.startTime}</p>
                    <p>{item.wateringDuration}</p>
                    <p>{item.active}</p>
                    <p>{JSON.stringify(item.days)}</p>
                    <button onClick={() => {
                        setId(item.id);
                        setName(item.name);
                        setStartTime(item.startTime);
                        setWateringDuration(item.wateringDuration);
                        setDays(item.days);
                        setActive(item.active);
                        deleteScheduleFunction(item.id);
                    }}>Delete</button>
                    <br />
                    <div>{JSON.stringify(schedules)} </div>
                </div>
            ))}</div>
            <br />


        </div>
    );


}

export default Schedule;