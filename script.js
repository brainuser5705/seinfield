currentDate = new Date();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function init(date){
    generateTitle(date);
    generateMonth(date);
    getData(1);
}

function generateTitle(date){
    document.getElementById("title").innerHTML = monthNames[date.getMonth()] + " " + date.getFullYear();   
}

function clearTable(){
    document.getElementById("calendar").innerHTML='';
}

function decrementCurrentMonth(){
    clearTable();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
    generateMonth(currentDate);
    getData(1);
}

function incrementCurrentMonth(){
    clearTable();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
    generateMonth(currentDate);
    getData(1);
}

function generateMonth(date){
    currentMonth = date.getMonth();
    while (date.getMonth() == currentMonth){
        date.setDate(date.getDate()+1);
    }
    date.setDate(date.getDate()-1);

    nextDate = new Date(date.getTime());
    while (nextDate.getMonth() == currentMonth){
        nextDate = generateWeek(nextDate);
    }
}

function generateWeek(finalDate){
    month = finalDate.getMonth();

    row = document.createElement("tr")
    document.getElementById("calendar").prepend(row);

    while (finalDate.getDay() != 0){
        td = document.createElement("td");
        td.setAttribute("id", finalDate.toString());
        td.addEventListener("click", function (){
            this.innerHTML = "X";
        });
        if (finalDate.getMonth() == month){           
            td.innerHTML = finalDate.getDate();           
        } else {
            td.innerHTML = " ";        
        }
        row.prepend(td)
        finalDate.setDate(finalDate.getDate()-1);

    }

    if (finalDate.getDay() == 0){
        td = document.createElement("td");
        td.setAttribute("id", finalDate.toString());
        td.addEventListener("click", function (){
            this.innerHTML = "X";
        });
        if (finalDate.getMonth() == month){
            td.innerHTML = finalDate.getDate();  
        } else {
            td.innerHTML = " ";
        }
        row.prepend(td)
        finalDate.setDate(finalDate.getDate()-1);
    }
    return finalDate;
}

function getData(taskId) {
    const request = new Request('http://localhost:4000/' + taskId);
    fetch(request)
        .then((response) => response.json())
        .then((json) => populate(json));
}

function populate(json){
    document.querySelectorAll("td").forEach(element => {
        startDateObject = new Date(json.startDate);
        endDateObject = new Date(json.endDate);
        dateObject = new Date(element.id);
        if (dateObject >= startDateObject && dateObject <= endDateObject){
            console.log("Updated for " + dateObject.toString());
            element.innerHTML="you did it!";
        }
    });;
}