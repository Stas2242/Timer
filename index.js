'use strict';

const inputTitleText = document.getElementById(['title-date'])
const mainTitle = document.querySelector('h1')
const buttonStart = document.getElementById('btn')
const buttonReset = document.getElementById(['btn-reset'])
const inputDate = document.getElementById('date')
const numbers = document.querySelector('.numbers')

const firstScreen = document.querySelector('.input')
const secondScreen = document.querySelector('.output')

let timerDeadline
let timerId = null
let dateNow = moment();

function timerStart () {
    const localdate = localStorage.setItem('date', inputDate.value);
    timerDeadline = inputDate.value;

    if (inputDate.value === '') {
        alert('Пожалуйста введите дату');
        return;
    }

    if (moment(timerDeadline).diff(dateNow) <= 0) {
        inputDate.value = '';
        alert('Дата прошла! Введите более позднюю дату!');
        return; 
    }

    countDown();
    timerId = setInterval(countDown, 1000);
    titleChange();
    newScreen();
}

function countDown () {
    dateNow = moment(); 

    if (moment(timerDeadline).diff(dateNow) <= 0) {
        clearInterval(timerId);
        return;
    }

    let days = moment(timerDeadline).diff(dateNow, 'days');
    let hours = moment(timerDeadline).diff(dateNow, 'hours') % 24;
    let minutes = moment(timerDeadline).diff(dateNow, 'minutes') % 60;
    let seconds = moment(timerDeadline).diff(dateNow, 'seconds') % 60;

    numbers.textContent = `${days < 10 ? '0' + days : days}:${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds: seconds}`    
}

function titleChange () {
    const newTitle = `${inputTitleText.value} (${moment(timerDeadline).format('DD.MM.YYYY')})`;
    const localTitle = localStorage.setItem('title', newTitle);
    mainTitle.innerHTML = newTitle;
}

function newScreen () {
    firstScreen.classList.add('hide');
    secondScreen.classList.remove('hide');
    buttonStart.classList.add('hide');
    buttonReset.classList.remove('hide');
}

function timerReset() {
    firstScreen.classList.remove('hide');
    secondScreen.classList.add('hide');
    buttonStart.classList.remove('hide');
    buttonReset.classList.add('hide');

    mainTitle.innerHTML = 'Создать новый таймер обратного отсчета';
    inputTitleText.value = '';
    inputDate.value = '';
    clearInterval(timerId);
    
    localStorage.removeItem('title');
    localStorage.removeItem('date');
}

const localStorageCheck = () => {
    const localdate = localStorage.getItem('date')
    const localTitle = localStorage.getItem('title')

    if (!localdate && !localTitle) {
        return;
    } else {
        timerDeadline = localdate
        mainTitle.textContent = localTitle

        timerId = setInterval(countDown, 1000);
        newScreen();
    }
}

localStorageCheck();

buttonStart.addEventListener('click', timerStart);
buttonReset.addEventListener('click', timerReset);