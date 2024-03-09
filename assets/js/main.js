/**
 * 
 * @param {*} x 
 * @returns {HTMLElement} HTMLElement
 */


function qs (x){
    return document.querySelector(x);
}

const todoForm = document.querySelector('.todoForm');
const todoİnput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.addTodo');
const todoList = document.querySelector('.todo-List')
const completedList = document.querySelector('.completed-List');

//dialog kismi
const dialogKismi = document.querySelector('dialog');
const openDialog = document.querySelector('.open-todo');
const closeDialog = document.querySelector('.vazgec');

//günler
const monday = document.querySelector('#mon');
const tuesday = document.querySelector('#tues');
const wednesday = document.querySelector('#wednes');
const thursday = document.querySelector('#thurs');
const friday = document.querySelector('#fri');
const saturday = document.querySelector('#satur');




const days = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
]

let todos =[
    {
        task:'Evi Topla',
        day: 0
    }
]



openDialog.addEventListener('click',() =>{
    dialogKismi.showModal();
})
closeDialog.addEventListener('click', () => {
    dialogKismi.close();
})


todoForm.addEventListener('submit', () =>{

    const todoDataForm = new FormData(todoForm);
    const todoObj = Object.fromEntries(todoDataForm.entries());

    todos.push(todoObj);
    appendTodo(todoObj);

    todoForm.reset();

})

function todoYap(todo){
    
    let todoContainer = document.createElement('li');
    todoContainer.innerText =  todo.task;

    let delBtn = document.createElement('button');
    let doneBtn = document.createElement('button');

    delBtn.innerText = 'delete';
    doneBtn.innerText = 'done';

    delBtn.classList.add('open-todo');
    doneBtn.classList.add('open-todo');

    delBtn.classList.add('btnKonum');
    doneBtn.classList.add('btnKonum');
    

    todoContainer.classList.add('todoContainer-style');


    todoContainer.appendChild(doneBtn);
    todoContainer.appendChild(delBtn);

    doneBtn.addEventListener('click',done);
    delBtn.addEventListener('click',delTodo);

    return todoContainer;

}

function appendTodo(todo){

    days[todo.day].appendChild(todoYap(todo));
}


function delTodo(){
    this.parentElement.remove();
}
function done() {
    this.parentElement.classList.toggle('checked');
    
}

function init(){
    for (const todo of todos) {
        appendTodo(todo);
    }
}

init();
