'use strict'

const inputTitleText = document.getElementById(['title-date'])
const mainTitle = document.querySelector('h1')
const buttonStart = document.getElementById('btn')
const buttonReset = document.getElementById(['btn-reset'])
const inputDate = document.getElementById('date')

const firstScreen = document.querySelector('.input')
const secondScreen = document.querySelector('.output')

function countDown () {  
    if (inputDate.value === '') {
        return alert('Пожалуйста введите дату');
    }

    titleChange();
    newScreen();
}

function titleChange () {
    const newTitle = inputTitleText.value
    mainTitle.innerHTML = newTitle;
}

function newScreen () {
    firstScreen.classList.add('hide');
    secondScreen.classList.remove('hide');
    buttonStart.classList.add('hide');
    buttonReset.classList.remove('hide');
}

function countDownReset() {
    firstScreen.classList.remove('hide');
    secondScreen.classList.add('hide');
    buttonStart.classList.remove('hide');
    buttonReset.classList.add('hide');

    mainTitle.innerHTML = 'Создать новый таймер обратного отсчета'
    inputTitleText.value = ''
    inputDate.value = ''

}

buttonStart.addEventListener('click', countDown);
buttonReset.addEventListener('click', countDownReset);