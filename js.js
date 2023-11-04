
//#region post 
let button_add = document.querySelector("#add");
button_add.addEventListener('click', () => {
    let inputs = document.querySelectorAll('#add-events .hidden');
    for (input of inputs)
        input.classList.add('open');
})

document.querySelector('#post').addEventListener('click', () => {

    axios.post('https://localhost:7292/api/Events', {
        title: `${document.querySelector('.title').value}`,
        start: `${document.querySelector('.start').value}`
    }).then(res => {
        location.reload();
    })
})

document.querySelector('.close').addEventListener('click', () => {
    let inputs = document.querySelectorAll('#add-events .hidden');
    for (input of inputs)
        input.classList.remove('open');
})
//#endregion

//#region delete

document.querySelector('.close-del').addEventListener('click', () => {
    let inputs = document.querySelectorAll('#delete-event .hidden');
    for (input of inputs)
        input.classList.remove('open');
})

document.querySelector('#delete').addEventListener('click', () => {
    let hiddens = document.querySelectorAll('#delete-event .hidden');
    for (h of hiddens)
        h.classList.add('open');
    let select = document.querySelector('#events-list');
    axios.get('https://localhost:7292/api/Events').then(res => {
        for (data of res.data) {
            let option = document.createElement('option');
            option.innerHTML = `id:${data.id}  ${data.title} start:${data.start} end:${data.end}`;
            option.dataset.id = data.id;
            select.append(option);
        }
    })
})

document.querySelector('#del').addEventListener('click', () => {
    let event = document.querySelector('#events-list').value;
    let id = event.slice(event.indexOf(':') + 1, event.indexOf(' '));
    axios.delete(`https://localhost:7292/api/Events/${id}`).then(res => {
        location.reload();
    })
})

//#endregion

//#region update
document.querySelector('#update').addEventListener('click', () => {
    let hids = document.querySelectorAll('#update-event .hidden');
    for (h of hids)
        h.classList.add('open');
    let select = document.querySelector('#events-list-update');
    axios.get('https://localhost:7292/api/Events').then(res => {
        for (data of res.data) {
            let option = document.createElement('option');
            option.innerHTML = `id:${data.id} start:${data.start} title:${data.title}`;
            option.dataset.id = data.id;
            select.append(option);
        }
    })
})
let id_up;
document.querySelector('#events-list-update').addEventListener('change', () => {

    let select = document.querySelector('#events-list-update').value;
    let splits = select.split(':');
    document.querySelector('.up-title').value = splits[splits.length-1];
    document.querySelector('.up-date').value = splits[2].slice(0, splits[2].indexOf('T'));
    id_up = splits[1].slice(0, splits[1].indexOf(' '));
    document.querySelector('.h3-special').classList.add('hidden3');
    document.querySelector('.h3-special').classList.add('open');
})
document.querySelector('#up').addEventListener('click', () => {
    let title = document.querySelector('.up-title').value;
    let date = document.querySelector('.up-date').value;
    axios.put(`https://localhost:7292/api/Events/${id_up}`, {
        "title": title,
        "start": date
    }).then(() => {
        location.reload();
    })
})
document.querySelector('.close-up').addEventListener('click', () => {
    let hids = document.querySelectorAll('#update-event .hidden');
    for (h of hids)
        h.classList.remove('open');
})
//#endregion


axios.get("https://localhost:7292/api/Events").then(res => {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: res.data,

    });
    calendar.render();
})
