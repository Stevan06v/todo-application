

const date = new Date();
/*mithilfe dieses tutorials https://www.youtube.com/watch?v=o1yMqPyYeAo&t=1933s gemacht*/ 
function renderCalendar() {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];

    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
};


document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();







let getAllTodos = {
    list: []
}

let pos = 0
function colorizeTodos() {
    for (let x = 0; x < JSON.parse(localStorage.getItem('Groups')).length; x++) {
        for (let y = 0; y < JSON.parse(localStorage.getItem('Groups'))[x].todos.length; y++) {
           document.getElementsByClassName('bigTodoName')[pos].style.backgroundColor = 
           `${JSON.parse(localStorage.getItem('Groups'))[x].color}` 
           pos++
        }
    } 
}



function getAllTodosSpawnTodos() {
    if (localStorage.hasOwnProperty("Groups")) {
        let groups = JSON.parse(localStorage.getItem('Groups'))

        //add Data
        for (let i = 0; i < groups.length; i++) {
            for (let j = 0; j < groups[i].todos.length; j++) {
                getAllTodos.list.push(groups[i].todos[j])
            }
        }
        console.log(getAllTodos.list);
        if (getAllTodos.list.length != 0) {
            for (i = 0; i < getAllTodos.list.length; i++) {
                document.getElementById('showBox').innerHTML += `
<div class="bigTodoBox">
      <div class="bigTodoName">${getAllTodos.list[i].name}</div>
      <div class="showTodoDescription">${getAllTodos.list[i].description}</div>
      <div class="dateBox">
      <i class="fa-solid fa-calendar"></i>
      <div class="showBigTodoDate">${getAllTodos.list[i].date}</div>
      </div>
  </div>
  `
            }
            colorizeTodos()
        } else {
            document.getElementById('showBox').innerHTML = "Currently no data available"
        }
    } else {
        document.getElementById('showBox').innerHTML = "Currently no data available"
    }
}
getAllTodosSpawnTodos() 
