/**
 *
 * @param {*} x
 * @returns {HTMLElement} HTMLElement
 */

function qs(x) {
  return document.querySelector(x);
}

const todoForm = qs('.todoForm');
const todoInput = qs('.todo-input');
const addBtn = qs('.addTodo');
const todoList = qs('.todo-List');
const completedList = qs('.completed-List');

// Dialog kısmı
const dialogKismi = document.querySelector('dialog');
const openDialog = qs('.open-todo');
const closeDialog = qs('.vazgec');

// Günler
const monday = qs('#mon');
const tuesday = qs('#tues');
const wednesday = qs('#wednes');
const thursday = qs('#thurs');
const friday = qs('#fri');
const saturday = qs('#satur');

const days = [monday, tuesday, wednesday, thursday, friday, saturday];

// Local Storage'dan veri yükleme
function loadFromLocalStorage() {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
}

// Local Storage'a veri kaydetme
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Local Storage'ı güncelleme
function updateLocalStorage() {
  saveToLocalStorage(); // Local Storage'a veriyi kaydet
}

// Silme işlevini ekleme
function delTodo() {
  const todoId = this.parentElement.id; // Silinecek todo öğesinin ID'sini al
  const todoIndex = todos.findIndex((todo) => todo.id === Number(todoId));
  this.parentElement.remove();
  todos.splice(todoIndex, 1);

  // Local Storage'ı güncelle
  saveToLocalStorage();
}

openDialog.addEventListener('click', () => {
  dialogKismi.showModal();
});
closeDialog.addEventListener('click', () => {
  dialogKismi.close();
});

todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Formun sayfanın yeniden yüklenmesini önle

  const todoDataForm = new FormData(todoForm);
  const todoObj = Object.fromEntries(todoDataForm.entries());

  // Her bir todo öğesi için benzersiz bir ID oluştur
  const todoId = Date.now();

  todoObj.id = todoId; // Todo öğesine ID'yi ekleyin

  todos.push(todoObj);
  appendTodo(todoObj);

  todoForm.reset(); // Formu sıfırla

  // Local Storage'ı güncelle
  saveToLocalStorage();
});

function todoYap(todo) {
  const todoContainer = document.createElement('li');
  todoContainer.innerText = todo.task;
  todoContainer.id = todo.id;

  const delBtn = document.createElement('button');
  const doneBtn = document.createElement('button');

  delBtn.innerText = 'delete';
  doneBtn.innerText = 'done';

  delBtn.classList.add('open-todo');
  doneBtn.classList.add('open-todo');
  doneBtn.classList.add('doneBtn');

  delBtn.classList.add('btnKonum');
  doneBtn.classList.add('btnKonum');

  todoContainer.classList.add('todoContainer-style');

  todoContainer.appendChild(doneBtn);
  todoContainer.appendChild(delBtn);

  doneBtn.addEventListener('click', done);
  delBtn.addEventListener('click', delTodo);
  // Eğer todo tamamlanmışsa, checked class'ını ekle

  if (todo.completed) {
    todoContainer.classList.add('checked');
  }

  return todoContainer;
}

function appendTodo(todo) {
  days[todo.day].appendChild(todoYap(todo));
}

function done() {
  this.parentElement.classList.toggle('checked');

  const todoId = this.parentElement.id;
  const todoIndex = todos.findIndex((todo) => todo.id == Number(todoId));

  todos[todoIndex].completed = !todos[todoIndex].completed;
  updateLocalStorage();
}

function init() {
  for (const todo of todos) {
    appendTodo(todo);
  }
}

// Local Storage'dan veriyi yükle ve uygula
loadFromLocalStorage();
init();
