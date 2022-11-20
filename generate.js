const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function renderCalendar(date){
    generateTitle(date);
    generateMonth(date);
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

        conElement.setAttribute("class", "click-area");
        conElement.innerHTML = " ";
        
        // can only click if date is today
        if (date.get().getDate() == (new Date()).getDate()){
            td.addEventListener("click", function (){
                conElement.innerHTML = "X";
            });
        }         
    }

    td.appendChild(numElement);
    td.appendChild(conElement);

    return td;
    
}