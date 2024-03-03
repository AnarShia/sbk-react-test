
const url = "https://5rk9a2pa9e.execute-api.us-east-1.amazonaws.com/prod/schedules";

const getAllSchedules = async (id,deviceId) => {
    
    let link = url+"/"+deviceId;
    let response;

    const params = {
        body:{
            "id": id,
        },
        pathParameters: {
            "id": deviceId
        }
    }
    
    console.log("link: ", link);
    try {
        response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        response = await response.json();

    }
    catch (error) {
        console.error("error: ", error);
    }
    return response;
}

const putSchedule = async (schedule, deviceId) => {
    let link = url+"/"+deviceId;
    let response;

    const params = {
        body: schedule,
        pathParameters: {
            "id": deviceId
        }
    }

    try {
        response = await fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        response = await response.json();

    }
    catch (error) {
        console.error("error: ", error);
    }
    return response;
}

const deleteSchedule = async (id,deviceId)=>{
    
        let link = url+"/"+deviceId;
        let response;
    
        const params = {
            body:{
                "id": id,
            },
            pathParameters: {
                "id": deviceId
            }
        }
        
        console.log("link: ", link);
        try {
            response = await fetch(link, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            response = await response.json();
    
        }
        catch (error) {
            console.error("error: ", error);
        }
        return response;
}




export { getAllSchedules, putSchedule,deleteSchedule };


