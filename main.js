import $ from './modules/helpers.js';
import {getStoredTodos, saveTodo, removeTodo} from './modules/store.js';

window.addEventListener('DOMContentLoaded', () => {
  console.log("document loaded.");
  addStoredTodos();
  addEventListeners();

});

function createTodo(todo={}){
  let li = $.createElement('li', {
    className: 'todo-item',
  });
  li.dataset.id = todo.id;

  let completedBtn = $.createElement('input', {
    type: 'checkbox',
    className: 'todo-check-btn',
    checked: todo.completed
  });
  li.appendChild(completedBtn);

  let rmvbtn = $.createElement('button', {
    type: 'button',
    className: 'todo-rmv-btn',
  });
  li.appendChild(rmvbtn);

  let input = $.createElement('input', {
    className: 'todo-input' + (todo.completed ? ' todo-finished' : ''),
    placeholder: 'What needs to be done?',
    value: todo.text
  });
  $.on(input, 'keyup', handleEnterKey);
  li.appendChild(input);

  return li;
}

function addStoredTodos(){
  let todos = getStoredTodos();

  if(todos.length == 0){
    return;
  }

  // clearing hard coded todo item
  let ul = $('#todo-list');
  ul.removeChild($('li', ul));

  for(const todo of todos){
    let li = createTodo(todo);
    ul.appendChild(li);
  }
}

function addEventListeners(){
  let ul = $('#todo-list');

  // completed event
  $.delegate(ul, 'click', '.todo-check-btn', handleCompletedTodo);

  // remove event
  $.delegate(ul, 'click', '.todo-rmv-btn', handleRemoveTodo);

  // input edit event
  $.delegate(ul, 'focusout', '.todo-input', handleFocusOut);

  // add todo
  $.on(window, 'keyup', handleAddTodo);

}

function handleAddTodo(event){
  if(event.code !== 'KeyT'){
    return;
  }
  let li = createTodo({
    id: Date.now(),
    completed: false,
    text: ''
  });
  $('#todo-list').appendChild(li);
}

function handleRemoveTodo(event){
  event.preventDefault();
  let li = event.target.parentElement;
  let ul = li.parentElement;
  ul.removeChild(li);

  let todo = $.getTodoDataFromInput(event.target);
  removeTodo(todo);
}

function handleCompletedTodo(event){
  // event.preventDefault();
  let li = event.target.parentElement;
  let input = $('.todo-input', li);

  if(input.className.indexOf(' todo-finished') < 0){
    input.className += ' todo-finished';
  }else {
    input.className = input.className.replace(' todo-finished', '');
  }

  let todo = $.getTodoDataFromInput(input);
  console.log('checked: ', todo);
  saveTodo(todo);
}

function handleEnterKey(event){
  if(event.ctrlKey && event.key === 'Enter'){
    console.log("Ctrl+Enter pressed");
  }else if(event.key === 'Enter'){
    event.target.blur();
    let todo = $.getTodoDataFromInput(event.target);
    saveTodo(todo);
  }
}

function handleMouseIn(event){
}

function handleMouseOut(event){
}

function handleFocusIn(event){
}

function handleFocusOut(event){
  let todo = $.getTodoDataFromInput(event.target);
  saveTodo(todo);
}
