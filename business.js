function initialize(){
    console.log("updating")
    renderTask(GlobalData.id);
    renderCalendar(GlobalData.date, GlobalData.id);
    renderDropDown();
}

function changeMonth(inc){
    globalDate = GlobalData.date;

    document.getElementById("calendar").innerHTML = '';
    newMonth = inc ? globalDate.getMonth()+1 :  globalDate.getMonth()-1;
    GlobalData.date = new Date(globalDate.getFullYear(), newMonth, 1); 

    initialize();
}

function create(){

    taskName = prompt("Task Name?");
    createTask(taskName);

}

function update(taskId){
    updateTask(taskId);
}
