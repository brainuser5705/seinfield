const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function renderCalendar(date, taskId){
    document.getElementById("calendar").innerHTML = "";
    generateTitle(date);
    generateMonth(date);
    populate(taskId);
}

function generateTitle(date){
    document.getElementById("title").innerHTML = monthNames[date.getMonth()] + " " + date.getFullYear();
}

function generateMonth(date) {
    let currentDate = new CustomDate(date);

    let currentMonth = currentDate.get().getMonth();

    let checker = currentDate.getClone().increment(); // look ahead
    while (checker.get().getMonth() == currentMonth) {
        currentDate.increment();
        checker.increment();
    }

    let next = currentDate.getClone();
    while (next.get().getMonth() == currentMonth) {
        next = generateWeek(next, currentMonth);
    }
}

function generateWeek(date, currentMonth) {
    let row = document.createElement("tr");
    document.getElementById("calendar").prepend(row);
    while (date.get().getDay() != 0) {
        row.prepend(generateDay(date, currentMonth));
        date.decrement();
    }
    if (date.get().getDay() == 0) {
        row.prepend(generateDay(date, currentMonth));
        date.decrement();
    }
    return date;
}

function generateDay(date, currentMonth) {
    let td = document.createElement("td");
    td.setAttribute("id", date.get().toString());

    let numElement = document.createElement("div");
    let conElement = document.createElement("div");
    
    if (date.get().getMonth() == currentMonth) {

        numElement.setAttribute("class", "number");
        numElement.innerHTML = date.get().getDate();
        
        // can only click if date is today
        refDate = new Date();
        if ((date.get().getMonth() == refDate.getMonth()) && (date.get().getFullYear() == refDate.getFullYear()) && (date.get().getDate() == refDate.getDate())){
            td.setAttribute("class", "highlight-day");
            td.addEventListener("click", function (){
                td.setAttribute("class", "red-x");
                td.innerHTML = "X";
                update(GlobalData.id);
            });
        }         
    }

    td.appendChild(numElement);

    return td;
    
}

function populate(taskId){
    getTask(taskId).then((json) => {
        document.querySelectorAll("td").forEach(element => {
            startDateObject = new Date(json.startDate);
            endDateObject = new Date(json.endDate);
            dateObject = new Date(element.id);
            if (dateObject >= startDateObject && dateObject <= endDateObject){
                element.setAttribute("class", "red-x");
                element.innerHTML="X";
            }
        })
    })
}

function renderTask(taskId){
    getTask(taskId).then((json) => {
        document.getElementById("task-title").innerHTML = json.title;
    });
}

function renderDropDown(){
    dropdown = document.getElementById("dropdown-menu");
    dropdown.innerHTML = ''; // clear it
    getAllTasks().then((response) => {
        response.forEach(task => {
            div = document.createElement("div");
            div.innerHTML = task.title;
            div.setAttribute("class", "dropdown-item");
            div.addEventListener("click", function() {
                console.log("Clicked for task id: " + task._id);
                GlobalData.id = task._id;
                initialize();
            });
            dropdown.appendChild(div);
        });
    });
}

// function openAddTask() {
//     console.log("openAddTask");
//     let modal = document.createElement('div');
//     modal.className = 'card';
//     modal.style = 'width: 250px; height: 150px;';

//     let modalBody = document.createElement('div');
//     modalBody.className = 'card-body';

//     let modalTitle = document.createElement('h5');
//     modalTitle.className = 'card-title';
//     modalTitle.innerHTML = 'Task Name';
//     modalBody.appendChild(modalTitle);
    
//     let titleInput = document.createElement('input');
//     modalBody.appendChild(titleInput);

//     let submit = document.createElement('button');
//     submit.innerHTML = "Submit";
//     modalBody.appendChild(submit);
//     // Will need to pass the task name from the input box in to the addTask
//     submit.onclick = addTask();

//     modal.appendChild(modalBody);

//     document.getElementById("form").appendChild(modal);
// }

// function addTask(){
//     console.log('Add Task');
// }