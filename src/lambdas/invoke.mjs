
const url = "https://5rk9a2pa9e.execute-api.us-east-1.amazonaws.com";
async function getSchedule(id) {
    const link = url + '/test/schedules/' + id;

    const response = await fetch(link);
    const data = await response.json();
    return data;
}

async function getAllSchedules() {

    const link = url + '/test/schedules';

    const response = await fetch(link, {
        method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    let schedules= {};
    schedules = {
        body: data.body,
        deviceId: data.deviceId
    }

    return schedules;
}

async function deleteSchedule(id) {
    try {
        const link = url + '/test/schedules/' + id;
        const params = {
            id: id
        }
        const response = await fetch(link, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }

}



async function putSchedule(schedule) {

    const link = url + '/test/schedules';
    const body = {
        body: schedule
    }
    const response = await fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}


export { getSchedule, getAllSchedules, deleteSchedule, putSchedule };

