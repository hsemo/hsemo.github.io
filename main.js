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
  }

  // form submit event
  let forms = document.getElementsByClassName('todo-form');
  for(const form of forms){
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('mouseenter', handleMouseIn);
    form.addEventListener('mouseleave', handleMouseOut);
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
  form.addEventListener('mouseenter', handleMouseIn);
  form.addEventListener('mouseleave', handleMouseOut);

  let btnCheck = createElement('button', {
    type: 'button',
    className: 'todo-check-btn',
    innerText: '✅'
  });
  form.appendChild(btnCheck);

  let btnRemove = createElement('button', {
    type: 'button',
    className: 'todo-rmv-btn',
    innerText: '❌'
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
  let tcb = event.target.querySelector('.todo-check-btn');
  let trb = event.target.querySelector('.todo-rmv-btn');
  tcb.className += ' make-visible';
  trb.className += ' make-visible';
}

function handleMouseOut(event){
  let tcb = event.target.querySelector('.todo-check-btn');
  let trb = event.target.querySelector('.todo-rmv-btn');
  tcb.className = tcb.className.split(' ').filter((cls) => cls !== 'make-visible').join(' ');
  trb.className = trb.className.split(' ').filter((cls) => cls !== 'make-visible').join(' ');
}
