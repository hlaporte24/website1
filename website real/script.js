const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

const modal = document.getElementById('entry-modal');
const closeModal = document.getElementById('close-modal');
const modalDate = document.getElementById('modal-date');
const entryForm = document.getElementById('entry-form');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let selectedDate = null;
let entries = JSON.parse(localStorage.getItem('dinnerEntries')) || {};

const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function renderCalendar(month,year){
    calendarDates.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysinMonth = new Date(year,month + 1, 0).getDate();

    for (let i=0;i<firstDay;i++){
        const blank = document.createElement('div');
        calendarDates.appendChild(blank);
    }

    for (let i=1; i<=daysinMonth; i++){
        const day = document.createElement('div');
        day.textContent = i;

        const dateKey = `${year}-${month+1}-${i}`;
        if(entries[dateKey]){
            day.classList.add('has-entry');
        }

        day.addEventListener('click', () => openModal(i, month, year));
        calendarDates.appendChild(day);
    }
}

function openModal(day,month,year){
    selectedDate = `${year}-${month+1}-${day}`;
    modalDate.textContent = `${months[month]} ${day}, ${year}`;

    const existing = entries[selectedDate];
    document.getElementById('entry-title').value = existing?.title || '';
    document.getElementById('entry-time').value = existing?.time || '';
    document.getElementById('entry-notes').value = existing?.notes || '';

    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () =>{
    modal.classList.add('hidden');
});

entryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    entries[selectedDate] = {
        title: document.getElementById('entry-title').value,
        time: document.getElementById('entry-time').value,
        notes: document.getElementById('entry-notes').value
    };

    localStorage.setItem('dinnerEntries', JSON.stringify(entries));
    modal.classList.add('hidden');
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth,currentYear);

prevMonthBtn.addEventListener('click', () =>{
    currentMonth--;
    if(currentMonth<0){
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar(currentMonth,currentYear);
});

nextMonthBtn.addEventListener('click',()=>{
    currentMonth++;
    if(currentMonth>11){
        currentMonth = 0;
        currentYear++;
        
    }

    renderCalendar(currentMonth,currentYear);
});