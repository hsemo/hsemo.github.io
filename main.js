import $ from './modules/helpers.js';
import {getStoredTodos, saveTodo, removeTodo} from './modules/store.js';

window.addEventListener('DOMContentLoaded', () => {
  console.log("document loaded.");
  addStoredTodos();
  addEventListeners();

});

function createTodoElement(todo={}){
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
    let li = createTodoElement(todo);
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
  let li = createTodoElement({
    id: Date.now(),
    completed: false,
    text: ''
  });
  $('#todo-list').appendChild(li);
  $('.todo-input', li).focus();
}

function handleRemoveTodo(event){
  event.preventDefault();
  let li = event.target.parentElement;
  let ul = li.parentElement;
  $('.todo-input', li).removeEventListener('keyup', handleEnterKey);
  ul.removeChild(li);

  let todo = $.getTodoDataFromInput(event.target);
  removeTodo(todo);
}

function handleCompletedTodo(event){
  let li = event.target.parentElement;
  let input = $('.todo-input', li);

  if(input.className.indexOf(' todo-finished') < 0){
    input.className += ' todo-finished';
  }else {
    input.className = input.className.replace(' todo-finished', '');
  }

  let todo = $.getTodoDataFromInput(input);
  saveTodo(todo);
}

function handleEnterKey(event){
  event.stopPropagation();

  if(event.key === 'Escape'){
    event.target.blur();

  } else if(event.ctrlKey && event.key === 'Enter'){
    let li = createTodoElement($.createEmptyTodo());

    event.target.parentElement.insertAdjacentElement('afterend', li);

    $('.todo-input', li).focus();

  } else if(event.shiftKey && event.key === 'Enter'){
    let todo = $.getTodoDataFromInput(event.target);
    saveTodo(todo);

    let prevli = event.target.parentElement.previousSibling;
    if(prevli){
      // focus on previous todo
      $('.todo-input', prevli).focus();
    }

  } else if(event.key === 'Enter'){
    let todo = $.getTodoDataFromInput(event.target);
    saveTodo(todo);

    let nextli = event.target.parentElement.nextSibling;
    if(nextli){
      // focus on next todo
      $('.todo-input', nextli).focus();
    } else if(event.target.value.trim()){
      // create new todo if there is no next todo
      handleAddTodo({code: 'KeyT'});
    }
  }
}

function handleFocusOut(event){
  let todo = $.getTodoDataFromInput(event.target);
  saveTodo(todo);
}
