globalDate = new Date();
globalTaskId = 2;

function initialize(){
    renderCalendar(globalDate);
    populate(globalTaskId);
}

function changeMonth(inc){
    document.getElementById("calendar").innerHTML = '';
    newMonth = inc ? globalDate.getMonth()+1 :  globalDate.getMonth()-1;
    globalDate = new Date(globalDate.getFullYear(), newMonth, 1); 
    initialize();
}

function populate(){
    getTask().then((json) => {
        document.querySelectorAll("td").forEach(element => {
            startDateObject = new Date(json.startDate);
            endDateObject = new Date(json.endDate);
            dateObject = new Date(element.id);
            if (dateObject >= startDateObject && dateObject <= endDateObject){
                element.innerHTML="you did it!";
            }
        })
    })
}
