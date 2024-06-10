window.addEventListener('DOMContentLoaded', () => {
  console.log("document loaded.");
  // add todo event
  document.querySelector('#add-btn').addEventListener('click', handleAddTodo);

  // remove todo event
  let rmvBtns = document.getElementsByClassName('todo-rmv-btn');
  for(const rmvbtn of rmvBtns){
    rmvbtn.addEventListener('click', handleRemoveTodo);
  }

  // edit todo event
  let inputs = document.getElementsByClassName('todo-input');
  for(const input of inputs){
    input.addEventListener('change', handleEditTodo);
    input.addEventListener('mouseenter', handleMouseIn);
    input.addEventListener('mouseleave', handleMouseOut);
  }

  // form submit event
  let forms = document.getElementsByClassName('todo-form');
  for(const form of forms){
    form.addEventListener('submit', handleFormSubmit);
  }

});

function createElement(elementName='', options={}){
  let element = document.createElement(elementName);
  // Object.assign can be used here, have to search about it
  for(const key of Object.keys(options)){
    element[key] = options[key];
  }
  return element;
}

function handleAddTodo(event){
  let li = createElement('li');
  let form = createElement('form', {
    className: 'todo-form',
    action: ''
  });
  form.addEventListener('submit', handleFormSubmit);

  let inputCheckbox = createElement('input', {
    type: 'checkbox',
    className: 'todo-check-box'
  });
  form.appendChild(inputCheckbox);

  let btnRemove = createElement('button', {
    type: 'button',
    className: 'todo-rmv-btn',
    innerText: 'D'
  });
  btnRemove.addEventListener('click', handleRemoveTodo);
  form.appendChild(btnRemove);

  let input = createElement('input', {
    className: 'todo-input',
    type: 'text',
    value: 'Edit me!'
  });
  form.appendChild(input);

  let input2 = createElement('input', {
    type: 'submit',
    className: 'submit-input'
  });
  form.appendChild(input2);

  li.appendChild(form);
  document.querySelector('.unfinished ul').appendChild(li);
}

function handleRemoveTodo(event){
  event.preventDefault();
  console.log('removing todo...');
  let li = event.target.parentElement.parentElement;
  let ul = li.parentElement;
  ul.removeChild(li);
}

function handleEditTodo(event){
  event.preventDefault();
  console.log('editing todo...');
  let input = event.target.parentElement.querySelector('.todo-input');
  input.readOnly = false;
  input.focus();
}

function handleFormSubmit(event){
  console.log('submiting form...');
  event.preventDefault();
  let input = event.target.querySelector('.todo-input');
  input.readOnly = true;
  input.blur();
}


function handleMouseIn(event){
  event.target.style.backgroundColor = '#ff0000';
}

function handleMouseOut(event){
  event.target.style.backgroundColor = '#ffffff';
}
