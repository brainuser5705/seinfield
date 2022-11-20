const URI = 'http://localhost:4000/';

function getTask(taskId){
    request = new Request(URI + taskId);
    return fetch(request).then((response) => response.json());
}

function getAllTasks(){
    request = new Request(URI);
    return fetch(request).then((response) => response.json());
}

function createTask(taskName){
    request = new Request(URI);
    return fetch(request, {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(
            {"title": taskName, 
            "startDate": (new Date()).toString(),
        "endDate": (new Date()).toString()}
        )
    });
}

function updateTask(taskId){
    request = new Request(URI + taskId + "/increment");
    return fetch(request, {
        "method": "PATCH",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify({
            "dateString": (new Date()).toString()
        })
    });
}