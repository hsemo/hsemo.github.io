function $(selector, scope){
  return (scope || document) .querySelector(selector);
}

$.qsa = function(selector, scope){
  return (scope || document) .querySelectorAll(selector);
}

$.createElement = function (elementName='', options={}){
  let element = document.createElement(elementName);
  // Object.assign can be used here, have to search about it
  for(const key of Object.keys(options)){
    element[key] = options[key];
  }
  return element;
}

$.on = function(element, type, handler){
  element.addEventListener(type, handler);
}

$.delegate = function(element, type, selector, handler){
  function dispatchEvent(event){
    let target = event.target;
    let potentialTargets = $.qsa(selector, element);
    let hasMatch = false;

    for(const pt of potentialTargets){
      if(pt === target){
        hasMatch = true;
        break;
      }
    }

    if(hasMatch){
      handler(event);
    }
  }

  $.on(element, type, dispatchEvent);
}

$.getTodoDataFromInput = function(input){
  let li = input.parentElement;
  let checkInput = $('.todo-check-btn', li);
  let data = {
    id: li.dataset.id,
    completed: checkInput.checked,
    text: input.value
  };
  return data;
}

export default $;
