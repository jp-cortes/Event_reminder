let events = [];
let arr = [];

const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#btnAdd');
const eventContainer = document.querySelector('#eventContainer');
const todayEvent = document.querySelectorAll('.days-number');

const json = load();

try {
    arr =JSON.parse(json);
} catch (error) {
    arr = [];
}

events = arr ? [...arr] : [];
renderEvents();

document.querySelector('.form').addEventListener('submit', (e) => {
e.preventDefault();
 addEvent();
});

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault();
     addEvent();
    });

function addEvent () {
    if(eventName.value == '' || eventDate.value == '') {
        return;
    }

    if(dateDiff(eventDate.value) < 0) {
      return; //////
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);
    
    save(JSON.stringify(events));

    eventName.value = '';

    renderEvents();
}

function dateDiff(d) {
const targetDate = new Date(d);
const today = new Date();
const difference = targetDate.getTime() - today.getTime();
const days = Math.ceil(difference / (1000 * 3600 * 24));
return days;
}

function renderEvents () {
    const  eventsHTML = events.map((event) => {
        return `
        <div Class="event">
            <div Class="days">
                <span Class="days-number">${dateDiff(event.date)}</span>
                <span Class="days-text">Days</span>
            </div>

                <div Class="event-name">${event.name}</div>
                <div Class="event-date">${event.date}</div>
                <div Class="actions">
                <button Class="btnDelete" data-id="${event.id}">Clear</button>
                    </div>
        </div>
        `;
        
    });
    //.join() une todo el string y lo pasa a html
    eventContainer.innerHTML = eventsHTML.join('');
    document.querySelectorAll(".btnDelete").forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('data-id');
            events = events.filter((event) => event.id !== id);
            
            save(JSON.stringify(events))

            renderEvents();
        });
    });

    
}


//funciones que utilizan el local data para guardar eventos
function save(data) {
    localStorage.setItem('items', data);
}

function load () {
    return localStorage.getItem('items');
}