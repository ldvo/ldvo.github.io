var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var unfinished_list = $("#unfinished-list");
var finished_list = $("#finished-list");

var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://examenfinalweb.herokuapp.com/todos/' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  finished_list.empty();
  unfinished_list.empty(); 
  $.ajax({
    url: 'https://examenfinalweb.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
        addTodo(data[i]._id, data[i].description, data[i].completed)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://examenfinalweb.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        addTodo(data._id, data.description, data.completed);
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(id, todoText, completed) {
  var newElement = document.createElement('LI');
  if (completed) {
    newElement.innerHTML =
      '<input type="checkbox" name="todo" checked><span>' + todoText + '</span>';
    newElement.firstChild.value = id;
    newElement.classList.toggle('done');
    newElement.firstChild.addEventListener( 'change', function() {
      parent = this.parentElement;
      if(this.checked) {
          updateTodo(this.value, true);
          parent.classList.toggle('done');
          finished_list.append(parent);
          
      } else {
          updateTodo(this.value, false);
          parent.classList.toggle('done');
          unfinished_list.append(parent);
      }
    });
    finished_list.append(newElement);
  }
  else {
    newElement.innerHTML =
      '<input type="checkbox" name="todo"><span>' + todoText + '</span>';
    newElement.firstChild.value = id;
    newElement.firstChild.addEventListener( 'change', function() {
      parent = this.parentElement;
      if(this.checked) {
          updateTodo(this.value, true);
          parent.classList.toggle('done');
          finished_list.append(parent);
      } else {
          updateTodo(this.value, false);
          parent.classList.toggle('done');
          unfinished_list.append(parent);
      }
    });
    unfinished_list.append(newElement);

  }
  
}