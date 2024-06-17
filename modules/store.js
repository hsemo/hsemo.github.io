let store = localStorage;

function getStoredTodos(){
  let todos;
  if(!store.todos){
    todos = [{
      id: Date.now() + '',
      completed: false,
      text: ''
    }];

    store.todos = JSON.stringify(todos);
    return todos;
  }

  todos = JSON.parse(store.todos);
  return todos;
}

function saveTodo(todo){
  if(!todo) return;

  let todos = JSON.parse(store.todos);

  let update = false;
  todos = todos.map((t) => {
    if(t.id === todo.id){
      update = true;
      return todo;
    }
    return t;
  });

  if(!update){
    todos.push(todo);
  }

  store.todos = JSON.stringify(todos);
  return true;
}

function removeTodo(todo){
  let todos = JSON.parse(store.todos);

  todos = todos.filter((t) => {
    return t.id !== todo.id;
  })

  store.todos = JSON.stringify(todos);
  return true;
}

export {getStoredTodos, saveTodo, removeTodo};
