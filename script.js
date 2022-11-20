currentDate = new Date();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function generateTitle(date){
    document.getElementById("title").innerHTML = monthNames[date.getMonth()] + " " + date.getFullYear();   
}

function clearTable(){
    document.getElementById("calendar").innerHTML='';
}

function decrementCurrentMonth(){
    clearTable();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
    console.log(currentDate);
    generateMonth(currentDate);
}

function incrementCurrentMonth(){
    clearTable();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
    console.log(currentDate);
    generateMonth(currentDate);
}

function generateMonth(date){
    generateTitle(date);
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

// function populate(){
//     json = JSON.parse(data);
//