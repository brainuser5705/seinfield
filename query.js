const URI = 'http://localhost:4000/';

function getTask(taskId){
    request = new Request(URI + taskId);
    return fetch(request).then((response) => response.json());
}